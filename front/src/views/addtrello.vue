<template>
  <article>
    <my-title :msg="'Créer un board Trello'" />
    <section class="flex flex-col w-full">
      <label class="mt-1 ml-3">
        Nom :
        <input-text @input="setBoardInfo('name', $event)" />
      </label>
      <label class="mt-2 ml-3">
        Deadline :
        <input-text type="date" @input="setBoardInfo('desc', $event)" />
      </label>
      <section class="mt-2 ml-3">
        Visibility :
        <label for="private">
          Private
          <input
            type="radio"
            id="private"
            value="private"
            :checked="currBoard.prefs_permissionLevel === 'private'"
            @change="setBoardInfo('prefs_permissionLevel', $event)"
        /></label>
        <label for="public">
          Public
          <input
            type="radio"
            id="public"
            value="public"
            :checked="currBoard.prefs_permissionLevel === 'public'"
            @change="setBoardInfo('prefs_permissionLevel', $event)"
        /></label>
      </section>
      <button
        class="flex items-center justify-center w-full h-24 m-auto mt-6 text-2xl text-white bg-orange-500"
        @click="createBoard()"
      >
        Valider
      </button>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "@vue/composition-api";
import MyTitle from "@/components/TitlePage.vue";
import InputText from "@/components/InputText.vue";
import {
  formatTrelloDate,
  addTrelloBoard,
  getTrelloBoards,
  TrelloBoard,
} from "../api/trelloApi";

export default defineComponent({
  name: "AddTrello",
  components: { MyTitle, InputText },
  setup(_props, { root }) {
    const currBoard: Ref<TrelloBoard> = ref({
      // eslint-disable-next-line @typescript-eslint/camelcase
      prefs_permissionLevel: "private",
    });
    const isEvent = (el: HTMLInputElement | Event): el is Event =>
      !!(el as Event).target;
    const setBoardInfo = (
      type: keyof TrelloBoard,
      el: HTMLInputElement | Event
    ) => {
      const currValue = isEvent(el)
        ? (el.target as HTMLInputElement).value
        : el.value;
      const currInfo =
        type === "desc" ? formatTrelloDate(currValue) : currValue;
      if (type === "prefs_permissionLevel")
        currBoard.value[type] = currInfo as "private" | "public";
      else currBoard.value[type] = currInfo;
    };
    const router = root.$router;
    const createBoard = async () => {
      try {
        await addTrelloBoard(currBoard.value);
        await getTrelloBoards();
        router.push(`/trello/${currBoard.value.name}`);
      } catch (error) {
        console.log(error);
      }
    };
    return { currBoard, setBoardInfo, createBoard };
  },
});
</script>
