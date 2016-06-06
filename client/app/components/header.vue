<template>
  <header :class="{hideIndex: subNav}">
    <a class="title" target="_blank" :href="currentTrack.permalink_url">{{ currentTrack.title }}</a>
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
    }
  }

</script>