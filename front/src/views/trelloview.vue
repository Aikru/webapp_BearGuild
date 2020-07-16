<template>
  <section v-if="currBoard" class="relative flex flex-col">
    <arrow
      v-if="shouldShowLeftArrow"
      side="left"
      class="absolute top-0 left-0 ml-2"
      :style="{ top: '50%', transform: 'translateY(-50%)' }"
      @clicked="goToList('prev')"
    />
    <arrow
      v-if="shouldShowRightArrow"
      side="right"
      class="absolute top-0 right-0 mr-2"
      :style="{ top: '50%', transform: 'translateY(-50%)' }"
      @clicked="goToList('next')"
    />
    <header class="mt-2 ml-4 text-gray-700 text-l">{{ currName }} ></header>
    <router-view />
    <arrow @clicked="returnToBoards()" side="left" class="ml-3">
      Retour
    </arrow>
  </section>
  <section v-else>
    Loading...
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watchEffect,
} from "@vue/composition-api";
import store from "@/store/index";
import Arrow from "@/components/Arrow.vue";
import { getTrelloBoards, getListsInTrelloBoard } from "@/api/trelloApi";

export default defineComponent({
  name: "Board",
  components: { Arrow },
  setup(_props, { root }) {
    const currName = computed(() => root.$route.params.name);
    const currColumnName = computed(() => root.$route.params.column);
    const currBoard = computed(() =>
      store.state.TrelloBoards.find(el => el.name === currName.value)
    );
    if (!store.state.TrelloBoards.length || !currBoard.value)
      getTrelloBoards().then(res => {
        store.commit.setTrelloBoards(res);
      });
    const currID = computed(() =>
      currBoard.value ? currBoard.value.id : null
    );
    const currLists = computed(() =>
      currID.value && store.state.TrelloListsForBoard[currID.value]
        ? store.state.TrelloListsForBoard[currID.value]
        : null
    );
    watchEffect(async () => {
      if (!currID.value || currLists.value) return;
      const newLists = await getListsInTrelloBoard(currID.value);
      store.commit.setTrelloListsForBoard({
        boardID: currID.value,
        trelloLists: newLists,
      });
    });
    const router = root.$router;
    watchEffect(async () => {
      if (currColumnName.value || !currLists.value) return;
      router.push(`/trello/${currName.value}/${currLists.value[0].name}`);
    });
    const returnToBoards = () => {
      router.push("/trello");
    };
    const currIndex = computed(() =>
      currLists.value
        ? currLists.value.findIndex(el => el.name === currColumnName.value)
        : null
    );
    const shouldShowRightArrow = computed(
      () =>
        currLists.value &&
        currLists.value.length > 1 &&
        (currIndex.value as number) < currLists.value.length - 1
    );
    const shouldShowLeftArrow = computed(
      () => currLists.value && currLists.value.length > 1 && !!currIndex.value
    );
    const goToList = (listToGo: "next" | "prev") => {
      if (!currLists.value) return;
      const newIndex =
        listToGo === "next"
          ? (currIndex.value as number) + 1
          : (currIndex.value as number) - 1;
      const newList = currLists.value[newIndex];
      router.push(`/trello/${currName.value}/${newList.name}`);
    };
    return {
      currName,
      currColumnName,
      currID,
      currBoard,
      currLists,
      returnToBoards,
      currIndex,
      shouldShowRightArrow,
      shouldShowLeftArrow,
      goToList,
    };
  },
});
</script>
<style scoped></style>
