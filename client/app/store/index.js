import Vue from 'vue'
import Vuex from 'vuex'

import progress from './modules/progress';
import player from './modules/player';
import options from './modules/options';
import filter from './modules/filter';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    progress,
    player,
    options,
    filter
  }
})