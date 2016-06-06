<template>
  <section class="subnav" :class="{active: subNav}">
    <div class="option-elements" :class="{active: subNav === 'cloudradioo'}">
      <h4>Discover New Music</h4>
      <p>
        cloudradioo is a web app that plays randomly all top 50 songs from the <a href="https://soundcloud.com" target="_blank">soundcloud</a> charts. You will discover your new favorite song!

        <br><br>
        You can pause / replay by pressing the <code>space</code> key and <code>&#9668;</code> / <code>&#9658;</code> or <code>A</code> / <code>D</code> for previous / next random track. <br> Press <code>&#9650;</code> / <code>&#9660;</code> or <code>W</code> / <code>S</code> to increase / decrase volume. <br> Press <code>esc</code> to close this window.

        <br><br>
        You also can filter your music taste or see a history of your played tracks.

        <br><br>
        This project is open source and is licensed under the MIT-license. If you would like to contribute, you find the project on <a href="https://github.com/devfake/cloudradioo" target="_blank">Github</a>.
      </p>
    </div>

    <div class="option-elements" :class="{active: subNav === 'filter'}">
      <h4>Filter Your Taste</h4>
      <div class="filter-divider no-select">
        <!--input type="radio" value="top" name="sort" id="top"><label for="top">Top</label>
        <input type="radio" value="trending" name="sort" id="trending"><label for="trending">Trending</label-->
        <input type="checkbox" id="toggleAll" :checked="toggleAll" @change="toggleAllFilters()"><label for="toggleAll">Toggle All</label>
      </div>
      <span class="divider"></span>
      <div class="filter-divider no-select" v-for="genre in allGenres">
        <input type="checkbox" id="{{ genre }}" :checked="checkForFilter($key)" @change="changeFilter($key, genre)"><label for="{{ genre }}">{{ $key }}</label>
      </div>
    </div>

    <div class="option-elements" :class="{active: subNav === 'history'}">
      <h4>
        History Of Your Tracks
        <span class="clear-history" @click="clearHistory()">Clear History</span>
      </h4>
      <ul class="history-items">
        <li
          class="history-item"
          v-for="item in history | reverse"
          @click="initTrackFromHistory(item.data)"
          track-by="$index"
        >
          <span class="history-title">{{ item.data.title }}</span>
          <span class="history-author">{{ item.data.username }}</span>
          <span class="history-genre">{{ item.data.genre }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script type="text/babel">

  import { initTrackFromHistory, changeFilter, clearHistory, toggleAllFilters } from '../store/actions';

  export default {
    vuex: {
      getters: {
        subNav: ({ options }) => options.subNav,
        history: ({ player }) => player.history,
        allGenres: ({ filter }) => filter.allGenres,
        userFilters: ({ filter }) => filter.userFilters,
        toggleAll: ({ filter }) => filter.toggleAll
      },
      actions: {
        initTrackFromHistory,
        clearHistory,
        changeFilter,
        toggleAllFilters
      }
    },

    methods: {
      checkForFilter: function(key) {
        return this.userFilters[key];
      }
    }
  }

</script>