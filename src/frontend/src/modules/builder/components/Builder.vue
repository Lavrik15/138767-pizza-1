<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :dough="pizza.dough"
        @doughTypeChange="doughTypeChange"
      />

      <BuilderSizeSelector
        :sizes="pizza.sizes"
        @pizzaSizeChange="pizzaSizeChange"
      />

      <BuilderIngredientsSelector
        :sauces="pizza.sauces"
        :ingredients="pizza.ingredients"
        :selected="form.ingredients"
        @sauceTypeChange="sauceTypeChange"
        @ingredientChange="ingredientChangeHandler"
      ></BuilderIngredientsSelector>

      <BuilderPizzaView
        :price="price"
        :dough="form.dough"
        :sauces="form.sauces"
        :ingredients="form.ingredients"
        :isReadyBtnDisabled="isReadyBtnDisabled"
        :pizzaName="form.name"
        @dropIngredient="dropIngredientHandler"
        @pizzaNameInput="pizzaNameInputHandler"
        @readyBtnClick="onReadyBtnClick"
      >
      </BuilderPizzaView>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { createUUIDv4 } from "@/common/helpers";
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
      pizza: (state) => state.pizza,
      form: (state) => state.form,
    }),
    ...mapGetters("Builder", ["price"]),
    isReadyBtnDisabled() {
      const isIngredientsExist = !!Object.values(this.form.ingredients).length;
      const isPizzaNameExist = this.form.name.trim() !== "";
      const valid = [isIngredientsExist, isPizzaNameExist];
      return !valid.every((field) => field);
    },
  },
  watch: {
    price() {
      this.setFormPrice(this.price);
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
    this.setIngredients(ingredients);

    const dough = this.pizza.dough;
    dough[0].doughType = doughType.small;
    dough[1].doughType = doughType.big;
    this.setDough(dough);
    this.setFormDough(dough[0]);

    const sauces = this.pizza.sauces;
    sauces[0].sauceType = sauceType.tomato;
    sauces[1].sauceType = sauceType.creamy;
    this.setSauces(sauces);
    this.setFormSauces(sauces[0]);

    const sizes = this.pizza.sizes.map((size) => {
      switch (size.multiplier) {
        case 1:
          return {
            ...size,
            pizzaSize: pizzaSize.small,
          };
        case 2:
          return {
            ...size,
            pizzaSize: pizzaSize.normal,
          };
        case 3:
          return {
            ...size,
            pizzaSize: pizzaSize.big,
          };
      }
    });
    this.setSizes(sizes);
    this.setFormSizes(sizes[1]);
  },
  methods: {
    ...mapActions("Builder", [
      "setFormDough",
      "setFormSizes",
      "setFormSauces",
      "addFormIngredients",
      "updateCountFormIngredients",
      "setFormIngredients",
      "setDough",
      "setSizes",
      "setSauces",
      "setIngredients",
      "setIngredientsPrice",
      "getPizza",
      "setFormPizzaName",
      "setFormPrice",
      "setPizzaId",
      "updateCartGoods",
    ]),
    ...mapActions("Cart", ["addGoodsToCart", "updateCartGoods"]),
    doughTypeChange(selectedDough) {
      this.setFormDough(selectedDough);
    },
    pizzaSizeChange(sizeSelected) {
      this.setFormSizes(sizeSelected);
    },
    sauceTypeChange(sauceSelected) {
      this.setFormSauces(sauceSelected);
    },
    ingredientChangeHandler(ingredient) {
      // Если еще ни один из топингов не добавлен, то создать массив и положить туда первый топинг
      const isExist = this.form.ingredients.some(
        (item) => item.ingredientType === ingredient.ingredientType
      );

      if (isExist) {
        this.updateCountFormIngredients(ingredient);
      } else {
        this.addFormIngredients(ingredient);
      }

      // почистить массив от топигов с нулевым количеством
      this.setFormIngredients(
        this.form.ingredients.filter((item) => item.count !== 0)
      );
    },
    dropIngredientHandler(ingredient) {
      const currentIngredient = this.form.ingredients.find(
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
    pizzaNameInputHandler(name) {
      this.setFormPizzaName(name);
    },
    onReadyBtnClick() {
      if (this.form.id) {
        this.updateCartGoods(this.form);
        this.$router.push("/cart");
        return;
      }
      this.addGoodsToCart(this.form);
      this.setPizzaId(createUUIDv4());
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped></style>
