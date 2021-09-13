import pizza from "@/static/pizza.json";
import { SET_ENTITY, ADD_ENTITY } from "@/store/mutations-type";

const module = "Builder";

export default {
  namespaced: true,
  state: {
    dough: {},
    sauces: {},
    sizes: {},
    ingredients: [],
    ingredientsPrice: 0,
  },
  actions: {
    set({ commit }, { entity, value }) {
      commit(SET_ENTITY, { module, entity, value }, { root: true });
    },
    add({ commit }, { entity, value }) {
      commit(ADD_ENTITY, { module, entity, value }, { root: true });
    },
    getPizza({ commit }) {
      const data = pizza;
      console.log("getPizza", data);
      commit(
        SET_ENTITY,
        { module, entity: "dough", value: [...data.dough] },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "sauces", value: [...data.sauces] },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "sizes", value: [...data.sizes] },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "ingredients", value: [...data.ingredients] },
        { root: true }
      );
    },
  },
};
