import Vue from 'vue';

import store from './store';
import {initCurrentTrack, initPreviousTrack} from './store/actions';

const PLAY_PAUSE = 32;
const CLOSE_SUB_NAV = 27;

const NEXT_TRACK = 39;
const PREV_TRACK = 37;

const VOLUME_HIGHER = 38;
const VOLUME_LOWER = 40;

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
            this.initCurrentTrack();
            break;

          case PREV_TRACK:
            this.initPreviousTrack();
            break;

          case VOLUME_HIGHER:
            store.dispatch('CHANGE_VOLUME', 'increase');
            break;

          case VOLUME_LOWER:
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