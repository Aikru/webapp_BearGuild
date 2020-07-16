<template>
  <nav class="w-full h-18 text-white flex bg-green-600">
    <img
      src="../svg/menu.svg"
      class="h-12 w-10 m-2 cursor-pointer"
      @click="openMenu"
    />
    <span class="w-full flex justify-end ws font-semibold text-m self-center">
      <p :name="'lol'" class="p-2">{{ user.firstname }}</p>
      <button class="p-2" @click.prevent="disconnectUser">
        Se déconnecter
      </button>
    </span>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import store from "@/store/index.ts";

export default defineComponent({
  setup() {
    const openMenu = () => store.dispatch.togglingMenu();

    const user = computed(() => store.state.User);
    const disconnectUser = () => {
      window.localStorage.removeItem("bearguildUser");
      store.dispatch.setUser({});
    };
    return {
      openMenu,
      user,
      disconnectUser,
    };
  },
});
</script>
