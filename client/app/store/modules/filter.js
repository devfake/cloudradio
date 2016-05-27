const state = {
  userFilters: [],
  allGenres: [],
  toggleAll: true
};

const mutations = {
  INIT_FILTERS(state) {
    let savedFilters = localStorage.getItem('user-filters');

    if(savedFilters === null) {
      state.userFilters = state.allGenres;
      setStorage(state.userFilters);
    } else {
      state.userFilters = JSON.parse(savedFilters);
    }

    state.toggleAll = JSON.stringify(state.userFilters) === JSON.stringify(state.allGenres);
  },

  INIT_ALL_GENRES(state, genres) {
    state.allGenres = genres;
  },

  SET_STORAGE(state) {
    setStorage(state.userFilters);
  },

  CHANGE_FILTER(state, key, value) {
    if(state.userFilters[key]) {
      delete state.userFilters[key];
    } else {
      state.userFilters[key] = value;
    }

    setStorage(state.userFilters);
  }
};

function setStorage(userFilters) {
  localStorage.setItem('user-filters', JSON.stringify(userFilters));
}

export default {state, mutations}