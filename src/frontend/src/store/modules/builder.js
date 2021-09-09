import pizza from "@/static/pizza.json";
import { UPDATE_ENTITY, ADD_ENTITY } from "@/store/mutations-type";

const module = "builder";

export default {
  state: {
    pizza: pizza,
    dough: {},
    sauce: {},
    size: {},
    ingredients: [],
  },
  actions: {
    put({ commit }, value) {
      commit(UPDATE_ENTITY, { module, entity: "pizza", value });
    },
    post({ commit }, value) {
      commit(ADD_ENTITY, { module, entity: "pizza", value });
    },
  },
};
