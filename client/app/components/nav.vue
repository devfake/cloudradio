<template>
  <sub-navigation></sub-navigation>

  <nav>
    <div class="nav-elements no-select">
      <!-- todo: lists -->
      <span class="nav-item" :class="{active: subNav === 'cloudradioo'}" @click="changeSubNav('cloudradioo')"><span>cloudradioo</span></span>
      <span class="nav-item" :class="{active: subNav === 'filter'}" @click="changeSubNav('filter')"><span>filter</span></span>
      <span class="nav-item" :class="{active: subNav === 'history'}" @click="changeSubNav('history')"><span>history</span></span>
      <span class="nav-item">
        <span class="attribution">
          <a target="_blank" href="https://soundcloud.com/"><img src="assets/img/powered_by_soundcloud.png" width="104" height="32" alt="powered by: SOUNDCLOUD"></a>
        </span>
      </span>

      <div class="music-controls">
        <svg @click="initPreviousTrack()" class="last-btn" height="60px" width="45px" viewBox="-60 -35 200 140">
          <path d="M0,44c0,1.396,1.398,2.395,1.398,2.395L38.71,71.146c2.862,1.91,5.21,0.504,5.21-3.123V19.975
			c0-3.626-2.348-5.03-5.21-3.122L1.398,41.604C1.398,41.604,0,42.604,0,44z M45.379,44c0,1.396,1.396,2.395,1.396,2.395
			l36.016,24.752C85.654,73.057,88,71.65,88,68.023V19.975c0-3.626-2.346-5.03-5.209-3.122L46.775,41.604
			C46.775,41.604,45.379,42.604,45.379,44z" />
        </svg>
        <svg v-show="!playing" @click="playPause()" class="play-btn" height="60px" width="45px" viewBox="-130 -85 450 400">
          <path d="M203.791,99.628L49.307,2.294c-4.567-2.719-10.238-2.266-14.521-2.266
		c-17.132,0-17.056,13.227-17.056,16.578v198.94c0,2.833-0.075,16.579,17.056,16.579c4.283,0,9.955,0.451,14.521-2.267
		l154.483-97.333c12.68-7.545,10.489-16.449,10.489-16.449S216.471,107.172,203.791,99.628z" />
        </svg>
        <svg v-show="playing" @click="playPause()" class="pause-btn" height="60px" width="45px" viewBox="-21 2 110 60">
          <path d="M52.5,0c-4.972,0-9,1.529-9,6.5v57c0,4.971,4.028,6.5,9,6.5c4.971,0,9-1.529,9-6.5v-57
				C61.5,1.529,57.471,0,52.5,0z"/>
          <path d="M17.5,0c-4.972,0-9,1.529-9,6.5v57c0,4.971,4.028,6.5,9,6.5c4.971,0,9-1.529,9-6.5v-57
				C26.5,1.529,22.471,0,17.5,0z"/>
        </svg>
        <svg @click="initCurrentTrack()" class="next-btn" height="60px" width="45px" viewBox="-60 -35 200 140">
          <path d="M38.815,40.071c0,1.272-1.271,2.181-1.271,2.181l-32.8,22.541C2.137,66.533,0,65.252,0,61.949
		V18.191c0-3.302,2.137-4.582,4.744-2.843l32.8,22.541C37.544,37.889,38.815,38.799,38.815,40.071z M78.869,37.889l-33.98-22.541
		c-2.607-1.738-4.746-0.459-4.746,2.843v43.758c0,3.303,2.138,4.584,4.746,2.844l33.98-22.541c0,0,1.273-0.909,1.273-2.181
		S78.869,37.889,78.869,37.889z" />
        </svg>
      </div>

      <span class="nav-item second-nav-item">
        <div class="volume-wrap">
          <div id="volume"></div>
        </div>
      </span>

      <!--span class="nav-item second-nav-item" :class="{'active': repeat}" @click="changeRepeat()"><span>repeat</span></span-->
    </div>
  </nav>
</template>

<script type="text/babel">

  import SubNavigation from './subnav.vue';
  import noUiSlider from 'nouislider';
  import { initCurrentTrack, playPause, changeSubNav, changeRepeat, changeVolumeBy, initPreviousTrack } from '../store/actions';

  export default {
    vuex: {
      getters: {
        audio: ({ player }) => player.audio,
        playing: ({ player }) => player.playing,
        subNav: ({ options }) => options.subNav,
        repeat: ({ options }) => options.repeat,
        currentTrack: ({ player }) => player.currentTrack
      },
      actions: {
        initCurrentTrack,
        playPause,
        changeSubNav,
        changeRepeat,
        changeVolumeBy,
        initPreviousTrack
      }
    },

    components: {
      SubNavigation: SubNavigation
    },

    ready: function() {
      let savedVolume = localStorage.getItem('user-volume');
      if(savedVolume == null) {
        savedVolume = .75;
      }

      let slider = document.getElementById('volume');

      noUiSlider.create(slider, {
        start: savedVolume * 100,
        connect: 'lower',
        behaviour: 'snap',
        range: {
          min: 0,
          max: 100
        }
      });

      slider.noUiSlider.on('update', value => {
        this.changeVolumeBy(value / 100);
      });
    }
  }

</script>