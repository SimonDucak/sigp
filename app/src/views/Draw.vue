<template>
    <div class="w-screen h-screen flex items-center justify-center bg-white py-4 pr-4">
      <nav class="h-full w-28 flex flex-col justify-between items-center flex-shrink-0 py-8 pb-6">
        <img src="light-logo.png" class="w-9/12 h-auto">
        <div
          @click="logout"
          class="flex p-2 items-center text-gray-400 justify-center cursor-pointer transition duration-200 hover:text-gray-600"
        >
          <c-logout-icon class="w-8 h-8 "></c-logout-icon>
        </div>
      </nav>

      <div class="h-full w-full rounded-lg bg-gray-50 flex items-center">
        <users-list></users-list>
        <draw-editor :settings="{ color, lineWidth }"></draw-editor>
        <toolbar v-model:color="color" v-model:lineWidth="lineWidth"></toolbar>
      </div>

      <alerts></alerts>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { User } from "shared-resources/User";
import useSocket from "@/use/useSocket";
import { useStore } from "vuex";
import DrawEditor from "@/components/DrawEditor.vue";
import { Mutations } from "@/store";
import { useRouter } from "vue-router";
import { RouteName } from "@/router/routes";
import UsersList from "@/components/UsersList.vue";
import Toolbar from "@/components/Toolbar.vue";
import Alerts from "@/components/Alerts.vue";

export default defineComponent({
  name: 'Draw',
  components: { DrawEditor, UsersList, Toolbar, Alerts },
  setup() {
      const store = useStore();
      const { push } = useRouter();
      const { onAlert, emitLogout } = useSocket();

      const alertMessages = ref<string[]>([]);
      const color = ref<string>("#000");
      const lineWidth = ref<number>(3);

      onAlert((alertMessage: string) => {
          alertMessages.value.push(alertMessage);
      });

      const logout = () => {
          store.commit(Mutations.SET_ONLINE_USERS, store.getters.onlineUsers
              .filter((u: User) => u.id !== store.getters.currentUserID));
          store.commit(Mutations.SET_CURRENT_USER_ID, "");
          emitLogout();
          push({ name: RouteName.LOG_IN });
      };

      const onlineUsers = computed<User[]>(() => store.getters.onlineUsers);

      const currentUserID = computed<string>(() => store.getters.currentUserID);

      return {
          alertMessages,
          onlineUsers,
          currentUserID,
          color,
          lineWidth,
          logout,
      };
  },
});
</script>
