<template>
  <label class="radio ingridients__input">
    <input type="radio" :name="name" :value="value" :checked="checked" />
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
