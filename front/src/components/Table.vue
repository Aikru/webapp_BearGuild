<template>
  <section>
    <button
      class="flex items-center text-lg font-semibold"
      @click="State = !State"
    >
      <img
        src="../svg/arrow.svg"
        alt="arrow"
        class="object-contain w-4 h-full mr-2"
        :style="getCurrSideStyle(arrowSide)"
      />
      {{ table.jdr_name }} par {{ table.dm }}
    </button>
    <ul class="py-3" v-if="State">
      <li
        class="pl-6 mb-1 "
        v-for="player in table.players"
        :key="`${player.id}-table-${table.id}`"
      >
        {{ player.firstname }} {{ player.lastname }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent, ref, PropType, computed } from "@vue/composition-api";
//import Cross from "@/components/Cross.vue";
import store from "@/store/index.ts";
import { JdrTable } from "../views/addtable.vue";
import { getCurrAngle } from "@/components/Arrow.vue";

export default defineComponent({
  //components: { Cross },
  props: {
    table: Object as PropType<JdrTable>,
  },

  setup(props) {
    const State = ref(false);
    console.log(props.table);
    // const presentui = ref([1, 23, 8]);

    const arrowSide = computed(() => (State.value ? "down" : "right"));
    const getCurrSideStyle = (side: "up" | "left" | "down" | "right") => ({
      transform: `rotate(${getCurrAngle(side)})`,
    });
    return {
      State,
      arrowSide,
      getCurrSideStyle,
    };
  },
});
</script>
