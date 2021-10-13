import pizza from "@/static/pizza.json";
import {
  normalizeSauce,
  normalizeSizes,
  ingredientNormalize,
} from "@/common/helpers";
import {
  SET_PIZZA,
  SET_FORM_DOUGH,
  ADD_FORM_INGREDIENTS,
  UPDATE_COUNT_FORM_INGREDIENTS,
  SET_FORM_INGREDIENTS,
  SET_FORM_SIZES,
  SET_FORM_SAUCES,
  SET_FORM_PIZZA_NAME,
  SET_FORM_PRICE,
  SET_PIZZA_ID,
  UPDATE_FORM_PIZZA,
  RESET_FORM_PIZZA,
} from "@/store/mutations-type";
import {normalizeDough} from "../../common/helpers";

const initForm = () => ({
  dough: {},
  sauces: {},
  sizes: {},
  ingredients: [],
  name: "",
  count: 1,
  id: null,
});

export default {
  namespaced: true,
  state: {
    pizza: {},
    form: initForm(),
  },
  mutations: {
    [SET_PIZZA](state, { entity, data }) {
      state.pizza[entity] = data;
    },
    [SET_FORM_DOUGH](state, data) {
      state.form.dough = data;
    },
    [ADD_FORM_INGREDIENTS](state, data) {
      state.form.ingredients.push(data);
    },
    [UPDATE_COUNT_FORM_INGREDIENTS](state, data) {
      state.form.ingredients = data;
    },
    [SET_FORM_INGREDIENTS](state, data) {
      state.form.ingredients = data;
    },
    [SET_FORM_SIZES](state, data) {
      state.form.sizes = data;
    },
    [SET_FORM_SAUCES](state, data) {
      state.form.sauces = data;
    },
    [SET_FORM_PIZZA_NAME](state, data) {
      state.form.name = data;
    },
    [SET_FORM_PRICE](state, data) {
      state.form.price = data;
    },
    [SET_PIZZA_ID](state, data) {
      state.form.id = data;
    },
    [UPDATE_FORM_PIZZA](state, data) {
      state.form = data;
    },
    [RESET_FORM_PIZZA](state, data) {
      state.form = data;
    },
  },
  actions: {
    getPizza({ commit }) {
      const data = pizza; // api call
      data.ingredients = data.ingredients.map(ingredientNormalize);
      data.sauces = normalizeSauce(data.sauces);
      data.sizes = data.sizes.map(normalizeSizes());
      data.dough = normalizeDough(data.dough);

      commit(SET_PIZZA, { entity: "dough", data: data.dough });
      commit(SET_PIZZA, { entity: "ingredients", data: data.ingredients });
      commit(SET_PIZZA, { entity: "sizes", data: data.sizes });
      commit(SET_PIZZA, { entity: "sauces", data: data.sauces });
    },
    setFormDough({ commit }, selectedDough) {
      commit(SET_FORM_DOUGH, selectedDough);
    },
    setFormSizes({ commit }, selectedSizes) {
      commit(SET_FORM_SIZES, selectedSizes);
    },
    setFormSauces({ commit }, selectedSizes) {
      commit(SET_FORM_SAUCES, selectedSizes);
    },
    addFormIngredients({ commit }, ingredient) {
      commit(ADD_FORM_INGREDIENTS, ingredient);
    },
    updateCountFormIngredients({ state, commit }, ingredient) {
      const ingredients = state.form.ingredients.map((item) => {
        if (item.ingredientType === ingredient.ingredientType) {
          return {
            ...item,
            count: ingredient.count,
          };
        }

        return item;
      });

      commit(UPDATE_COUNT_FORM_INGREDIENTS, ingredients);
    },
    setFormIngredients({ commit }, data) {
      commit(SET_FORM_INGREDIENTS, data);
    },
    setDough({ commit }, data) {
      commit(SET_PIZZA, { entity: "dough", data });
    },
    setSizes({ commit }, data) {
      commit(SET_PIZZA, { entity: "sizes", data });
    },
    setIngredients({ commit }, data) {
      commit(SET_PIZZA, { entity: "ingredients", data });
    },
    setSauces({ commit }, data) {
      commit(SET_PIZZA, { entity: "sauces", data });
    },
    setFormPizzaName({ commit }, data) {
      commit(SET_FORM_PIZZA_NAME, data);
    },
    setFormPrice({ commit }, data) {
      commit(SET_FORM_PRICE, data);
    },
    setPizzaId({ commit }, data) {
      commit(SET_PIZZA_ID, data);
    },
    updateFormPizza({ commit }, data) {
      commit(UPDATE_FORM_PIZZA, data);
    },
    resetFormPizza({ commit }) {
      commit(RESET_FORM_PIZZA, initForm());
    },
  },
  getters: {
    price(state) {
      let ingredientsPrice = 0;
      if (state.form.ingredients.length) {
        let total = 0;
        state.form.ingredients.forEach((ingredient) => {
          total = total + ingredient.price * ingredient.count;

          ingredientsPrice = total;
        });
      }

      const price =
        (state.form.dough.price + state.form.sauces.price + ingredientsPrice) *
        state.form.sizes.multiplier;

      return price;
    },
  },
};
