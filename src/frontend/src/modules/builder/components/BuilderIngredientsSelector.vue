<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="(sauce, index) in sauces"
            :key="sauce.name"
            v-model="sauceType"
            :value="index"
            @change="sauceTypeHandler(sauce)"
            name="sauce"
          >
            {{ sauce.name }}
          </RadioButton>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="item in ingredients"
              :key="item.image"
              class="ingridients__item"
            >
              <AppDrag :transferData="item" :isDraggable="checkDraggable(item)">
                <span class="ingridients__name">{{ item.name }}</span>
                <div
                  class="filling"
                  :style="{ backgroundImage: `url('${item.image}')` }"
                ></div>
                <ItemCounter
                  class="ingridients__counter"
                  :max="ingredientsMaxLimit"
                  :count="getIngredientCount(item)"
                  @count="countChangeHandler($event, item)"
                >
                </ItemCounter>
              </AppDrag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sauceType, ingredientsMaxLimit } from "@/common/constants";
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },
    sauces: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
      description: "Массив всех выбраных ингредиентов",
    },
  },
  data() {
    return {
      ingredientsMaxLimit: ingredientsMaxLimit,
      sauceType: sauceType.tomato,
      isDraggable: true,
    };
  },
  components: {
    ItemCounter,
    RadioButton,
    AppDrag,
  },
  methods: {
    sauceTypeHandler(sauce) {
      const data = { ...sauce, sauceType: +this.sauceType };
      this.$emit("sauceTypeChange", data);
    },
    countChangeHandler(count, item) {
      this.$emit("ingredientChange", {
        ...item,
        count,
      });
    },
    getIngredientCount(data) {
      const ingredient = this.getCurrentSelectedIngredient(data);
      if (ingredient) {
        return ingredient.count;
      } else {
        return 0;
      }
    },
    checkDraggable(data) {
      const ingredient = this.getCurrentSelectedIngredient(data);

      if (ingredient) {
        return ingredient.count < ingredientsMaxLimit;
      }
      return true;
    },
    getCurrentSelectedIngredient(data) {
      return this.selected.find(
        (item) => item.ingredientType === data.ingredientType
      );
    },
  },
};
</script>

<style scoped></style>
