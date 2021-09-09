<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :dough="pizza.dough"
        @doughTypeChange="dough = $event"
      />

      <BuilderSizeSelector
        @pizzaSizeChange="size = $event"
        :sizes="pizza.sizes"
      />

      <BuilderIngredientsSelector
        :sauces="pizza.sauces"
        :ingredients="pizza.ingredients"
        :selected="ingredients"
        @sauceTypeChange="sauce = $event"
        @ingredientChange="ingredientChangeHandler"
      ></BuilderIngredientsSelector>

      <BuilderPizzaView
        :price="price"
        :dough="dough"
        :sauce="sauce"
        :ingredients="ingredients"
        @dropIngredient="dropIngredientHandler"
      >
      </BuilderPizzaView>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

import {
  doughType,
  sauceType,
  pizzaSize,
  ingredientsMaxLimit,
} from "@/common/constants";

export default {
  name: "Builder",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  computed: {
    ...mapState({
      ingredients: (state) => state.ingredients,
      dough: (state) => state.dough,
      sauce: (state) => state.sauce,
      size: (state) => state.size,
      pizza: (state) => state.pizza,
    }),
    price() {
      let ingredientsPrice = 0;
      if (this.ingredients.length) {
        this.ingredients.forEach((ingredient) => {
          ingredientsPrice += ingredient.price * ingredient.count;
        });
      }
      return (
        (this.dough.price + this.sauce.price + ingredientsPrice) *
        this.size.multiplier
      );
    },
  },
  created() {
    const pizza = this.pizza.ingredients.map((item) => {
      const ingredient = { ...item };
      // пусть для начала будет 0 ингридиентов каждого типа
      ingredient.count = 0;

      switch (item.name) {
        case "Грибы":
          ingredient.ingredientType = "mushrooms";
          break;
        case "Чеддер":
          ingredient.ingredientType = "cheddar";
          break;
        case "Салями":
          ingredient.ingredientType = "salami";
          break;
        case "Ветчина":
          ingredient.ingredientType = "ham";
          break;
        case "Ананас":
          ingredient.ingredientType = "ananas";
          break;
        case "Бекон":
          ingredient.ingredientType = "bacon";
          break;
        case "Лук":
          ingredient.ingredientType = "onion";
          break;
        case "Чили":
          ingredient.ingredientType = "chile";
          break;
        case "Халапеньо":
          ingredient.ingredientType = "jalapeno";
          break;
        case "Маслины":
          ingredient.ingredientType = "olives";
          break;
        case "Томаты":
          ingredient.ingredientType = "tomatoes";
          break;
        case "Лосось":
          ingredient.ingredientType = "salmon";
          break;
        case "Моцарелла":
          ingredient.ingredientType = "mozzarella";
          break;
        case "Пармезан":
          ingredient.ingredientType = "parmesan";
          break;
        case "Блю чиз":
          ingredient.ingredientType = "blue_cheese";
          break;
      }

      return ingredient;
    });
    this.pizzaPut(pizza);

    // тонкое тесто по умолчанию
    this.doughPut(this.pizza.dough[0]);
    this.dough = this.pizza.dough[0];
    this.dough.doughType = doughType.small;

    // сливочный соус по умолчанию
    this.sauce = this.pizza.sauces[0];
    this.sauce.sauceType = sauceType.creamy;

    // 23 см пицца по умолчанию
    this.size = this.pizza.sizes[0];
    this.size.pizzaSize = pizzaSize.small;
  },
  methods: {
    ...mapActions("builder", {
      pizzaPut: "put",
      doughPut: "put",
    }),
    ingredientChangeHandler(ingredient) {
      // Если еще ни один из топингов не добавлен, то создать массив и положить туда первый топинг
      if (!this.ingredients.length) {
        this.ingredients.push(ingredient);
        return;
      }

      // увеличить или уменьщить кол-во у уже добавленного топинга
      let flag = false;
      this.ingredients.forEach((item) => {
        if (item.ingredientType === ingredient.ingredientType) {
          item.count = ingredient.count;
          flag = true;
        }
      });

      // если топинг еще не добавлялся, то добавить новый
      if (!flag) {
        this.ingredients.push(ingredient);
      }

      // почистить массив от топигов с нулевым количеством
      this.ingredients = this.ingredients.filter((item) => item.count !== 0);
    },
    dropIngredientHandler(ingredient) {
      const currentIngredient = this.ingredients.find(
        (item) => item.ingredientType === ingredient.ingredientType
      );
      if (currentIngredient && currentIngredient.count >= ingredientsMaxLimit)
        return;
      const data = {
        ...ingredient,
        count:
          currentIngredient && currentIngredient.count
            ? currentIngredient.count + 1
            : 1,
      };
      this.ingredientChangeHandler(data);
    },
  },
};
</script>

<style scoped></style>
