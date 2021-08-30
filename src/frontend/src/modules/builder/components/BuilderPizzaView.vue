<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
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
      <button type="button" class="button button--disabled" disabled>
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
  props: {
    price: {
      type: Number,
      default: 0,
    },
    dough: {
      type: Object,
      required: true,
    },
    sauce: {
      type: Object,
      required: true,
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AppDrop,
  },
  computed: {
    foundationClass() {
      return {
        "pizza--foundation--big-creamy":
          this.dough.doughType === doughType.big &&
          this.sauce.sauceType === sauceType.creamy,
        "pizza--foundation--big-tomato":
          this.dough.doughType === doughType.big &&
          this.sauce.sauceType === sauceType.tomato,
        "pizza--foundation--small-creamy":
          this.dough.doughType === doughType.small &&
          this.sauce.sauceType === sauceType.creamy,
        "pizza--foundation--small-tomato":
          this.dough.doughType === doughType.small &&
          this.sauce.sauceType === sauceType.tomato,
      };
    },
  },
  methods: {
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
