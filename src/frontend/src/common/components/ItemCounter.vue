<template>
  <div class="counter counter--orange">
    <button
      @click="decrementHandler"
      type="button"
      :disabled="disabledDecrement"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--minusel--disabled': disabledDecrement }"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      v-model="counter"
      type="text"
      name="counter"
      class="counter__input"
      readonly
    />
    <button
      @click="incrementHandler"
      type="button"
      :disabled="disabledIncrement"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--plusel--disabled': disabledIncrement }"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
    },
  },
  data() {
    return {
      counter: this.count,
      disabledIncrement: false,
      disabledDecrement: true,
    };
  },
  methods: {
    decrementHandler() {
      if (this.counter === 0) return;
      if (this.counter <= this.max) {
        this.disabledIncrement = false;
      }
      this.counter -= 1;
      if (this.counter <= 0) {
        this.disabledDecrement = true;
      }
      this.$emit("count", this.counter);
    },
    incrementHandler() {
      if (this.counter >= this.max) return;
      this.disabledDecrement = false;

      this.counter += 1;
      if (this.counter === this.max) {
        this.disabledIncrement = true;
      }
      this.$emit("count", this.counter);
    },
  },
};
</script>

<style scoped></style>
