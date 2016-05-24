<template>
  <div class="progress-wrap" @click="click">
    <span class="progress-bar" :style="{width: progressBar + '%'}"></span>
    <span class="progress-time">
      <span class="duration-progress">{{ durationProgress | convertDuration }}</span> / <span class="duration-time">{{ durationTime | convertDuration }}</span>
    </span>
  </div>
</template>

<script type="text/babel">

  import {seekTrack} from '../store/actions';

  export default {
    vuex: {
      getters: {
        progressBar: ({ progress }) => progress.progressBar,
        durationTime: ({ progress }) => progress.durationTime,
        durationProgress: ({ progress }) => progress.durationProgress
      },
      actions: {
        seekTrack
      }
    },

    methods: {
      click: function(event) {
        let clientX = event.clientX;
        let progressWidth = document.querySelector('.progress-wrap').offsetWidth;

        let clickedWidthPercent = 100 * clientX / progressWidth;
        let durationTimeSeconds = this.durationTime / 1000;

        this.seekTrack(durationTimeSeconds * clickedWidthPercent / 100);
      }
    }
  }

</script>