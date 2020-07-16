<template>
  <div>
    <my-middle-title v-if="isJdr" msg="Table de jdr associée" />
    <select v-if="isJdr" class="mx-5" v-model="selectedTable">
      <option v-for="table in possibleTables" :key="table.id" :value="table.id">
        {{ table.jdr_name }}
      </option>
    </select>
    <my-middle-title
      :msg="`Liste des membres de ${isJdr ? 'la table' : 'l\'assos'}`"
    />
    <div class="mx-5">
      <div v-if="!isJdr" class="content-center">
        <search-bar @objectUser="choosePlayer($event)" />
      </div>
      <div
        class="flex mx-5 mt-5 font-semibold text-gray-900 capitalize ws"
        v-for="(member, index) in memberList"
        :key="`${member.id}--here`"
      >
        <label :for="`member-${member.id}`">
          <input
            :id="`member-${member.id}`"
            type="checkbox"
            class="hidden"
            @click="addMember(member, index)"
          />
          <cross
            class="self-center w-3 h-3 transform rotate-45"
            @click="addMember(member, index)"
          />
          <span class="ml-2 cursor-pointer">
            {{ `${member.firstname}` }} {{ `${member.lastname}` }}
          </span>
        </label>
      </div>
    </div>
    <div v-if="isJdr" class="flex justify-end w-full p-5 px-5">
      <button
        v-if="memberList.length"
        class="p-2 ml-5 text-white bg-green-600 rounded"
        @click="allMembersAreHere()"
      >
        + Ajouter tous les membres
      </button>
    </div>

    <my-middle-title :msg="'Membres présent·e·s'" />

    <div
      class="mx-10 font-bold text-gray-700 capitalize ws"
      v-for="(member, index) in isHereMember"
      :key="`${index}-here`"
    >
      <div class="flex">
        <cross
          class="self-center w-3 h-3"
          @click="removeMember(member, index)"
        />
        <div class="ml-2 cursor-pointer" @click="removeMember(member, index)">
          {{ `${member.firstname}` }} {{ `${member.lastname}` }}
        </div>
      </div>
    </div>

    <my-middle-title :msg="'Invité·e·s'" />
    <div
      class="flex-row mx-5"
      v-for="(invite, index) in numberInvite"
      :key="`${index}-here2`"
    >
      <input-text @input="addInvite(index, $event)" />
    </div>
    <div class="flex justify-end w-full p-5 px-5">
      <button
        class="p-2 text-white bg-green-600 rounded"
        @click="numberInvite++"
      >
        + Ajouter un·e invité·e
      </button>
    </div>

    <button
      @click="sendMemberList()"
      class="w-full h-24 m-auto text-2xl text-white bg-orange-500"
    >
      Valider
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  PropType,
  Ref,
  watchEffect,
} from "@vue/composition-api";
import store from "@/store/index.ts";
import MyMiddleTitle from "@/components/MiddleTitle.vue";
import Cross from "@/components/Cross.vue";
import InputText from "@/components/InputText.vue";
import SearchBar from "@/components/SearchBar.vue";
import { JdsSession, JdrSession, User } from "@/views/home.vue";
import { JdrTable } from "@/views/addtable.vue";

export default defineComponent({
  components: {
    InputText,
    MyMiddleTitle,
    Cross,
    SearchBar,
  },
  props: {
    currJDS: {
      type: Object as PropType<Ref<JdsSession | undefined>>,
    },
    currJDR: {
      type: Object as PropType<Ref<JdrSession | undefined>>,
    },
  },
  setup(props, { emit }) {
    store.dispatch.loadUsers();
    store.dispatch.loadTables();
    const isJdr = computed(() => !!props.currJDR);

    const possibleTables = computed(
      () => store.state.Tables as Array<JdrTable>
    );

    const selectedTable = ref(0);

    watchEffect(() => {
      if (
        props.currJDR &&
        props.currJDR.value &&
        props.currJDR.value.table &&
        !selectedTable.value
      ) {
        selectedTable.value = props.currJDR.value.table.id;
      }
    });

    const currSession = computed(() =>
      isJdr.value ? props.currJDR?.value : props.currJDS?.value
    );
    const alreadyHereMembers = computed(() =>
      currSession.value ? currSession.value.presents : []
    );
    const addedMember: Ref<Array<User>> = ref([]);
    const removedMember: Ref<Array<User>> = ref([]);
    const isHereMember = computed(() =>
      [...alreadyHereMembers.value, ...addedMember.value].filter(
        el => !removedMember.value.includes(el)
      )
    );
    const memberList = computed(() => {
      if (!store.state.Members || !store.state.Members.length)
        return [] as Array<User>;

      const members = store.state.Members.filter(
        (el: { id: number }) =>
          !isHereMember.value.find(member => member.id === el.id)
      );

      if (!isJdr.value || !selectedTable.value) return members;

      const table = possibleTables.value.find(
        t => t.id === selectedTable.value
      );

      if (!table) return members;

      return table.players.filter(
        (el: { id: number }) =>
          !isHereMember.value.find(member => member.id === el.id)
      );
    });

    const numberInvite = ref(2);
    const arrayInvite: Ref<Array<string>> = ref([]);
    const addInvite = (invite: number, event: HTMLInputElement) => {
      arrayInvite.value[invite] = event.value;
    };

    const addMember = (member: User) => {
      if (removedMember.value.find(el => el.id === member.id))
        return removedMember.value.splice(
          removedMember.value.findIndex(el => el.id === member.id),
          1
        );
      addedMember.value.push(member);
    };
    const removeMember = (member: User) => {
      if (addedMember.value.find(el => el.id === member.id))
        return addedMember.value.splice(
          addedMember.value.findIndex(el => el.id === member.id),
          1
        );
      removedMember.value.push(member);
    };
    const allMembersAreHere = () => {
      removedMember.value = [];
      addedMember.value = [
        ...addedMember.value,
        ...memberList.value.filter(
          el => !alreadyHereMembers.value.find(member => member.id === el.id)
        ),
      ];
    };
    const choosePlayer = ($event: User) => {
      memberList.value.includes($event)
        ? addedMember.value.push($event)
        : console.log("ERROR, membre déjà présent");
    };

    const sendMemberList = () => {
      const isUpdate = !!currSession.value;
      const memberListIDs = isHereMember.value.map(el => el.id);
      const currDate = new Date();

      const memberListObj = {
        body: {
          date: currDate,
          // eslint-disable-next-line @typescript-eslint/camelcase
          is_jds: !isJdr.value,
          // eslint-disable-next-line @typescript-eslint/camelcase
          is_jdr: isJdr.value,
          presents: memberListIDs,
          commit: arrayInvite.value.length
            ? `Invité·e·s: ${arrayInvite.value.join(", ")}`
            : "RAS",
          // eslint-disable-next-line @typescript-eslint/camelcase
          jdrtable_id: isJdr.value && selectedTable.value,
        },
        isUpdate,
        id: currSession.value ? currSession.value.id : null,
      };
      store.dispatch.sendMemberlist(memberListObj);
      emit("eventUpdated");
    };

    return {
      isJdr,
      memberList,
      isHereMember,
      addMember,
      allMembersAreHere,
      addInvite,
      removeMember,
      numberInvite,
      choosePlayer,
      sendMemberList,
      selectedTable,
      possibleTables,
    };
  },
});
</script>
