<template>
  <article class="relative flex flex-col items-center py-2 mb-5 bg-cardGray">
    <cross
      @click="deleteCard()"
      class="absolute top-0 right-0 w-3 h-3 mt-1 mr-3"
    />
    <strong class="text-lg ">{{ currCard.name }}</strong>
    <p v-if="currCard.desc" class="py-5">{{ currCard.desc }}</p>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import Cross from "@/components/Cross.vue";
import { deleteTrelloCard, TrelloCard } from "@/api/trelloApi";

export default defineComponent({
  name: "TrelloCard",
  components: { Cross },
  props: {
    currCard: {
      type: Object as PropType<TrelloCard>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const deleteCard = async () => {
      try {
        await deleteTrelloCard(props.currCard.id);
        emit("cardDeleted");
      } catch (error) {
        console.log(error);
      }
    };
    return { deleteCard };
  },
});
</script>
