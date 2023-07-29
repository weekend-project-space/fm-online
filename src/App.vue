<template>
  <Layout>
    <router-view></router-view>
    <template #footer>
      <MusicPlayer
        :value="fm.url"
        :img="(fm.meta && fm.meta['tvg-logo']) || '/logo.png'"
        :title="fm.name"
      ></MusicPlayer>
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
<style></style>
