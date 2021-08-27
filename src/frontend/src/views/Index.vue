<template>
  <div>
    <AppLayoutHeader />
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
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import {
  doughType,
  sauceType,
  pizzaSize,
  ingredientsMaxLimit,
} from "@/common/constants";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    AppLayoutHeader,
  },
  data() {
    return {
      pizza: pizza,
      dough: {},
      sauce: {},
      size: {},
      ingredients: [],
    };
  },
  computed: {
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
    this.pizza.ingredients = this.pizza.ingredients.map((item) => {
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
    // тонкое тесто по умолчанию
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
