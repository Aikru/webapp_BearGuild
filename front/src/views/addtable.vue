<template>
  <div>
    <my-title :msg="'Créer une table'" />

    <div class="w-full flex-column">
      <div>
        Nom du Jeu de Rôle
        <input-text @input="TableConstruct('jdr_name', $event)" />
      </div>

      <div>
        DM:
        <input-text @input="TableConstruct('dm', $event)" />
      </div>

      <div>
        Première séance prévue le :
        <input-text
          :type="'date'"
          @input="TableConstruct('first_seance', $event)"
        />
      </div>
      <div>
        Dernière séance prévue le :
        <input-text
          :type="'date'"
          @input="TableConstruct('last_seance', $event)"
        />
      </div>
      <div>
        Temps entre deux séances (en jours) :
        <input-text @input="TableConstruct('time_between_seances', $event)" />
      </div>
      Participants :

      <search-bar @objectUser="choosePlayer($event)" />
      <div
        class="font-bold text-green-600 text-x"
        v-for="(player, index) in TableObject.players"
        :key="index"
      >
        <dir @click="removeplayer(index)" class="cursor-pointer">
          X {{ player.firstname }} {{ player.lastname }}
        </dir>
      </div>
    </div>

    <button
      class="flex items-center justify-center w-full h-24 m-auto text-2xl text-white bg-orange-500"
      @click="sendTable()"
    >
      Valider
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import InputText from "@/components/InputText.vue";
import store from "@/store/index.ts";
import MyTitle from "@/components/TitlePage.vue";
import SearchBar from "@/components/SearchBar.vue";
import MyCross from "@/components/Cross.vue";
import { User } from "./home.vue";

export interface JdrTable {
  id: number;
  jdr_name: string;
  dm: string;
  first_seance: Date;
  last_seance: Date;
  time_between_seances: string;
  players: Array<User>;
}

export default defineComponent({
  name: "AddTable",
  components: { InputText, MyTitle, SearchBar, MyCross },
  setup(_props, { root }) {
    store.dispatch.loadUsers();

    const TableObject = ref({
      players: [] as Array<User>,
    } as JdrTable);

    const currText = ref("");
    const removeplayer = (index: number) => {
      TableObject.value.players.splice(index, 1);
    };
    const choosePlayer = ($event: User) => {
      TableObject.value.players.push($event);
    };

    const TableConstruct = (
      name: Exclude<keyof JdrTable, "players">,
      event: { value: string | Date | number }
    ) => {
      if (name === "first_seance" || name === "last_seance")
        return (TableObject.value[name] = event.value as Date);
      if (name === "id")
        return (TableObject.value[name] = event.value as number);
      TableObject.value[name] = event.value as string;
    };
    const arrayPlayerID = computed(() =>
      TableObject.value.players.map(el => el.id)
    );

    const router = root.$router;
    const sendTable = () => {
      // const {id, jdr_name, last_seance, first_seance, dm, time_between_seances} = TableObject.value;
      // store.dispatch.sendTable({
      //   id, jdr_name, last_seance, first_seance, dm, time_between_seances, players : arrayPlayerID.value
      // });
      store.dispatch.sendTable({
        ...TableObject.value,
        players: arrayPlayerID.value,
      });
      // {TableObject.value.players} = {arrayPlayerID}
      router.push("/adminpanel");
    };

    return {
      TableConstruct,
      TableObject,
      sendTable,
      choosePlayer,
      currText,
      removeplayer,
    };
  },
});
</script>
