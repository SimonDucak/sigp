<template>
  <div class="w-20 h-full flex-col space-y-12 flex-shrink-0 border-l border-gray-200 flex items-center justify-center">
    <ul type="none" class="w-full flex flex-col justify-center items-center space-y-2">
      <li
        v-for="width in [3, 6, 9, 12, 15]"
        :key="width"
        class="rounded-full cursor-pointer"
        :class="{ 'bg-black': width === lineWidth, 'bg-gray-500': width !== lineWidth }"
        :style="{ width: width * 2 + 'px', height: width * 2 + 'px' }"
        @click="emitLineWidth(width)"
      ></li>
    </ul>

    <input
      :value="color"
      @input="emitColor"
      id="color"
      name="color"
      class="w-12 h-12"
      type="color"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BaseSyntheticEvent } from "@/types";
import useSocket from "@/use/useSocket";

export type LineWidth = 3 | 6 | 9 | 12 | 15;

export default defineComponent({
  name: "Toolbar",
  props: {
    color: { required: true, type: String },
    lineWidth: { required: true, type: Number as PropType<LineWidth> }
  },
  emits: ['update:color', 'update:lineWidth'],
  setup(props, { emit }) {
      const emitColor = (e: BaseSyntheticEvent) => emit('update:color', e.target.value);

      const emitLineWidth = (width: LineWidth) => emit('update:lineWidth', width);

      return { emitColor, emitLineWidth };
  }
});
</script>
