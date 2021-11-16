import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  // async init({ dispatch }) {
  //   dispatch("getPizza");
  // },
};

const mutations = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
