const state = {
  progressBar: 0,
  durationTime: '??',
  durationProgress: '??'
};

const mutations = {
  UPDATE_PROGRESS_BAR(state, width) {
    state.progressBar = width;
  },

  SET_DURATION(state, duration) {
    state.durationTime = duration;
  },

  UPDATE_DURATION_PROGRESS(state, duration) {
    state.durationProgress = duration;
  }
};

export default {state, mutations}