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
    ...mapState("Builder", {
      ingredients: (state) => state.ingredients,
      ingredientsPrice: (state) => state.ingredientsPrice,
      dough: (state) => state.dough,
      sauce: (state) => state.sauce,
      size: (state) => state.size,
      pizza: (state) => state.pizza,
    }),
    price() {
      if (this.ingredients.length) {
        this.ingredients.forEach((ingredient) => {
          const total =
            this.ingredientsPrice + ingredient.price * ingredient.count;
          this.setIngredientPrice(total);
        });
      }
      return (
        (this.dough.price + this.sauce.price + this.ingredientsPrice) *
        this.size.multiplier
      );
    },
  },
  created() {
    this.getPizza();
    const ingredients = this.pizza.ingredients.map((item) => {
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
    this.setPizza({ value: ingredients, entity: "ingredients" });

    // тонкое тесто по умолчанию
    const dough = this.pizza.dough[0];
    dough.doughType = doughType.small;
    this.setDough({ value: dough, entity: "dough" });

    // сливочный соус по умолчанию
    const sauce = this.pizza.sauces[0];
    sauce.sauceType = sauceType.creamy;
    this.setSauce({ value: sauce, entity: "sauce" });

    // 23 см пицца по умолчанию
    const size = this.pizza.sizes[0];
    size.pizzaSize = pizzaSize.small;
    this.setSize({ value: size, entity: "size" });
  },
  methods: {
    ...mapActions("Builder", {
      setPizza: "set",
      setDough: "set",
      setSauce: "set",
      setSize: "set",
      addIngredient: "add",
      setIngredient: "set",
      setIngredientPrice: "set",
      getPizza: "query",
    }),
    ingredientChangeHandler(ingredient) {
      // Если еще ни один из топингов не добавлен, то создать массив и положить туда первый топинг
      if (!this.ingredients.length) {
        this.addIngredient({ value: ingredient, entity: "ingredient" });
        return;
      }

      // увеличить или уменьщить кол-во у уже добавленного топинга
      let flag = false;
      const topings = this.ingredients;
      topings.forEach((toping) => {
        if (toping.ingredientType === ingredient.ingredientType) {
          toping.count = ingredient.count;
          flag = true;
        }
      });
      this.setIngredient({ value: topings, entity: "ingredient" });

      // если топинг еще не добавлялся, то добавить новый
      if (!flag) {
        this.addIngredient({ value: ingredient, entity: "ingredient" });
      }

      // почистить массив от топигов с нулевым количеством
      this.setIngredient({
        value: topings.filter((item) => item.count !== 0),
        entity: "ingredient",
      });
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
