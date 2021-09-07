<template>
  <div class="fixed w-80 bottom-16 right-16 flex flex-col space-y-2 pointer-events-none">
    <transition-group name="fade">
      <div
        class="w-full rounded-md bg-yellow-500 text-white p-4"
        v-for="alert in alerts"
        :key="alert.id"
      >{{alert.message}}</div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useSocket from "@/use/useSocket";
import { v4 } from "uuid";

export default defineComponent({
  name: 'Alerts',
  setup() {
    const { onAlert } = useSocket();

    const alerts = ref<{ message: string, id: string }[]>([]);

    onAlert((message: string) => {
      const id = v4();
      alerts.value.push({ id, message });
      setTimeout(() => {
          alerts.value = alerts.value.filter((alert) => alert.id !== id);
      }, 2000);
    });

    return { alerts };
  }
});
</script>
