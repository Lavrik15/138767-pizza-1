<template>
  <label class="radio ingridients__input">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)"
      :name="name"
    />
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    modelValue: { default: "" },
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
  },
};
</script>

<style scoped></style>
