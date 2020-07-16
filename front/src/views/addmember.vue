<template>
  <div>
    <my-title :msg="'Ajouter un membre '" />

    <div class="w-full flex-column">
      <div>
        Nom:
        <input-text @input="UserConstruct('firstname', $event)" />
      </div>

      <div>
        Prénom:
        <input-text @input="UserConstruct('lastname', $event)" />
      </div>

      <div>
        Date de naisance:
        <input-text :type="'date'" @input="UserConstruct('dob', $event)" />
      </div>
      <div>
        Ville de résidence:
        <input-text @input="UserConstruct('city', $event)" />
      </div>
      <div>
        Genre:
        <label for="homme">
          <input
            type="radio"
            value="Homme"
            name="gender"
            id="homme"
            @change="UserConstruct('gender', $event)"
          />
          Homme
        </label>
        <label for="femme">
          <input
            type="radio"
            value="Femme"
            name="gender"
            id="femme"
            @change="UserConstruct('gender', $event)"
          />
          Femme
        </label>
        <label for="autre">
          <input
            type="radio"
            value="Autre"
            name="gender"
            id="autre"
            @change="UserConstruct('gender', $event)"
          />
          Autre
        </label>
      </div>
      <div>
        Email:
        <input-text @input="UserConstruct('mail', $event)" />
      </div>
    </div>
    <div class="flex">
      <div class="flex">
        Jeux de rôle
        <input-text
          :type="'checkbox'"
          @input="UserConstruct('is_jdr_player', $event)"
        />
      </div>
      <div>
        Jeux de société
        <input-text
          :type="'checkbox'"
          @input="UserConstruct('is_jds_player', $event)"
        />
      </div>
    </div>
    La personne...
    <div>
      <input-text
        :type="'checkbox'"
        id="havepaid"
        @input="UserConstruct('have_paid', $event)"
      />
      <label for="havepaid">a payé la cotisation annuelle ?</label>
    </div>
    <div>
      <input-text
        :type="'checkbox'"
        id="havereduction"
        @input="UserConstruct('have_reduction', $event)"
      />
      <label for="havereduction">a une réduction de cotisation ?</label>
    </div>
    <div>
      <input-text
        id="honormember"
        :type="'checkbox'"
        @input="UserConstruct('is_member_of_honor', $event)"
      />
      <label for="honormember">est membre d'honneur ?</label>
    </div>
    <div>
      <input-text
        id="volunteer"
        @input="UserConstruct('is_volunteer', $event)"
        :type="'checkbox'"
      />
      <label for="volunteer">est bénévole ?</label>
    </div>
    <div>
      <input-text
        :type="'checkbox'"
        id="admin"
        @input="UserConstruct('is_admin', $event)"
      />
      <label for="admin">a les droits d'admin ?</label>
    </div>

    <button
      class="flex items-center justify-center w-full h-24 m-auto text-2xl text-white bg-orange-500"
      @click="sendUser"
    >
      Valider
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import InputText from "@/components/InputText.vue";
import store from "@/store/index.ts";
import MyTitle from "@/components/TitlePage.vue";

export default defineComponent({
  components: { InputText, MyTitle },
  setup(_props, { root }) {
    const UserObject = ref({});
    const UserConstruct = (name, event) => {
      if (event.type && event.type === "checkbox") {
        UserObject.value[name] = event.checked;
        return;
      }
      UserObject.value[name] = event.target ? event.target.value : event.value;
    };
    const router = root.$router;
    const sendUser = () => {
      store.dispatch.sendUser(UserObject.value);
      router.push("/adminpanel");
    };

    return { UserConstruct, UserObject, sendUser };
  },
});
</script>
