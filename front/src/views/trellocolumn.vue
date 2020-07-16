<template>
  <section v-if="currColumn" class="relative">
    <my-title :centered="true" :msg="currColumnName" />
    <!-- <cross
      @click="archiveList()"
      class="absolute top-0 right-0 w-5 h-5 mr-3 "
    /> -->
    <ul class="flex flex-col w-8/12 m-auto">
      <li v-for="card in currCards" :key="`card-${card.id}`">
        <trello-card :currCard="card" @cardDeleted="setCurrCards()" />
      </li>
    </ul>
    <submit-button
      :is-plus-button="true"
      :text-button="'Ajouter une tâche'"
      :route="`${currRoute}/addcard`"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from "@vue/composition-api";
import TrelloCard from "@/components/TrelloCard.vue";
import MyTitle from "@/components/TitlePage.vue";
import Cross from "@/components/Cross.vue";
import SubmitButton from "@/components/submitButton.vue";
import store from "@/store/index";
import { getCardsinTrelloList, archiveTrelloList } from "@/api/trelloApi";

export default defineComponent({
  name: "TrelloColumn",
  components: { MyTitle, Cross, SubmitButton, TrelloCard },
  setup(props, { root }) {
    const currRoute = computed(() => root.$route.fullPath);
    const currName = computed(() => root.$route.params.name);
    const currColumnName = computed(() => root.$route.params.column);
    const currBoard = computed(() =>
      store.state.TrelloBoards.find(el => el.name === currName.value)
    );
    const currID = computed(() =>
      currBoard.value ? currBoard.value.id : null
    );
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
    const currColumnID = computed(() =>
      currColumn.value ? currColumn.value.id : null
    );
    const setCurrCards = async () => {
      if (!currColumnID.value) return;
      try {
        const newCards = await getCardsinTrelloList(currColumnID.value);
        store.commit.setTrelloCardsForList({
          listID: currColumnID.value,
          trelloCards: newCards,
        });
      } catch (error) {
        console.log(error);
      }
    };
    const currCards = computed(() =>
      currColumnID.value && store.state.TrelloCardsForList[currColumnID.value]
        ? store.state.TrelloCardsForList[currColumnID.value]
        : null
    );
    watchEffect(async () => setCurrCards());
    const archiveList = async () => {
      if (!currColumn.value) return;
      try {
        const res = await archiveTrelloList(currColumn.value.id);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      currRoute,
      currColumnName,
      currLists,
      currColumn,
      currID,
      currCards,
      archiveList,
      setCurrCards,
    };
  },
});
</script>
