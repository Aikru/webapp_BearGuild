<template>
  <div class="m-5 text-xl raw text-green-600 font-semibold">{{ msg }}</div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { TypeText } from "@/components/UITypes.ts";

export default defineComponent({
  props: { msg: String }
});
</script>