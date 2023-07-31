<template>
  <Layout>
    <router-view></router-view>
    <template v-if="fm && fm.url" #footer>
      <div class="play-warp">
        <MusicPlayer
          :value="fm.url"
          :img="(fm.meta && fm.meta['tvg-logo']) || '/logo.png'"
          :title="fm.name"
        ></MusicPlayer>
      </div>
    </template>
  </Layout>
</template>
<script setup>
import MusicPlayer from "./components/MusicPlayer.vue";
import Layout from "./layout/Index.vue";
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
const { fm } = storeToRefs(useAppStore());
</script>
<style lang="less" scoped>
.play-warp {
  width: 100vw;
  border-top: 1px solid #e0e0e0;
  padding: 1rem 0.8rem;
  background-color: #f8f9fa;
  box-shadow: 0px 6px 10px 0px rgb(0 0 0 / 14%),
    0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%);
}
</style>
