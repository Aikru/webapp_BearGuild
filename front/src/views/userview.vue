<template>
  <div>
    <my-title :msg="member.firstname + ' ' + member.lastname" />

    <ul>
      <li>
        {{ member.gender }}
      </li>
      <li>Est née le :{{ member.DOB }}</li>
      <li>ville : {{ member.city }}</li>

      <li>mail : {{ member.email }}</li>
      <li>telephone : {{ member.mail }}</li>

      <li>
        JDS<input type="checkbox" v-model="member.is_jds_player" /> JDR
        <input type="checkbox" v-model="member.is_jds_player" />
      </li>
      <li v-if="member.have_paid">Cotisation a jour !</li>
      <li v-else>Cotisation a payer !</li>
      <li>dernière presence :</li>

      <li v-if="member.is_volunteer">Bénévole de l'association</li>
      <li v-if="member.is_member_of_honor">
        membre d'honneur de l'association
      </li>
      <li v-if="member.is_admin">
        Membre du bureau de l'association
      </li>
      <li v-if="member.is_super_admin">
        President.e de l'association
      </li>
    </ul>

    <div>
      <button
        class="text-x text-green-600 mx-12 font-bold"
        @click="deletemember"
      >
        Supprimer le membre
      </button>
      <button class="text-x text-green-600 mx-12 font-bold">
        editer le membre
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import { defineComponent, computed } from "@vue/composition-api";
import MyTitle from "@/components/TitlePage.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import store from "@/store/index.ts";
import router from "../router";
export default defineComponent({
  components: { MyTitle },
  props: {
    id: Number,
    firstname: String,
    lastname: String,
    gender: String,
    mail: String,
    city: String,
    have_paid: Boolean,
    is_jdr_player: Boolean,
    is_jds_player: Boolean,
    is_volunteer: Boolean,
    is_member_of_honor: Boolean,
    is_admin: Boolean,
    is_super_admin: Boolean,
  },
  setup(_props, context) {
    store.dispatch.loadUsers();

    const params = context.root.$route.params;

    const member = computed(() =>
      store.state.Members.find(el => el.id === Number(params.id))
    );
    const deletemember = () => {
      store.dispatch.deleteMemberByID;
    };

    return { params, member, deletemember };
  },
});
</script>
