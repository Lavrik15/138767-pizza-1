<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector :dough="dough" @doughTypeChange="dough = $event" />

      <BuilderSizeSelector @pizzaSizeChange="size = $event" :sizes="sizes" />

      <BuilderIngredientsSelector
        :sauces="sauces"
        :ingredients="ingredients"
        :selected="ingredients"
        @sauceTypeChange="sauces = $event"
        @ingredientChange="ingredientChangeHandler"
      ></BuilderIngredientsSelector>

      <BuilderPizzaView
        :price="price"
        :dough="dough"
        :sauces="sauces"
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
      sauces: (state) => state.sauces,
      sizes: (state) => state.sizes,
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
        (this.dough.price + this.sauces.price + this.ingredientsPrice) *
        this.sizes.multiplier
      );
    },
  },
  created() {
    this.getPizza();
    const ingredients = this.ingredients.map((item) => {
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
    const dough = this.dough;
    dough[0].doughType = doughType.small;
    this.setDough({ value: dough, entity: "dough" });

    // сливочный соус по умолчанию
    const sauces = this.sauces;
    sauces[0].sauceType = sauceType.creamy;
    this.setSauces({ value: sauces, entity: "sauces" });

    // 23 см пицца по умолчанию
    const sizes = this.sizes;
    sizes[0].pizzaSize = pizzaSize.small;
    this.setSizes({ value: sizes, entity: "sizes" });
  },
  methods: {
    ...mapActions("Builder", {
      setPizza: "set",
      setDough: "set",
      setSauces: "set",
      setSizes: "set",
      addIngredient: "add",
      setIngredient: "set",
      setIngredientPrice: "set",
      getPizza: "getPizza",
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
