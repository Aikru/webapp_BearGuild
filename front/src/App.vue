<template>
  <div id="app">
    <div v-if="isUserConnected">
      <my-menu />

      <nav-bar />
      <router-view />
    </div>
    <div v-else>
      <my-connection />
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import MyMenu from "@/components/Menu.vue";
import MyConnection from "@/components/formulaires/UIConnexion.vue";

import { defineComponent, computed } from "@vue/composition-api";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import store from "@/store/index.ts";

export default defineComponent({
  name: "App",

  components: {
    NavBar,
    MyMenu,
    MyConnection,
  },
  setup() {
    const userInfos = window.localStorage.getItem("bearguildUser");
    if (userInfos) {
      const { userId, accessToken } = JSON.parse(userInfos);
      store.dispatch.getUser({ id: userId, accessToken });
    }

    const user = computed(() => store.state.User);

    const isUserConnected = computed(() => Object.keys(user.value).length);

    return { isUserConnected };
  },
});
</script>

<style></style>
