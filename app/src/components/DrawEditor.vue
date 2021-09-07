<template>
  <div class="w-full h-full cursor-pointer relative" ref="sketchRef">
    <i class="absolute top-1 left-1">Draw something here ...</i>
    <canvas
      ref="canvasRef"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch } from "vue";
import useSocket from "@/use/useSocket";

interface MouseCoordinates {
    x: number;
    y: number;
}

interface Settings {
    lineWidth: number;
    color: string;
}

export default defineComponent({
    name: 'DrawEditor',
    props: {
        settings: {
            required: false,
            type: Object as PropType<Settings>,
            default: () => ({ lineWidth: 5, color: '#000' }),
        }
    },
    setup(props) {
      const { emitCanvasData, onCanvasData } = useSocket();

    	const canvasRef = ref<HTMLCanvasElement | null>(null);
    	const sketchRef = ref<HTMLElement | null>(null);
    	const ctx = ref<CanvasRenderingContext2D | null>(null);

      const mouse: MouseCoordinates = {x: 0, y: 0};
      const lastMouse: MouseCoordinates = {x: 0, y: 0};
      let timeout: number | undefined = undefined;
      let isDrawing: boolean = false;

      onMounted(() => {
          if (!canvasRef.value || !sketchRef.value) return;

          const canvas: HTMLCanvasElement = canvasRef.value;
          ctx.value = canvas.getContext('2d');

          if (!ctx.value) return;

          const sketch: HTMLElement = sketchRef.value;
          const sketchStyle: CSSStyleDeclaration = getComputedStyle(sketch);
          canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
          canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

          const { lineWidth, color } = props.settings;
          ctx.value.lineWidth = lineWidth;
          ctx.value.lineJoin = 'round';
          ctx.value.lineCap = 'round';
          ctx.value.strokeStyle = color;

          canvas.addEventListener('mousemove', function(e) {
              lastMouse.x = mouse.x;
              lastMouse.y = mouse.y;

              mouse.x = e.pageX - this.offsetLeft;
              mouse.y = e.pageY - this.offsetTop;
          }, false);
      });

      onCanvasData((newCanvasData: string) => {
          const interval = setInterval(() => {
              if (!canvasRef.value) return;
              if (isDrawing) return;
              isDrawing = true;
              clearInterval(interval);
              const image = new Image();
              const canvas = canvasRef.value;
              const context = canvas.getContext('2d');
              if (!context) return;
              image.onload = () => {
                  context.drawImage(image, 0, 0);
                  isDrawing = false;
              };
              image.src = newCanvasData;
          }, 200);
      });

      const onPaint = () => {
          if (!ctx.value) return;
          ctx.value.beginPath();
          ctx.value.moveTo(lastMouse.x, lastMouse.y);
          ctx.value.lineTo(mouse.x, mouse.y);
          ctx.value.closePath();
          ctx.value.stroke();

          if (timeout != undefined) clearTimeout(timeout);
          timeout = setTimeout(() => {
              if (!canvasRef.value) return;
              const base64ImageData: string = canvasRef.value.toDataURL("image/png");
              emitCanvasData(base64ImageData);
          }, 200);
      };

      const onMouseDown = () => {
          if (!canvasRef.value) return;
          canvasRef.value.addEventListener('mousemove', onPaint);
      };

      const onMouseUp = () => {
          if (!canvasRef.value) return;
          canvasRef.value.removeEventListener('mousemove', onPaint);
      };

      watch(() => props.settings, (newSettings: Settings) => {
          if (!ctx.value) return;
          ctx.value.lineWidth = newSettings.lineWidth;
          ctx.value.strokeStyle = newSettings.color;
      });

			return {
          canvasRef,
          sketchRef,
          onMouseDown,
          onMouseUp
      };
    },
})
</script>
