<template>
  <div>
    <my-title :msg="'Feuille de présence'" />
    <div class="mx-10 text-xl">
      Date du jour : {{ today }}
      <router-link to="calendar">
        <div class="ml-32 text-xs font-bold text-green-600">
          voir autres dates
        </div>
      </router-link>
    </div>
    <div class="flex justify-center w-full pt-4">
      <button
        class="p-2 px-4 m-2 rounded"
        v-for="tab in tabs"
        :key="`${tab.name}-button`"
        :class="{
          'bg-green-600': openedComponent === tab.name,
          'text-white': openedComponent === tab.name,
          'bg-cardGray': openedComponent !== tab.name,
        }"
        @click="openedComponent = tab.name"
      >
        {{ tab.label }}
      </button>
    </div>
    <member-list
      v-bind="currSessionProp"
      v-if="openedComponent"
      @eventUpdated="getCurrSessions(true)"
    />
  </div>
</template>

<script lang="ts">
import MyTitle from "@/components/TitlePage.vue";
import { defineComponent, ref, computed, Ref } from "@vue/composition-api";
import MemberList from "@/components/formulaires/MemberList.vue";
import InputText from "@/components/InputText.vue";
import SubmitButton from "@/components/submitButton.vue";
import { getAuthHeader } from "@/store";
import { JdrTable } from "./addtable.vue";

export interface User {
  DOB: string;
  city: string;
  email: string;
  firstname: string;
  gender: "Homme" | "Femme" | "Autre";
  id: number;
  lastname: string;
  users_sessions: { session_id: number; user_id: number };
  have_paid: boolean;
  is_jdr_player: boolean;
  is_jds_player: boolean;
  is_volunteer: boolean;
  is_member_of_honor: boolean;
}

interface Session {
  commit: string;
  date: string;
  id: number;
  is_jdr: boolean;
  is_jds: boolean;
  presents: Array<User>;
  table?: JdrTable;
}
export interface JdrSession extends Session {
  is_jdr: true;
}
export interface JdsSession extends Session {
  is_jds: true;
}

export default defineComponent({
  name: "Home",
  components: {
    MyTitle,
    InputText,
    SubmitButton,
    MemberList,
  },

  setup(_prop, { root }) {
    const tabs = [
      {
        name: "jdr",
        label: "JDR",
      },
      {
        name: "jds",
        label: "JDS",
      },
    ];

    const openedComponent = ref("");

    const today = new Intl.DateTimeFormat("fr-FR").format(new Date());

    const currDate = new Intl.DateTimeFormat("fr-FR")
      .formatToParts(new Date())
      .filter(el => el.type !== "literal")
      .sort((a, b) => {
        if (a.type === "year" || b.type === "year")
          return a.type === "year" ? -1 : 1;
        return a.type === "month" ? -1 : 1;
      })
      .reduce(
        (result, curr, i, array) =>
          result + (i < array.length - 1 ? `${curr.value}-` : curr.value),
        ""
      );
    const currSessions: Ref<Array<Session> | null> = ref(null);
    const currJDR = computed(() =>
      currSessions.value
        ? (currSessions.value.find(el => el.is_jdr) as JdrSession)
        : undefined
    );
    const currJDS = computed(() =>
      currSessions.value
        ? (currSessions.value.find(el => el.is_jds) as JdsSession)
        : undefined
    );
    const currSessionProp = computed(() =>
      openedComponent.value === "jdr" ? { currJDR } : { currJDS }
    );
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
    const router = root.$router;
    const getCurrSessions = async (shouldRefresh = false) => {
      try {
        const newSessions = await fetch(
          `http://localhost:4000/api/sessions?date=${currDate}`,
          myInit
        ).then(res => res.json());
        currSessions.value = newSessions;
      } catch (error) {
        console.log(error);
      }
      if (!shouldRefresh) return;
      router.go(0);
    };
    getCurrSessions();
    return {
      today,
      openedComponent,
      tabs,
      currSessionProp,
      getCurrSessions,
    };
  },
});
</script>
