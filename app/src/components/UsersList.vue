<template>
    <div class="w-80 h-full flex-shrink-0 border-r border-gray-200 px-8 py-12 overflow-x-hidden overflow-y-auto">
      <h3 class="text-3xl mb-6">
        <strong>Users</strong>
      </h3>

      <ul class="w-full">
        <li
          class="flex border-b border-gray-200 pb-3 mb-3 justify-start items-start w-full"
          v-for="user in filteredUsers"
          :key="user.id"
        >
          <div
            class="w-10 h-10 text-white mr-4 font-medium rounded-full flex-shrink-0 flex items-center justify-center"
            :class="{
              'bg-black': isCurrentUser(user.id),
              'bg-blue-500': !isCurrentUser(user.id)
            }"
          >
            {{user.username[0].toUpperCase()}}
          </div>

          <div class="flex flex-col text-sm">
            <h4 class="font-medium">
              {{capitalize(user.username).slice(0, 20)}}
            </h4>

            <p class="text-xs text-gray-500">
              32 min ago
            </p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { User } from "shared-resources/User";
import { removeDiacritics, capitalize } from "@/utils/string";

export default defineComponent({
  name: "UsersList",
  setup() {
  	const store = useStore();

  	const search = ref<string>("");

  	const filteredUsers = computed<User[]>(() => {
  	    const { onlineUsers } = store.getters;
  	    if (onlineUsers.length === 1) return onlineUsers;
  	    const searchWithoutDiacritics = removeDiacritics(search.value).toLowerCase();
  	    return onlineUsers.filter((user: User) => {
  	        const username = user.username.slice(0, searchWithoutDiacritics.length).toLowerCase();
  	        return username === searchWithoutDiacritics;
        });
    });

  	const isCurrentUser = (id: string) => store.getters.currentUserID === id;

  	return {
  	    search,
        filteredUsers,
        capitalize,
        isCurrentUser,
    };
  }
});
</script>
