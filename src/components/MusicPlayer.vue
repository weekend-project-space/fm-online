<template>
  <video-player autoplay :src="value" :volume="0.6">
    <template v-slot="{ player, state }">
      <div class="custom-player-controls">
        <div class="control-left">
          <v-img width="50" class="rounded-lg" :src="img"></v-img>
          <div class="mx-3 title">
            <p class="" v-text="title"></p>
            <small v-text="value"></small>
          </div>
        </div>
        <div class="space">
          <v-btn
            variant="text"
            size="50"
            @click="state.playing ? player.pause() : player.play()"
            :icon="state.playing ? 'mdi-pause' : 'mdi-play'"
          >
          </v-btn>
        </div>
        <div class="control-right">
          <v-btn
            variant="text"
            size="50"
            icon="mdi-open-in-new"
            :href="'https://tv.01234.fun/#/?url=' + value"
            title="新窗口打开"
          >
          </v-btn>
        </div>
      </div>
    </template>
  </video-player>
</template>

<script setup>
import { watch } from "vue";
const props = defineProps({
  value: String,
  title: String,
  img: String,
});
watch(props, () => {
  document.title = props.title;
});
</script>

<style lang="less" scoped>
.vjs_video_3-dimensions {
  width: none;
  height: none;
}
.video-js {
  color: var(--color);
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.custom-player-controls {
  color: #000;
  // display: grid;
  // grid-template-columns: min(auto, 200px) 1fr min(auto, 200px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.space {
  align-items: center;
  text-align: center;
}
.control-right,
.control-left {
  width: 150px;
}
.control-right {
  display: flex;
  justify-content: flex-end;
}
.control-left {
  display: flex;
  justify-content: flex-start;
}
.title {
  color: var(--color);
  font-size: 1.2em;
  line-height: 2em;
  min-width: calc(100% - 50px);
}
</style>
<style lang="less">
.video-js .v-btn--icon .v-icon {
  --v-icon-size-multiplier: 1.8;
}
</style>
