<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.multiplier"
          class="diameter__input"
          :class="`diameter__input--${getDiameterName(size)}`"
        >
          <input
            v-model="pizzaSize"
            :value="size.multiplier"
            type="radio"
            name="diameter"
            class="visually-hidden"
            @change="pizzaSizeChangeHandler(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { pizzaSize } from "@/common/constants";

export default {
  name: "BuilderSizeSelector",
  props: {
    sizes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pizzaSize: pizzaSize.normal,
    };
  },
  methods: {
    getDiameterName(data) {
      switch (data.multiplier) {
        case data.multiplier === 1:
          return "small";
        case data.multiplier === 2:
          return "normal";
        case data.multiplier === 3:
          return "big";
      }
    },
    pizzaSizeChangeHandler(size) {
      const data = { ...size, pizzaSize: +this.pizzaSize };
      this.$emit("pizzaSizeChange", data);
    },
  },
};
</script>

<style scoped></style>
