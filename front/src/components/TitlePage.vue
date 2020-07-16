<template>
  <div
    class="flex m-5 text-3xl font-semibold text-green-600 raw"
    :class="{ 'justify-center': centered }"
  >
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
// import { TypeText } from "@/components/UITypes.ts";

export default defineComponent({
  props: {
    msg: String,
    centered: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
