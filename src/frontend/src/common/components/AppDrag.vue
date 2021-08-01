<template>
  <div
    :draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { dataPayload, move } from "@/common/constants";

export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = move;
      dataTransfer.dropEffect = move;
      dataTransfer.setData(dataPayload, JSON.stringify(this.transferData));
    },
  },
};
</script>
