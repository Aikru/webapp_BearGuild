<template>
  <button
    @click="clicked()"
    class="z-10 flex items-center text-2xl text-green-600 cursor-pointer"
  >
    <img
      src="../svg/arrow.svg"
      class="w-8 h-8 mr-2 cursor-pointer"
      :style="currSideStyle"
      alt="arrow"
    />
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";

export const getCurrAngle = (side: "up" | "left" | "down" | "right") => {
  switch (side) {
    case "up":
      return "0.75turn";
    case "left":
      return "0.5turn";
    case "down":
      return "0.25turn";
    case "right":
      return "0turn";
  }
};

export default defineComponent({
  props: {
    side: {
      type: String as PropType<"up" | "left" | "down" | "right">,
      default: "left",
    },
  },
  setup(props, { emit }) {
    const currSideStyle = computed(() => ({
      transform: `rotate(${getCurrAngle(
        props.side as "up" | "left" | "down" | "right"
      )})`,
    }));
    const clicked = () => emit("clicked");
    return { currSideStyle, clicked };
  },
});
</script>
