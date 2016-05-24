import Vue from 'vue';
import Resource from 'vue-resource';

import { initCurrentTrack, initUserFilters, initUserHistory, initVolume } from './store/actions';

import store from './store';

Vue.use(Resource);

let player = new Vue({
  store,

  data: function() {
    return {
      audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
      duration: null,
      analyser: null,
      frequencyData: null,
      svg: null,
      isFirefox: typeof InstallTrigger !== 'undefined',
      started: false,
      audioSrc: null
    }
  },

  vuex: {
    getters: {
      currentTrack: ({ player }) => player.currentTrack,
      currentPlayingIndex: ({ player }) => player.currentPlayingIndex,
      audio: ({ player }) => player.audio,
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
    start: function() {
      this.$http.get('api/all-genres').then(value => {
        store.dispatch('INIT_ALL_GENRES', value.data);

        this.initVolume();
        this.initUserFilters();
        this.initUserHistory();
        this.initAllTracks();
      });
    },

    initAllTracks: function() {
      this.$http.get('api/songs', {filters: this.userFilters}).then(value => {
        store.dispatch('INIT_ALL_TRACKS', value.data);
        store.dispatch('INIT_CURRENT_TRACK');

        this.initPlayer();
      });
    },

    initPlayer: function() {
      store.dispatch('CREATE_AUDIO', this.currentTrack.id);
      this.registerEventListener();
    },

    startPlaying: function() {
      let title = this.currentTrack.title;
      this.duration = this.currentTrack.duration;

      // Close audio context for Firefox:
      // If we change the currentTime for the audio object, the volume gets louder and louder (bug?).
      if(this.isFirefox && this.audioCtx !== null) {
        this.audioCtx.close();
        this.audioCtx = null;
      }

      store.dispatch('SET_DURATION', this.duration);
      store.dispatch('CHANGE_TITLE', title);

      this.initAudioContext();
    },

    initAudioContext: function() {
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

    registerEventListener: function() {
      this.audio.removeEventListener('error', this.audioError);
      this.audio.removeEventListener('ended', this.audioEnded);
      this.audio.removeEventListener('canplay', this.audioCanPlay);

      this.audio.addEventListener('error', this.audioError);
      this.audio.addEventListener('ended', this.audioEnded);
      this.audio.addEventListener('canplay', this.audioCanPlay);
    },

    audioError: function() {
      this.initCurrentTrack();
    },

    audioEnded: function() {
      this.initCurrentTrack();
    },

    audioCanPlay: function() {
      this.startPlaying();
    }
  }
});

export default player;