<template>
  <div class="group" v-for="c in dData" :key="c.name">
    <h3 v-text="c.name"></h3>
    <v-row>
      <v-col v-for="item in c.children" :key="item.url">
        <v-lazy
          :min-height="200"
          :options="{ threshold: 0.5 }"
          transition="fade-transition"
        >
          <v-card variant="none" min-width="130">
            <v-img
              class="rounded-lg img"
              v-ripple
              :aspect-ratio="1 / 1"
              :src="(item.meta && item.meta['tvg-logo']) || '/logo.png'"
            >
              <div class="action" @click="setFM(item)">
                <v-icon size="32">mdi-play</v-icon>
              </div>
            </v-img>
            <div class="my-2 title">{{ item.name }}</div>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { onMounted, watch, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchSource } from "@/api";
import { parse } from "@/utils/tvlistsupport";
import { useAppStore } from "@/store";
const appStore = useAppStore();
const route = useRoute();
const data = ref([]);
const source0 = computed(() => route.query.s || appStore.sourceUrl);
const { setFM, setSourceUrl } = appStore;

function loadData() {
  const source = source0.value;
  if (source) {
    fetchSource(source).then((res) => {
      const d = parse(res, source);
      const list = [
        {
          name: "#",
          children: d.filter((o) =>
            location.protocol == "https:"
              ? o.url.includes(location.protocol)
              : true
          ),
        },
      ];
      data.value = list;
    });
  }
}

function initConf() {
  const source = source0.value;
  if (source) {
    setSourceUrl(source);
  }
}

const dData = computed(() => {
  return route.query.q
    ? data.value.map((item) => {
        return {
          name: `“${route.query.q}” 相关内容`,
          children: item.children.filter((c) => c.name.includes(route.query.q)),
        };
      })
    : data.value;
});

watch(route, () => {
  initConf();
  loadData();
});
onMounted(() => {
  initConf();
  loadData();
});
</script>
<style lang="less" scoped>
.group {
  color: var(--color);
  h3 {
    line-height: 3em;
  }
  .title {
    text-align: center;
  }
}
.action {
  --color: #fff;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: none;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.img:hover {
  cursor: pointer;
  .action {
    display: flex;
  }
}
</style>
