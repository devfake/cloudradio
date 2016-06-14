<template>
  <header :class="{hideIndex: subNav}">
    <div class="hidden-tools {{ showToolsOnStart ? 'active' : '' }} {{ showShareTrack ? 'show-share-track' : '' }}">
      <a :href="currentTrack.permalink_url" target="_blank">Soundcloud</a>
      <a href="https://www.youtube.com/results?search_query={{ currentTrack.username + ' ' + currentTrack.title }}" target="_blank">Youtube</a>
      <a @click="enableShareTrack()">Share Track</a>

      <div class="share-track-wrap">
        <input type="text" class="share-track" value="http://cloudradioo.com/{{ currentTrack.id }}" readonly>
        <a @click="disableShareTrack()">Close</a>
      </div>
    </div>

    <h2 class="title">{{ currentTrack.title }}</h2>
    <h3 class="author">{{ currentTrack.username }}</h3>
    <span class="genre">{{ currentTrack.genre }}</span>
  </header>
</template>

<script type="text/babel">

  import { initCurrentTrack } from '../store/actions';
  import Player from '../player';

  export default {
    vuex: {
      getters: {
        currentTrack: ({ player }) => player.currentTrack,
        subNav: ({ options }) => options.subNav
      },
      actions: {
        initCurrentTrack
      }
    },

    data() {
      return {
        showToolsOnStart: true,
        showShareTrack: false
      }
    },

    ready() {
      setTimeout(() => {
        this.showToolsOnStart = false;
      }, 2000);
    },

    methods: {
      enableShareTrack() {
        this.showShareTrack = true;

        setTimeout(() => {
          document.querySelector('.share-track').select();
        }, 0);
      },

      disableShareTrack() {
        this.showShareTrack = false;
      }
    }
  }

</script>