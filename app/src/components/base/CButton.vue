<template>
  <button class="px-6 py-4 bg-blue-500 rounded-md focus:outline-none text-white transition duration-200 hover:bg-blue-700">
    <strong>
      <slot></slot>
    </strong>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CButton"
});
</script>
