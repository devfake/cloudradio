<template>
  <header :class="{hideIndex: subNav}">
    <div class="hidden-tools {{ showToolsOnStart ? 'active' : '' }}">
      <a :href="currentTrack.permalink_url" target="_blank">Soundcloud</a>
      <a href="https://www.youtube.com/results?search_query={{ currentTrack.username + ' ' + currentTrack.title }}" target="_blank">Youtube</a>
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

    data: function() {
      return {
        showToolsOnStart: true
      }
    },

    ready: function() {
      setTimeout(() => {
        this.showToolsOnStart = false;
      }, 2000);
    }
  }

</script>