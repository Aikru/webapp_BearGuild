<template>
  <input
    @input="inputChange"
    type="text"
    ref="refInput"
    class="border-green-600 m-1 border-solid border p-1 rounded"
  />
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  setup(_props, context) {
    const refInput = ref(null);

    const inputChange = () => {
      context.emit("input", refInput.value);
    };

    return { refInput, inputChange };
  },
});
</script>
