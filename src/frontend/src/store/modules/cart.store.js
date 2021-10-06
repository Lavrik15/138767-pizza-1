import { delivery } from "@/common/constants";
import misc from "@/static/misc.json";
import {
  ADD_GOODS_TO_CART,
  INCREASE_COUNT_PIZZA,
  DECREASE_COUNT_PIZZA,
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
    cart: [
      // {
      //   dough: {
      //     name: "Тонкое",
      //     image: "/public/img/dough-light.svg",
      //     description: "Из твердых сортов пшеницы",
      //     price: 300,
      //     doughType: 0,
      //   },
      //   sauces: {
      //     name: "Томатный",
      //     price: 50,
      //     sauceType: 0,
      //   },
      //   sizes: {
      //     name: "32 см",
      //     image: "/public/img/diameter.svg",
      //     multiplier: 2,
      //     pizzaSize: 2,
      //   },
      //   ingredients: [
      //     {
      //       name: "Ветчина",
      //       image: "/public/img/filling/ham.svg",
      //       price: 42,
      //       count: 3,
      //       ingredientType: "ham",
      //     },
      //     {
      //       name: "Лук",
      //       image: "/public/img/filling/onion.svg",
      //       price: 21,
      //       count: 1,
      //       ingredientType: "onion",
      //     },
      //     {
      //       name: "Бекон",
      //       image: "/public/img/filling/bacon.svg",
      //       price: 42,
      //       count: 1,
      //       ingredientType: "bacon",
      //     },
      //     {
      //       name: "Чеддер",
      //       image: "/public/img/filling/cheddar.svg",
      //       price: 42,
      //       count: 1,
      //       ingredientType: "cheddar",
      //     },
      //   ],
      //   name: "test",
      //   ingredientsPrice: 231,
      //   count: 1,
      //   price: 1162,
      //   id: "92e15a54-1c34-471a-ad16-8ef8a8c17da0",
      // },
    ],
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
    [UPDATE_CART_GOODS](state, order) {
      state.cart = state.cart.map((item) => {
        if (item.id === order.id) return order;

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
  },
  actions: {
    addGoodsToCart({ commit }, data) {
      commit(ADD_GOODS_TO_CART, data);
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
      const items = misc;
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
  },
};
