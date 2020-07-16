<template>
  <div>
    <div>
      <my-title :msg="'Panneau d\'administration'" />
    </div>

    <!-- MEMBRE -->
    <div>
      <button
        class="inline-flex items-center mx-5 text-xl font-semibold text-green-600 raw"
        @click.prevent="memberState = !memberState"
      >
        <img
          src="../svg/arrow.svg"
          alt="arrow"
          class="object-contain w-5 h-full mr-2"
          id="showMember"
          :style="getCurrSideStyle(memberArrowSide)"
        />
        Gestion des Membres
      </button>

      <div class="py-3" v-if="memberState">
        <div class="pl-12 mb-1" v-for="member in memberList" :key="member.id">
          <router-link
            class="flex justify-between w-2/3"
            :props="member"
            :to="`/user/${member.id}`"
            >{{ member.firstname }} {{ member.lastname }}
            <span>{{ member.have_paid ? "✓" : "✗" }}</span>
          </router-link>
        </div>
        <submit-button
          :is-plus-button="true"
          :text-button="'Ajouter un membre'"
          route="/addmember"
        />
      </div>

      <!-- TABLE -->
      <button
        class="inline-flex items-center mx-5 text-xl font-semibold text-green-600 raw"
        @click.prevent="tableState = !tableState"
      >
        <img
          src="../svg/arrow.svg"
          alt="arrow"
          class="object-contain w-5 h-full mr-2"
          :style="getCurrSideStyle(tableArrowSide)"
        />
        Gestion des Tables
      </button>

      <div class="py-3" v-if="tableState">
        <div
          class="pl-12 mb-1"
          v-for="(table, index) in tablesList"
          :key="index"
        >
          <JdrTable :table="table" />
        </div>
        <submit-button
          :is-plus-button="true"
          :text-button="'Ajouter une table'"
          route="/addtable"
        />
      </div>
      <button
        class="inline-flex items-center mx-5 text-xl font-semibold text-green-600 raw"
        @click="statState = !statState"
      >
        <img
          src="../svg/arrow.svg"
          alt="arrow"
          class="object-contain w-5 h-full mr-2"
          id="showMember"
          :style="getCurrSideStyle(statArrowSide)"
        />
        Statistiques
      </button>

      <div class="py-3" v-if="statState">
        <ul class="flex justify-center mb-1">
          <li
            v-for="(genderNumber, genderName) in genderStats"
            :key="`${genderName}-stats`"
            class="ml-2 text-center"
          >
            {{ genderNumber }}
            {{ `${genderName.toLowerCase()}${genderNumber > 1 ? "s" : ""}` }}
            ({{ getPercentInMembers(genderNumber) }}%)
          </li>
        </ul>
        <ul class="flex justify-center mb-1">
          <li
            v-for="(playerNumber, playerType) in playerTypeStats"
            :key="`${playerType}-stats`"
            class="ml-2 text-center"
          >
            {{ playerNumber }}
            {{ `joueur${playerNumber > 1 ? "s" : ""} de ${playerType}` }}
            ({{ getPercentInMembers(playerNumber) }}%)
          </li>
        </ul>
        <div class="flex justify-center mb-1">
          <span class="ml-2 text-center">
            {{ volunteerStats }} volontaire{{
              volunteerStats > 1 ? "s" : ""
            }}
            ({{ getPercentInMembers(volunteerStats) }}%)
          </span>
          <span class="ml-2 text-center">
            {{ payedStats }} cotisation{{ payedStats > 1 ? "s" : "" }} payée{{
              payedStats > 1 ? "s" : ""
            }}
            ({{ getPercentInMembers(payedStats) }}%)
          </span>
        </div>
        <div class="flex justify-center mb-1">
          <span class="ml-2 text-center">
            Argent gagné grâce aux cotisations : {{ currMoney }} €
          </span>
        </div>
        <div v-if="currSessions" class="flex justify-center my-1">
          <span class="ml-2 text-center">
            Sessions : {{ currSessions.length }} (JDR :
            {{ currSessions.filter(el => el.is_jdr).length }}, JDS :
            {{ currSessions.filter(el => el.is_jds).length }})
          </span>
        </div>
        <div class="flex justify-center mb-1">
          <span class="ml-2 text-center">
            Tables : {{ tablesList.length }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";
// import Arrow from "@/components/Arrow.vue";
import MyTitle from "@/components/TitlePage.vue";
import SubmitButton from "@/components/submitButton.vue";
import JdrTable from "@/components/Table.vue";
import store, { getAuthHeader } from "@/store/index.ts";
import { getCurrAngle } from "@/components/Arrow.vue";
import { User } from "@/views/home.vue";

export default defineComponent({
  name: "AdminPanel",
  components: {
    MyTitle,
    SubmitButton,
    JdrTable,
    // Arrow,
  },

  setup() {
    // UI
    store.dispatch.loadUsers();
    store.dispatch.loadTables();

    const memberList = computed(() => store.state.Members as Array<User>);
    const tablesList = computed(() => store.state.Tables);

    const memberState = ref(false);
    const tableState = ref(false);
    const statState = ref(false);

    const memberArrowSide = computed(() =>
      memberState.value ? "down" : "right"
    );
    const tableArrowSide = computed(() =>
      tableState.value ? "down" : "right"
    );
    const statArrowSide = computed(() => (statState.value ? "down" : "right"));
    const getCurrSideStyle = (side: "up" | "left" | "down" | "right") => ({
      transform: `rotate(${getCurrAngle(side)})`,
    });
    const genderStats = computed(() => ({
      Homme: memberList.value.filter(el => el.gender === "Homme").length,
      Femme: memberList.value.filter(el => el.gender === "Femme").length,
      Autre: memberList.value.filter(el => el.gender === "Autre").length,
    }));
    const playerTypeStats = computed(() => ({
      JDR: memberList.value.filter(el => el.is_jdr_player).length,
      JDS: memberList.value.filter(el => el.is_jds_player).length,
    }));
    const volunteerStats = computed(
      () => memberList.value.filter(el => el.is_volunteer).length
    );
    const payedStats = computed(
      () => memberList.value.filter(el => el.have_paid).length
    );
    const currMoney = computed(() => payedStats.value * 20);
    const getPercentInMembers = (currStat: number) =>
      Math.round(((currStat * 100) / memberList.value.length) * 100) / 100;

    const currSessions = ref(null);
    const myHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...getAuthHeader(),
    };
    const myInit = {
      method: "get",
      headers: myHeaders,
      mode: "cors" as "cors",
      cache: "default" as "default",
    };
    try {
      fetch(`http://localhost:4000/api/sessions`, myInit)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          currSessions.value = res;
        });
    } catch (error) {
      console.log(error);
    }

    return {
      memberList,
      tablesList,
      memberState,
      tableState,
      statState,
      getCurrSideStyle,
      memberArrowSide,
      tableArrowSide,
      statArrowSide,
      genderStats,
      playerTypeStats,
      volunteerStats,
      payedStats,
      currMoney,
      getPercentInMembers,
      currSessions,
    };
  },
});
</script>
