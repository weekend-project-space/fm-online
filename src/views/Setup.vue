<template>
  <div class="mx-auto setup">
    <v-icon size="100" icon="mdi-access-point" color="blue-darken-2"></v-icon>
    <h3 class="ma-3">通过m3u订阅</h3>
    <small>如需通过 m3u 订阅FM，请在字段中粘贴完整网址</small>
    <v-text-field
      class="mt-3"
      v-model="value"
      label="m3u"
      required
      @keydown.enter="$router.push('/?s=' + value)"
    ></v-text-field>
    <v-btn
      variant="tonal"
      block
      color="blue-darken-2"
      :disabled="!value"
      @click="$router.push('/?s=' + value)"
      >订阅</v-btn
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
const value = ref("");
</script>

<style lang="less" scoped>
.setup {
  margin-top: 10vh;
  max-width: 360px;
  text-align: center;
}
</style>
