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
import { ingredientsMaxLimit } from "@/common/constants";

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
  async created() {
    await this.getPizza();
    this.setFormDough(this.pizza.dough[0]);
    this.setFormSauces(this.pizza.sauces[0]);
    this.setFormSizes(this.pizza.sizes[1]);
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
      "getPizza",
      "setFormPizzaName",
      "setFormPrice",
      "setPizzaId",
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
        this.updateCartGoods();
        this.$router.push("/cart");
        return;
      }
      this.setFormPrice();
      this.addGoodsToCart();
      this.setPizzaId(createUUIDv4());
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped></style>
