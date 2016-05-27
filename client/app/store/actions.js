import Player from '../player';

// Filter stuff.
export function initUserFilters({dispatch}) {
  dispatch('INIT_FILTERS');
}

export function changeFilter(store, key, value) {
  store.dispatch('CHANGE_FILTER', key, value);

  callChangeFilter(store, this);
}

export function toggleAllFilters(store) {
  store.state.filter.toggleAll = ! store.state.filter.toggleAll;
  store.state.filter.userFilters = store.state.filter.toggleAll ? store.state.filter.allGenres : {};
  store.dispatch('SET_STORAGE');

  callChangeFilter(store, this);
}

function callChangeFilter(store, self) {
  self.$http.get('api/change-filter', {filters: store.state.filter.userFilters}).then(value => {
    store.dispatch('INIT_ALL_TRACKS', value.data);
    store.dispatch('RESET_PLAYING_INDEX');
  });
}

// History stuff.
export function initUserHistory({dispatch}) {
  dispatch('INIT_HISTORY');
}

export function clearHistory({dispatch}) {
  dispatch('CLEAR_HISTORY');
}

export function initTrackFromHistory({dispatch}, item) {
  dispatch('INIT_TRACK_FROM_HISTORY', item);
  dispatch('ADD_ITEM_TO_HISTORY', item);

  Player.initPlayer();
}

// Player stuff.
export function playPause({dispatch}) {
  dispatch('PLAY_PAUSE');
}

export function seekTrack({dispatch}, duration) {
  dispatch('SEEK_TRACK', duration);
}

export function initCurrentTrack({dispatch}) {
  dispatch('INIT_CURRENT_TRACK');
  Player.initPlayer();
}

export function initPreviousTrack({dispatch}) {
  dispatch('INIT_PREVIOUS_TRACK');
  Player.initPlayer();
}

export function initVolume({dispatch}) {
  dispatch('INIT_VOLUME');
}

export function changeVolumeBy({dispatch}, value) {
  dispatch('CHANGE_VOLUME_BY', value);
}

// Other stuff.
export function changeSubNav({dispatch}, item) {
  dispatch('CHANGE_SUB_NAV', item);
}

export function changeRepeat({dispatch}) {
  dispatch('CHANGE_REPEAT');
}