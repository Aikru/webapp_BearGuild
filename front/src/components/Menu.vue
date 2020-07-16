<template>
  <div
    v-if="menuState"
    class="absolute .inset-0 z-50 w-full h-full ws bg-green-600 text-white p-10"
  >
    <img
      src="../svg/cross.svg"
      class="mx-10 cursor-pointer h-5 w-5 absolute right-0 txt-m"
      @click="closeMenu"
    />
    <div class="pt-10">
      <div v-for="(menuItem, index) in menu" :key="index">
        <a @click="closeMenu" class="p-2 w-full block">
          <router-link :to="`${menuItem.link}`">{{
            menuItem.name
          }}</router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MenuItem } from "./UITypes";
import { computed, defineComponent } from "@vue/composition-api";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import store from "@/store/index.ts";

export default defineComponent({
  setup() {
    const menuState = computed(() => store.state.isMenuOpen);
    const closeMenu = () => store.dispatch.togglingMenu();
    // const menuState = ref(true);
    // const closeMenu = () => (menuState.value = !menuState.value);
    const menu = [
      { name: "Accueil", link: "/", UIadmin: false },
      //  { name: "Mes Tables", link: "/TTRPG", UIadmin: false },
      //   { name: "Annuaire", link: "/annuaire", UIadmin: false },
      { name: "Panneau administratif", link: "/adminpanel", UIadmin: true },
      { name: "Trello", link: "/trello", UIadmin: true },
    ] as Array<MenuItem>;

    return {
      closeMenu,
      menu,
      menuState,
    };
  },
});
</script>
