import pizza from "@/static/pizza.json";
import { SET_ENTITY, ADD_ENTITY } from "@/store/mutations-type";

const module = "Builder";

export default {
  namespaced: true,
  state: {
    dough: {},
    sauce: {},
    size: {},
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
      commit(
        SET_ENTITY,
        { module, entity: "dough", value: { ...data.dough } },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "sauce", value: { ...data.sauce } },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "size", value: { ...data.size } },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module, entity: "ingredients", value: { ...data.ingredients } },
        { root: true }
      );
    },
  },
};
