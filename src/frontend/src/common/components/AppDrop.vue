<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
import { dataPayload } from "@/common/constants";

export default {
  name: "AppDrop",
  methods: {
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const pay = dataTransfer.getData(dataPayload);
      if (pay) {
        const transferData = JSON.parse(dataTransfer.getData(dataPayload));
        this.$emit("drop", transferData);
      }
    },
  },
};
</script>
