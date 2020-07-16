<template>
  <article>
    <my-title :msg="'trello'" />
    <section v-if="!isLoading">
      <ul class="flex flex-col w-full ">
        <li
          v-for="board in userTrelloBoards"
          :key="`${board.id}-trelloBoard`"
          class="flex items-center w-8/12 ml-4 mr-auto"
        >
          <cross @click="deleteBoard(board.id)" class="w-3 h-3 mr-3" />
          <strong class="mr-3">{{
            board.desc ? board.desc : formatTrelloDate(board.dateLastActivity)
          }}</strong>
          <router-link :to="`/trello/${board.name}`">
            {{ board.name }}
          </router-link>
        </li>
      </ul>
      <submit-button
        :is-plus-button="true"
        :text-button="'Ajouter un Trello'"
        route="/addtrello"
      />
    </section>
    <section class="ml-4" v-else>
      Loading Trello boards...
    </section>
  </article>
</template>

<script lang="ts">
import MyTitle from "@/components/TitlePage.vue";
import { defineComponent, ref, computed } from "@vue/composition-api";
import SubmitButton from "@/components/submitButton.vue";
import Cross from "@/components/Cross.vue";
import store from "@/store/index";
import {
  formatTrelloDate,
  getTrelloBoards,
  deleteTrelloBoard,
} from "../api/trelloApi";

export default defineComponent({
  name: "Trello",
  components: { MyTitle, SubmitButton, Cross },
  setup() {
    const isLoading = ref(true);
    const userTrelloBoards = computed(() => store.state.TrelloBoards);
    try {
      getTrelloBoards().then(res => {
        isLoading.value = false;
        store.commit.setTrelloBoards(res);
      });
    } catch (error) {
      console.log(error);
    }
    const deleteBoard = async (boardId: string) => {
      try {
        isLoading.value = true;
        await deleteTrelloBoard(boardId);
        const newBoards = await getTrelloBoards();
        store.commit.setTrelloBoards(newBoards);
        isLoading.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    return { isLoading, userTrelloBoards, formatTrelloDate, deleteBoard };
  },
});
</script>
