const state = {
  userFilters: [],
  allGenres: []
};

const mutations = {
  INIT_FILTERS(state) {
    let savedFilters = localStorage.getItem('user-filters');

    if(savedFilters === null) {
      state.userFilters = state.allGenres;
      localStorage.setItem('user-filters', JSON.stringify(state.userFilters));
    } else {
      state.userFilters = JSON.parse(savedFilters);
    }
  },

  INIT_ALL_GENRES(state, genres) {
    state.allGenres = genres;
  },

  CHANGE_FILTER(state, key, value) {
    if(state.userFilters[key]) {
      delete state.userFilters[key];
    } else {
      state.userFilters[key] = value;
    }

    localStorage.setItem('user-filters', JSON.stringify(state.userFilters));
  }
};

export default {state, mutations}