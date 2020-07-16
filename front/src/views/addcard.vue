<template>
  <article>
    <header class="mt-2 ml-4 text-gray-700 text-l">
      {{ currName }} > {{ currColumn.name }}
    </header>
    <my-title :centered="true" :msg="'Créer une carte'" />
    <section class="flex flex-col w-full">
      <label class="mt-1 ml-3">
        Nom :
        <input-text @input="setCardInfo('name', $event)" />
      </label>
      <label class="mt-2 ml-3">
        Description :
        <input-text @input="setCardInfo('desc', $event)" />
      </label>
      <button
        class="flex items-center justify-center w-full h-24 m-auto mt-6 text-2xl text-white bg-orange-500"
        @click="createCard()"
      >
        Valider
      </button>
    </section>
  </article>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  computed,
  watchEffect,
} from "@vue/composition-api";
import MyTitle from "@/components/TitlePage.vue";
import InputText from "@/components/InputText.vue";
import store from "@/store/index";
import {
  getTrelloBoards,
  addTrelloCard,
  getListsInTrelloBoard,
  TrelloCard,
} from "../api/trelloApi";

export default defineComponent({
  name: "AddCard",
  components: { MyTitle, InputText },
  setup(_props, { root }) {
    const currName = computed(() => root.$route.params.name);
    const currColumnName = computed(() => root.$route.params.column);
    if (!store.state.TrelloBoards.length)
      getTrelloBoards().then(res => {
        store.commit.setTrelloBoards(res);
      });
    const currBoard = computed(() =>
      store.state.TrelloBoards.find(el => el.name === currName.value)
    );
    const currID = computed(() =>
      currBoard.value ? currBoard.value.id : null
    );
    watchEffect(async () => {
      if (
        !currID.value ||
        (currID.value && store.state.TrelloListsForBoard[currID.value])
      )
        return;
      const newLists = await getListsInTrelloBoard(currID.value);
      store.commit.setTrelloListsForBoard({
        boardID: currID.value,
        trelloLists: newLists,
      });
    });

    const currLists = computed(() =>
      currID.value && store.state.TrelloListsForBoard[currID.value]
        ? store.state.TrelloListsForBoard[currID.value]
        : null
    );
    const currColumn = computed(() =>
      currLists.value
        ? currLists.value.find(el => el.name === currColumnName.value)
        : undefined
    );

    const currCard: Ref<TrelloCard> = ref({});
    const isEvent = (el: HTMLInputElement | Event): el is Event =>
      !!(el as Event).target;
    const setCardInfo = (
      type: keyof TrelloCard,
      el: HTMLInputElement | Event
    ) => {
      const currValue = isEvent(el)
        ? (el.target as HTMLInputElement).value
        : el.value;
      currCard.value[type] = currValue;
    };
    const router = root.$router;
    const createCard = async () => {
      try {
        if (!currColumn.value) return;
        await addTrelloCard(currCard.value, currColumn.value.id);

        router.push(`/trello/${currName.value}/${currColumnName.value}`);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      currName,
      currBoard,
      currID,
      currLists,
      currColumn,
      currCard,
      createCard,
      setCardInfo,
    };
    // return { currBoard, setBoardInfo, createBoard };
  },
});
</script>
