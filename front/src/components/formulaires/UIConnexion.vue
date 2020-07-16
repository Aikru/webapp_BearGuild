<template>
  <div class="w-full bg-green-600 h-screen pt-20">
    <h2 class="text-xl raw text-white font-semibold mt-0 p-5">
      Connectez vous !
    </h2>
    <form @submit.prevent="callConnexion">
      <label for="mail" class="mx-5 block">
        <p class="text-white">Email:</p>
        <input-text id="mail" @input="Logger('mail', $event)" />
      </label>
      <label for="password" class="mx-5 block">
        <p class="text-white">Password:</p>
        <input-text @input="Logger('password', $event)" :type="'password'" />
      </label>
      <button class="w-full text-white bg-orange-500 p-5 mt-8" type="submit">
        Se connecter
      </button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import InputText from "@/components/InputText.vue";
import MyTitle from "@/components/TitlePage.vue";
import Button from "@/components/submitButton.vue";

import store from "@/store/index.ts";

export default defineComponent({
  components: { MyTitle, InputText, Button },
  setup() {
    const user = ref({});

    const Logger = (name, event) => {
      user.value[name] = event.value;
    };
    const callConnexion = () => {
      store.dispatch.callConnexion(user.value);
    };

    return {
      user,
      Logger,
      callConnexion,
    };
  },
});
</script>
