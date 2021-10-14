import { delivery } from "@/common/constants";
import { normalizeMisc } from "@/common/helpers";
import misc from "@/static/misc.json";
import {
  ADD_GOODS_TO_CART,
  INCREASE_COUNT_PIZZA,
  DECREASE_COUNT_PIZZA,
  DELETE_PIZZA,
  UPDATE_CART_GOODS,
  GET_MISC,
  SET_MISC,
  INCREASE_MISC,
  DECREASE_MISC,
  SET_DELIVERY_TYPE,
  SET_PHONE_NUMBER,
  SET_ADDRESS,
  SET_HOUSE_NUMBER,
  SET_FLAT_NUMBER,
} from "@/store/mutations-type";

export default {
  namespaced: true,
  state: {
    cart: [],
    misc: [],
    delivery: delivery.self,
    phoneNumber: null,
    address: "",
    house: "",
    flat: "",
  },
  mutations: {
    [ADD_GOODS_TO_CART](state, data) {
      state.cart.push(data);
    },
    [INCREASE_COUNT_PIZZA](state, id) {
      state.cart = state.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }

        return item;
      });
    },
    [DECREASE_COUNT_PIZZA](state, id) {
      state.cart = state.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count - 1,
          };
        }

        return item;
      });
    },
    [UPDATE_CART_GOODS](state) {
      state.cart = state.cart.map((item) => {
        if (item.id === state.form.id) return state.form;

        return item;
      });
    },
    [GET_MISC](state, data) {
      state.misc = data;
    },
    [SET_MISC](state, data) {
      state.misc = data;
    },
    [INCREASE_MISC](state, id) {
      state.misc = state.misc.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }

        return item;
      });
    },
    [DECREASE_MISC](state, id) {
      state.misc = state.misc.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count - 1,
          };
        }

        return item;
      });
    },
    [SET_DELIVERY_TYPE](state, data) {
      state.delivery = data;
    },
    [SET_PHONE_NUMBER](state, data) {
      state.phoneNumber = data;
    },
    [SET_ADDRESS](state, data) {
      state.address = data;
    },
    [SET_HOUSE_NUMBER](state, data) {
      state.house = data;
    },
    [SET_FLAT_NUMBER](state, data) {
      state.flat = data;
    },
    [DELETE_PIZZA](state, id) {
      state.cart = state.cart.filter((item) => item.id !== id);
    },
  },
  actions: {
    addGoodsToCart({ commit, rootState }) {
      commit(ADD_GOODS_TO_CART, rootState.Builder.form);
    },
    increasePizzaCount({ commit }, data) {
      commit(INCREASE_COUNT_PIZZA, data);
    },
    decreasePizzaCount({ commit }, data) {
      commit(DECREASE_COUNT_PIZZA, data);
    },
    updateCartGoods({ commit }, data) {
      commit(UPDATE_CART_GOODS, data);
    },
    getMisc({ commit }) {
      const items = misc.map(normalizeMisc);
      commit(GET_MISC, items);
    },
    setMisc({ commit }, data) {
      commit(SET_MISC, data);
    },
    increaseMiscCount({ commit }, data) {
      commit(INCREASE_MISC, data);
    },
    decreaseMiscCount({ commit }, data) {
      commit(DECREASE_MISC, data);
    },
    setDeliveryType({ commit }, data) {
      commit(SET_DELIVERY_TYPE, data);
    },
    setPhoneNumber({ commit }, data) {
      commit(SET_PHONE_NUMBER, data);
    },
    setAddress({ commit }, data) {
      commit(SET_PHONE_NUMBER, data);
    },
    setHouseNumber({ commit }, data) {
      commit(SET_HOUSE_NUMBER, data);
    },
    setFlatNumber({ commit }, data) {
      commit(SET_FLAT_NUMBER, data);
    },
    deletePizza({ commit }, id) {
      commit(DELETE_PIZZA, id);
    },
  },
};
