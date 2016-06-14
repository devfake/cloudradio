import Vue from 'vue';
import Resource from 'vue-resource';

import progress from './components/progress.vue';
import cloudradiooHeader from './components/header.vue';
import navigation from './components/nav.vue';

import Player from './player';
import KeyEvents from './keyevents';

import store from './store';
import { convertDuration, reverse } from './filters';

Vue.use(Resource);
Vue.filter('convertDuration', convertDuration);
Vue.filter('reverse', reverse);

Vue.config.debug = true;

new Vue({
  el: '.app',

  store,

  components: {
    progress,
    cloudradiooHeader,
    navigation
  },

  ready() {
    //localStorage.clear();
    this.$http.get('api/api-key').then(value => {
      store.dispatch('SET_API_KEY', value.data);

      Player.start();
      KeyEvents.registerKeyEvents();
    });
  }
});