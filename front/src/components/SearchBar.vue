<template>
  <div>
    <input
      type="text"
      :value="currText"
      placeholder="Search..."
      class="box-border w-full p-1 m-0 border border-green-600 border-solid rounded"
      @input="setCurrText($event)"
    />
    <ul
      v-if="currText.length"
      class="box-border p-1 overflow-y-scroll bg-gray-100 max-h-20 "
    >
      <li
        v-for="member in currSuggestions"
        :key="`${member.id}-sug`"
        @click="selectUser(member)"
        class="cursor-pointer"
      >
        {{ `${member.firstname}` }} {{ `${member.lastname}` }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";
import store from "@/store/index.ts";
import { User } from "@/views/home.vue";

export default defineComponent({
  setup(props, context) {
    const currText = ref("");
    const setCurrText = (event: { target: { value: string } }) =>
      (currText.value = event.target.value);
    const memberlist = computed(
      () => store.state.Members.sort() as Array<User>
    );

    const currSuggestions = computed(() =>
      memberlist.value
        .filter(member => {
          const mdln = `${member.lastname} ${member.firstname}`;
          return mdln.toLowerCase().includes(currText.value.toLowerCase());
        })
        .sort((a, b) => {
          const aname = `${a.firstname} ${a.lastname}`;
          const bname = `${b.firstname} ${b.lastname}`;

          return (
            aname.toLowerCase().indexOf(currText.value.toLowerCase()) -
            bname.toLowerCase().indexOf(currText.value.toLowerCase())
          );
        })
    );
    const selectUser = (event: { target: { value: string } }) => {
      currText.value = "";
      context.emit("objectUser", event);
    };
    return {
      currText,
      setCurrText,
      currSuggestions,
      selectUser,
    };
  },
});
</script>
