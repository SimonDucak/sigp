<template>
    <div class="w-screen h-screen flex items-center flex-col justify-center space-y-4">
      <transition name="fade">
        <div v-if="errorVisible" class="w-96 p-6 bg-yellow-500 text-white rounded-md">Username is required!</div>
      </transition>

      <div class="w-96 rounded-md bg-white flex flex-col">
        <div class="w-full px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <c-users-icon class="text-blue-500"></c-users-icon>
          <div class="flex items-center">
            <h4 class="text-gray-500 mr-2"><i>Users online</i></h4>
            <div class="w-6 h-6 flex items-center justify-center text-white rounded-full bg-green-500">
              {{usersLength}}
            </div>
          </div>
        </div>

        <form @submit.prevent="joinRoom" class="flex flex-col space-y-4 w-full p-6 border-b border-gray-200">
          <c-input-box v-model.trim="username" placeholder="Enter username" name="username" id="username">
            <template v-slot:label>Username</template>
          </c-input-box>

          <c-button>Join Room</c-button>
        </form>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import useSocket from "@/use/useSocket";
import { User } from "shared-resources/User";
import { useStore } from "vuex";

export default defineComponent({
  name: 'LogIn',
  setup() {
      const { emitJoinUser } = useSocket();
      const store = useStore();

      const username = ref<string>("");
      const errorVisible = ref<boolean>(false);

      const joinRoom = (): void => {
          if (!username.value) {
              errorVisible.value = true;
              return;
          }
          const newUser: User = { username: username.value, id: "" };
          emitJoinUser(newUser);
      };

      const usersLength = computed<number>(() => store.getters.onlineUsers.length);

      return {
          username,
          usersLength,
          errorVisible,
          joinRoom,
      };
  },
});
</script>
