const state = {
  repeat: false,
  subNav: null
};

const mutations = {
  CHANGE_REPEAT(state) {

    // todo
    state.repeat = ! state.repeat;
  },

  CHANGE_TITLE(state, title) {
    document.title = title;
  },

  CHANGE_SUB_NAV(state, item) {
    state.subNav = (state.subNav === item) ? null : item;
  }
};

export default {state, mutations}