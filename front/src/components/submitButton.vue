<template>
  <router-link :to="route">
    <div
      class="inline-flex items-center m-5 text-3xl font-semibold text-orange-500 raw"
    >
      <img
        v-if="isPlusButton"
        src="../svg/plus.png"
        alt="plus"
        class="object-contain w-5 h-full mr-2"
      />
      {{ textButton }}
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
// import { TypeText } from "@/components/UITypes";

export default defineComponent({
  props: {
    textButton: String,
    route: String,
    isPlusButton: { type: Boolean, default: false }
  }
});
</script>
