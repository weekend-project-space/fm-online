<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar :elevation="0">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          icon="mdi:mdi-menu"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <div class="logo-warp">
          <img src="/logo.png" alt="" />
          <span class="logo-text">FM</span>
        </div>
      </template>
      <div class="search" v-if="!mobile">
        <div class="search-btn" @click="$router.push('/?q=' + value)">
          <svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"
            ></path>
            <path d="M0,0h24v24H0V0z" fill="none"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="搜索"
          v-model="value"
          @keydown.enter="$router.push('/?q=' + value)"
        />
      </div>
      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi:mdi-apps" v-bind="props" class="mx-1"></v-btn>
          </template>

          <v-card class="apps">
            <v-btn class="app" variant="text" href="https://note.01234.fun">
              <img src="/logo-min.png" alt="" />
              <div>note</div>
            </v-btn>
            <v-btn class="app" variant="text" href="http://fm.01234.fun">
              <img src="/logo-min.png" alt="" />
              <div>fm</div>
            </v-btn>
            <v-btn class="app" variant="text" href="http://01234.fun">
              <img src="https://tv.01234.fun/favicon.ico" alt="" />
              <div>tv</div>
            </v-btn>
            <v-btn class="app" variant="text" href="https://webfollow.cc">
              <img src="https://webfollow.cc/favicon.ico" alt="" />
              <div>wf</div>
            </v-btn>
            <v-btn class="app" variant="text" href="https://e9x.fun">
              <img src="https://e9x.fun/assets/images/logos/e9x.png" alt="" />
              <div>e9x</div>
            </v-btn>
          </v-card>
        </v-menu>
        <v-btn
          :icon="
            theme.global.name.value == 'dark'
              ? 'mdi-weather-sunny'
              : 'mdi-weather-night'
          "
          @click="toggleTheme"
        ></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :border="0" temporary>
      <v-list nav>
        <v-list-item prepend-icon="mdi-home" title="主页" to="/"></v-list-item>
        <!-- <v-list-item prepend-icon="mdi-star" title="收藏"></v-list-item> -->
        <v-list-item
          prepend-icon="mdi-plus"
          title="添加m3u源"
          to="/setup"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main :class="themeName">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
    <v-footer app style="z-index: 10000">
      <slot name="footer"></slot>
    </v-footer>
  </v-layout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useTheme } from "vuetify";
import { useRoute } from "vue-router";
const route = useRoute();
const theme = useTheme();
const themeName = computed(() => "v-theme--" + theme.global.name.value);
const drawer = ref(false);
const value = ref(route.query.q || "");
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  initBarBg(theme.global.name.value);
  localStorage.setItem("theme-name", theme.global.name.value);
};

function initBarBg(v) {
  let themeColors = {
    beige: "#f5f5d5",
    light: "#fff",
    dark: "#111",
  };
  // console.log(v, themeColors[v]);
  let el = document.querySelector('meta[name="theme-color"]');
  el && el.setAttribute("content", themeColors[v]);
  document.body.style.backgroundColor = themeColors[v];
}

watch(
  () => route.query.q,
  (q) => {
    value.value = q;
  }
);

onMounted(() => {
  theme.global.name.value = localStorage.getItem("theme-name") || "light";
  initBarBg(theme.global.name.value);
});
</script>
<style lang="less" scoped>
.search {
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 0 5px;
  min-height: 48px;
  background: rgba(var(--v-theme-on-surface-variant), 0.8);
  margin-left: 80px;
  width: 730px;
  // border-radius: 24px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  align-content: center;
  align-items: center;
  .search-btn {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background: rgb(var(--v-theme-on-surface-variant));
      border-radius: 50%;
      cursor: pointer;
    }
  }
  svg {
    fill: #666;
  }
  input {
    outline-width: 0;
    padding: 0 10px;
  }
  &:hover {
    border: 1px solid rgb(var(--v-theme-on-surface-variant));
    background: rgb(var(--v-theme-background));
    box-shadow: 0px 2px 2px rgb(var(--v-theme-on-surface-variant));
  }
}
.v-menu > .v-overlay__content > .v-card {
  border-radius: 1.5rem;
}
.apps {
  width: 300px;
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  text-align: center;
  justify-items: center;

  .app {
    font-size: 0.8rem;
    font-weight: normal;
    text-align: center;
    img {
      width: 32px;
      height: 32px;
    }
  }
}

.logo-warp {
  margin-left: 10px;
  display: flex;
  align-items: center;
  img {
    height: 36px;
  }
}
.logo-text {
  margin-left: 10px;
  color: var(--color);
  font-size: 1.2rem;
}
:deep(.apps) {
  .v-btn {
    height: 64px;
    width: 64px;
    text-transform: none;
    border-radius: 1rem;
    .v-btn__content {
      display: block;
    }
  }
}
</style>

<style lang="less">
.v-navigation-drawer--temporary {
  box-shadow: none !important;
}
.v-navigation-drawer__scrim {
  background: transparent !important;
}

.v-btn--icon.v-btn--density-default {
  width: calc(var(--v-btn-height) + 6px);
  height: calc(var(--v-btn-height) + 6px);
}
#app .v-footer {
  padding: 0;
}
.v-list-item-title {
  color: var(--color);
}
</style>
