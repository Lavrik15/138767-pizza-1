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
    };
  },
  computed: {
    disabledIncrement() {
      return this.counter >= this.max;
    },
    disabledDecrement() {
      return this.counter <= 0;
    },
  },
  watch: {
    count() {
      this.counter = this.count;
    },
  },
  methods: {
    decrementHandler() {
      if (this.counter === 0) return;
      this.counter -= 1;
      this.$emit("count", this.counter);
    },
    incrementHandler() {
      if (this.counter >= this.max) return;
      this.counter += 1;
      this.$emit("count", this.counter);
    },
  },
};
</script>

<style scoped></style>
