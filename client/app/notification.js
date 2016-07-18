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
      this.notify(
          `♫ ${this.currentTrack.title}`,
          `By: ${this.currentTrack.username} on ${this.currentTrack.genre}`
      );
    },

    notify(title, body, silent = true, icon = '../assets/img/icon.png') {
      Notification.requestPermission();
      let n =  new Notification(
        title,
        {
          icon,
          body,
          silent
        }
      );

      setTimeout(n.close.bind(n), 5000);
    }
  }
});

export default notification;