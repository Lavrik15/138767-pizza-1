<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="pizzaName"
        @input="pizzaNameInputHandler"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <AppDrop @drop="pizzaDropHandler($event)">
      <div class="content__constructor">
        <div class="pizza" :class="foundationClass">
          <div class="pizza__wrapper">
            <template v-for="ingredient in ingredients">
              <div
                :key="ingredient.name"
                class="pizza__filling"
                :class="getPizzaClasses(ingredient)"
              ></div>
            </template>
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ price }} ₽</p>
      <button
        type="button"
        class="button"
        :class="{ 'button--disabled': isReadyBtnDisabled }"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { doughType, sauceType } from "@/common/constants";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    price: {
      type: Number,
      default: 0,
    },
    dough: {
      type: Object,
      required: true,
    },
    sauces: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
    isReadyBtnDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pizzaName: "",
    };
  },
  computed: {
    foundationClass() {
      return {
        "pizza--foundation--big-creamy":
          this.dough.doughType === doughType.big &&
          this.sauces.sauceType === sauceType.creamy,
        "pizza--foundation--big-tomato":
          this.dough.doughType === doughType.big &&
          this.sauces.sauceType === sauceType.tomato,
        "pizza--foundation--small-creamy":
          this.dough.doughType === doughType.small &&
          this.sauces.sauceType === sauceType.creamy,
        "pizza--foundation--small-tomato":
          this.dough.doughType === doughType.small &&
          this.sauces.sauceType === sauceType.tomato,
      };
    },
  },
  methods: {
    pizzaNameInputHandler(event) {
      this.$emit("pizzaNameInput", event.target.value);
    },
    getPizzaClasses(ingredient) {
      return {
        ["pizza__filling--" + ingredient.ingredientType]:
          ingredient.ingredientType,
        "pizza__filling--second": ingredient.count === 2,
        "pizza__filling--third": ingredient.count === 3,
      };
    },
    pizzaDropHandler(ingredient) {
      this.$emit("dropIngredient", ingredient);
    },
  },
};
</script>

<style scoped></style>
