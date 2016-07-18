import Vue from 'vue';
import store from './store';

let notification = new Vue({
  store,

  vuex: {
    getters: {
      currentTrack: ({player}) => player.currentTrack,
      apiUrl: ({player}) => player.apiUrl
    }
  },

  methods: {
    songPlayed () {
      let vm = this;
      let oldTrackTitle = vm.currentTrack.title;
      setTimeout(function () {
        if (vm.$store.state.player.currentTrack.title === oldTrackTitle) {
          vm.notify(
              `♫ ${vm.currentTrack.title}`,
              `By: ${vm.currentTrack.username} on ${vm.currentTrack.genre}`
          );
        }
      }, 5000);
    },

    notify(title, body, silent = true, icon = '../assets/img/icon.png') {
      Notification.requestPermission();
      return new Notification(
        title,
        {
          icon,
          body,
          silent
        }
      );
    }
  }
});

export default notification;