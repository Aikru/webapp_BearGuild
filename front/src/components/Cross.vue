<template>
  <button @click.prevent="test">
    <img
      src="../svg/gcross.svg"
      class="h-full w-full justify-center cursor-pointer"
    />
  </button>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(props, context) {
    const test = e => {
      context.emit("click", e);
    };

    return {
      test,
    };
  },
});
</script>
