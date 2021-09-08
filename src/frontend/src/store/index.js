import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  ADD_ENTITY,
} from "@/store/mutatons-type";

Vue.use(Vuex);

const state = () => ({});

const actions = {};

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = value;
    } else {
      state[entity] = value;
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);

      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(({item}) => +item.id !== +id);
    } else {
      state[entity] = state[entity].filter(({item}) => +item.id !== +id);
    }
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
});
