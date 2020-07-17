<template>
  <router-link :to="route">
    <div class="inline-flex px-2 my-4  ml-16 text-white bg-orange-500 rounded">
      <div v-if="isPlusButton" class="text-3xl">+</div>
      <div class="self-center">
        {{ textButton }}
      </div>
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
    isPlusButton: { type: Boolean, default: false },
  },
});
</script>
