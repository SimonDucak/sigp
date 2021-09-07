<template>
  <main class="w-screen h-screen bg-gray-200">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from "vuex";
import { Mutations } from "@/store";
import useSocket from "@/use/useSocket";
import { useRouter } from "vue-router";
import { RouteName } from "@/router/routes";

export default defineComponent({
  name: 'App',
  setup() {
    const { onGetUsers, onUserJoined, onGetCurrentUserID } = useSocket();
    const store = useStore();
    const { push } = useRouter();

    onGetUsers((users) => {
    	store.commit(Mutations.SET_ONLINE_USERS, users);
    });

    onUserJoined((user) => {
    	store.commit(Mutations.PUSH_USER, user);
    });

    onGetCurrentUserID((id) => {
			store.commit(Mutations.SET_CURRENT_USER_ID, id);
			push({ name: RouteName.DRAW });
		});
  },
});
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
