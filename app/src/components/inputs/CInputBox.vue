<template>
  <div class="w-full flex flex-col">
    <label :for="id" class="text-sm mb-1">
      <strong><slot name="label"></slot></strong>
    </label>
    <input
      class="w-full px-6 py-3 bg-gray-50 rounded-md focus:outline-none"
      type="text"
      :id="id"
      :placeholder="placeholder"
      :name="name"
      :value="modelValue"
      @input="emitValue"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BaseSyntheticEvent } from "@/types";

export default defineComponent({
    name: 'InputBox',
    props: {
        id: { required: true, type: String },
        modelValue: { required: true, type: String },
        placeholder: { required: false, type: String, default: () => "" },
        name: { required: false, type: String, default: () => "" },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const emitValue = (e: BaseSyntheticEvent) => {
          emit('update:modelValue', e.target.value);
      };
      return { emitValue };
    },
});
</script>
