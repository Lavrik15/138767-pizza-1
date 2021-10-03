import pizza from "@/static/pizza.json";
import {
  SET_PIZZA,
  SET_FORM_DOUGH,
  ADD_FORM_INGREDIENTS,
  UPDATE_COUNT_FORM_INGREDIENTS,
  SET_FORM_INGREDIENTS,
  SET_FORM_SIZES,
  SET_FORM_SAUCES,
  SET_INGREDIENTS_PRICE,
} from "@/store/mutations-type";

export default {
  namespaced: true,
  state: {
    pizza: {},
    ingredientsPrice: 0,
    form: {
      dough: {},
      sauces: {},
      sizes: {},
      ingredients: [],
    }, // все выбарнные лементы конструктора
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
    [SET_INGREDIENTS_PRICE](state, data) {
      state.ingredientsPrice = data;
    },
  },
  actions: {
    getPizza({ commit }) {
      const data = pizza;

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
    setIngredientsPrice({ commit }, data) {
      commit(SET_INGREDIENTS_PRICE, data);
    },
    setSauces({ commit }, data) {
      commit(SET_PIZZA, { entity: "sauces", data });
    },
  },
};
