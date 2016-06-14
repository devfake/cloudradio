import Vue from 'vue';
import Resource from 'vue-resource';
import d3 from 'd3';

import { initCurrentTrack, initUserFilters, initUserHistory, initVolume } from './store/actions';

import store from './store';

Vue.use(Resource);

let player = new Vue({
  store,

  data() {
    return {
      audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
      duration: null,
      analyser: null,
      frequencyData: null,
      svg: null,
      isFirefox: typeof InstallTrigger !== 'undefined',
      started: false,
      audioSrc: null,
      sharedTrack: null
    }
  },

  vuex: {
    getters: {
      currentTrack: ({ player }) => player.currentTrack,
      currentPlayingIndex: ({ player }) => player.currentPlayingIndex,
      audio: ({ player }) => player.audio,
      apiKey: ({ player }) => player.apiKey,
      userFilters: ({ filter }) => filter.userFilters
    },
    actions: {
      initCurrentTrack,
      initUserFilters,
      initUserHistory,
      initVolume
    }
  },

  methods: {
    start() {
      this.parseURI();

      this.$http.get('api/all-genres').then(value => {
        store.dispatch('INIT_ALL_GENRES', value.data);

        this.initVolume();
        this.initUserFilters();
        this.initUserHistory();
        this.initAllTracks();
      });
    },

    parseURI() {
      let uri = window.location.pathname;

      // If we develop locally with pathname like 'cloudradioo/public',
      // we need to split the pathname to get the right shared track id.
      let split = uri.split('/');

      this.sharedTrack = split[split.length - 1];
    },

    initAllTracks() {
      this.$http.get('api/songs', {filters: this.userFilters}).then(value => {
        store.dispatch('INIT_ALL_TRACKS', value.data);

        // Is there an shared uri? Fetch the track and store them as currentTrack.
        if(this.sharedTrack) {
          this.$http.get(`http://api.soundcloud.com/tracks/${this.sharedTrack}?client_id=${this.apiKey}`).then(value => {
            store.dispatch('INIT_SHARED_TRACK', value.data);
            this.initPlayer();
          }, error => {
            window.location.href = document.querySelector('.base-uri').content;
          });
        } else {
          store.dispatch('INIT_CURRENT_TRACK');
          this.initPlayer();
        }
      });
    },

    initPlayer() {
      store.dispatch('CREATE_AUDIO', this.currentTrack.id);
      this.registerEventListener();
    },

    startPlaying() {
      let { title, username } = this.currentTrack;
      this.duration = this.currentTrack.duration;

      // Close audio context for Firefox:
      // If we change the currentTime for the audio object, the volume gets louder and louder (bug?).
      if(this.isFirefox && this.audioCtx !== null) {
        this.audioCtx.close();
        this.audioCtx = null;
      }

      store.dispatch('SET_DURATION', this.duration);
      store.dispatch('CHANGE_TITLE', title + ' - ' + username);

      this.initAudioContext();
    },

    initAudioContext() {
      let self = this;

      // We need to re-create the audio context in Firefox, because we close it earlier.
      if(this.isFirefox) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.audioSrc = this.audioCtx.createMediaElementSource(this.audio);
      } else {
        // Chrome can only call one time 'createMediaElementSource' on audio context.
        if( ! this.started) {
          this.audioSrc = this.audioCtx.createMediaElementSource(this.audio);
          this.started = true;
        }
      }

      let analyser = this.audioCtx.createAnalyser();

      this.audioSrc.connect(analyser);
      this.audioSrc.connect(this.audioCtx.destination);

      this.audio.play();

      let frequencyData = new Uint8Array(5);

      d3.selectAll('.svg-wrap svg').remove();
      let svg = d3.select('.svg-wrap').append('svg');

      function renderSVG() {
        store.dispatch('UPDATE_PROGRESS_BAR', ((100 * Math.ceil(self.audio.currentTime * 1000)) / self.duration));
        store.dispatch('UPDATE_DURATION_PROGRESS', Math.ceil(self.audio.currentTime * 1000));

        requestAnimationFrame(renderSVG);

        analyser.smoothingTimeConstant = 1 - (4 / 100);
        analyser.getByteFrequencyData(frequencyData);

        var radiusScale = d3.scale.linear().domain([0, d3.max(frequencyData)]).range([0, 1200 / 2]);
        var circles = svg.selectAll('circle').data(frequencyData);

        circles.enter().append('circle');

        circles
          .attr({
            r: d => radiusScale(d),
            cx: '50%',
            cy: 1200 / 2,
            fill: 'rgba(106,49,84,.2)',
            //fill: 'rgba(255,255,255,.01)',
            //'stroke-width': 2,
            'stroke-width': 0,
            //'stroke-opacity': .1,
            //stroke: function(d) { return '#602b4b' }
            stroke: '#fff'
          });

        circles.exit().remove();
      }

      renderSVG();
    },

    registerEventListener() {
      this.audio.removeEventListener('error', this.audioError);
      this.audio.removeEventListener('ended', this.audioEnded);
      this.audio.removeEventListener('canplay', this.audioCanPlay);

      this.audio.addEventListener('error', this.audioError);
      this.audio.addEventListener('ended', this.audioEnded);
      this.audio.addEventListener('canplay', this.audioCanPlay);
    },

    audioError() {
      this.initCurrentTrack();
    },

    audioEnded() {
      this.initCurrentTrack();
    },

    audioCanPlay() {
      this.startPlaying();
    }
  }
});

export default player;