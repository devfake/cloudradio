import Vue from 'vue';

import store from './store';
import {initCurrentTrack, initPreviousTrack} from './store/actions';

const PLAY_PAUSE = 32;
const CLOSE_SUB_NAV = 27;

const NEXT_TRACK = 39;
const NEXT_TRACK_SECOND = 68;
const PREV_TRACK = 37;
const PREV_TRACK_SECOND = 65;

const VOLUME_HIGHER = 38;
const VOLUME_HIGHER_SECOND = 87;
const VOLUME_LOWER = 40;
const VOLUME_LOWER_SECOND = 83;

let keyEvents = new Vue({
  store,

  vuex: {
    actions: {
      initCurrentTrack,
      initPreviousTrack
    }
  },

  methods: {
    registerKeyEvents: function() {
      window.onkeyup = event => {
        var key = event.keyCode ? event.keyCode : event.which;

        switch(key) {
          case PLAY_PAUSE:
            store.dispatch('PLAY_PAUSE');
            break;

          case NEXT_TRACK:
          case NEXT_TRACK_SECOND:
            this.initCurrentTrack();
            break;

          case PREV_TRACK:
          case PREV_TRACK_SECOND:
            this.initPreviousTrack();
            break;

          case VOLUME_HIGHER:
          case VOLUME_HIGHER_SECOND:
            store.dispatch('CHANGE_VOLUME', 'increase');
            break;

          case VOLUME_LOWER:
          case VOLUME_LOWER_SECOND:
            store.dispatch('CHANGE_VOLUME', 'decrease');
            break;

          case CLOSE_SUB_NAV:
            store.dispatch('CHANGE_SUB_NAV', null);
            break;
        }
      };
    }
  }
});

export default keyEvents;