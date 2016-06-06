const state = {
  history: [],
  allTracks: [],
  currentTrack: [],
  currentPlayingIndex: 0,
  audio: null,
  playing: true,
  apiKey: null,
  lastTrackIndex: null,
  countPrevious: 0,
  volume: .75
};

const mutations = {
  INIT_TRACK_FROM_HISTORY(state, item) {
    state.playing = true;
    state.currentTrack = item;
  },

  INIT_HISTORY(state) {
    let savedHistory = localStorage.getItem('user-history');

    if(savedHistory !== null) {
      let parsedHistory = JSON.parse(savedHistory);

      // Get only the last 50 tracks for history.
      if(parsedHistory.length > 50) {
        state.history = parsedHistory.slice(Math.max(parsedHistory.length - 50, 1));
      } else {
        state.history = parsedHistory;
      }
    }

    localStorage.setItem('user-history', JSON.stringify(state.history));
  },

  CLEAR_HISTORY(state) {
    state.history = [];
    localStorage.removeItem('user-history');
  },

  ADD_ITEM_TO_HISTORY(state, item) {
    if(state.history[state.history.length - 1].data !== item) {
      state.history.push({
        index: state.history.length,
        data: item
      });

      localStorage.setItem('user-history', JSON.stringify(state.history));
    }
  },

  RESET_PLAYING_INDEX(state) {
    state.currentPlayingIndex = 0;
  },

  SEEK_TRACK(state, duration) {
    state.playing = true;
    state.audio.currentTime = duration;
  },

  SET_API_KEY(state, key) {
    state.apiKey = key;
  },

  PLAY_PAUSE(state) {
    if(state.playing) {
      state.audio.pause();
    } else {
      state.audio.play();
    }

    state.playing = ! state.playing;
  },

  CREATE_AUDIO(state, id) {
    let src = `http://api.soundcloud.com/tracks/${id}/stream?client_id=${state.apiKey}`;

    // Change only the source and do not re-create the audio object.
    // If you skip a track, this track will continue in the background
    // and triggers the 'ended' event for the audio object.
    if(state.audio === null) {
      state.audio = new Audio(src);
    } else {
      state.audio.src = src;
    }

    state.audio.crossOrigin = 'anonymous';
    state.audio.volume = state.volume;
  },

  INIT_VOLUME(state) {
    let savedVolume = localStorage.getItem('user-volume');

    if(savedVolume !== null) {
      state.volume = savedVolume;
    } else {
      localStorage.setItem('user-volume', .75);
    }
  },

  CHANGE_VOLUME(state, type) {
    let volume = state.audio.volume;
    let slider = document.getElementById('volume');

    if(type === 'increase') {
      state.audio.volume = (volume + .1) > 1 ? 1 : volume + .1;
    } else if(type == 'decrease') {
      state.audio.volume = (volume - .1) < 0 ? 0 : volume - .1;
    }

    localStorage.setItem('user-volume', state.audio.volume);
    state.volume = state.audio.volume;
    slider.noUiSlider.set(state.audio.volume * 100);
  },

  CHANGE_VOLUME_BY(state, value) {
    if(state.audio) {
      state.audio.volume = value;
    }
    state.volume = value;
    localStorage.setItem('user-volume', value);
  },

  INIT_ALL_TRACKS(state, tracks) {
    state.allTracks = tracks;
    state.lastTrackIndex = tracks.length - 1;
  },

  INIT_PREVIOUS_TRACK(state) {
    state.playing = true;
    state.currentTrack = state.history[state.history.length - (2 + state.countPrevious)].data;
    state.countPrevious++;
  },

  // Recreate structure for currentTrack from shared track.
  INIT_SHARED_TRACK(state, data) {
    state.currentTrack = {
      duration: data.duration,
      genre: data.genre,
      id: data.id,
      permalink_url: data.permalink_url,
      title: data.title,
      username: data.user.username
    }
  },

  INIT_CURRENT_TRACK(state) {
    state.playing = true;
    state.countPrevious = 0;

    // Was last track played?
    if(state.currentPlayingIndex == state.lastTrackIndex) {
      state.currentPlayingIndex = 0;
    }

    // todo repeat
    //if( ! state.repeat) {
      state.currentTrack = state.allTracks[state.currentPlayingIndex];
      state.currentPlayingIndex++;

      state.history.push({
        index: state.history.length,
        data: state.currentTrack
      });

      localStorage.setItem('user-history', JSON.stringify(state.history));
    //} else {
      // todo: check for index == 0
      //state.currentTrack = state.allTracks[state.currentPlayingIndex - 1];
    //}
  }
};

export default {state, mutations}