<template>
  <div>
    <my-title :msg="'Calendrier'" />

    Je veux toutes les tables du :
    <input-text :type="'date'" @input="getTable('firstDate', $event)" />

    jusqu'au :
    <input-text :type="'date'" @input="getTable('lasteDate', $event)" /> <br />
    <button class="  items-center text-xl font-semibold text-orange-500 raw">
      valider
    </button>
  </div>
</template>

<script lang="ts">
import MyTitle from "@/components/TitlePage.vue";
import InputText from "@/components/InputText.vue";
import { defineComponent } from "@vue/composition-api";
import SubmitButton from "@/components/submitButton.vue";

export default defineComponent({
  components: { MyTitle, InputText, SubmitButton }
});
</script>
