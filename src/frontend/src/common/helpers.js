import { doughType, sauceType, pizzaSize } from "@/common/constants";
import { resources } from "@/common/constants";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";
import { SET_AUTH } from "@/store/mutations-type";

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("getMe");
  store.commit(SET_AUTH, true);
};

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const ingredientNormalize = (item) => {
  const ingredient = { ...item };
  // пусть для начала будет 0 ингридиентов каждого типа
  ingredient.count = 0;

  switch (item.name) {
    case "Грибы":
      ingredient.ingredientType = "mushrooms";
      break;
    case "Чеддер":
      ingredient.ingredientType = "cheddar";
      break;
    case "Салями":
      ingredient.ingredientType = "salami";
      break;
    case "Ветчина":
      ingredient.ingredientType = "ham";
      break;
    case "Ананас":
      ingredient.ingredientType = "ananas";
      break;
    case "Бекон":
      ingredient.ingredientType = "bacon";
      break;
    case "Лук":
      ingredient.ingredientType = "onion";
      break;
    case "Чили":
      ingredient.ingredientType = "chile";
      break;
    case "Халапеньо":
      ingredient.ingredientType = "jalapeno";
      break;
    case "Маслины":
      ingredient.ingredientType = "olives";
      break;
    case "Томаты":
      ingredient.ingredientType = "tomatoes";
      break;
    case "Лосось":
      ingredient.ingredientType = "salmon";
      break;
    case "Моцарелла":
      ingredient.ingredientType = "mozzarella";
      break;
    case "Пармезан":
      ingredient.ingredientType = "parmesan";
      break;
    case "Блю чиз":
      ingredient.ingredientType = "blue_cheese";
      break;
  }

  return ingredient;
};

export const normalizeDough = (data) => {
  const dough = [...data];
  dough[0].doughType = doughType.small;
  dough[1].doughType = doughType.big;

  return dough;
};

export const normalizeSauce = (data) => {
  const sauces = [...data];
  sauces[0].sauceType = sauceType.tomato;
  sauces[1].sauceType = sauceType.creamy;

  return sauces;
};

export const normalizeSizes = (item) => {
  switch (item.multiplier) {
    case 1:
      return {
        ...item,
        pizzaSize: pizzaSize.small,
      };
    case 2:
      return {
        ...item,
        pizzaSize: pizzaSize.normal,
      };
    case 3:
      return {
        ...item,
        pizzaSize: pizzaSize.big,
      };
  }
};

export const normalizeMisc = (item) => {
  item.count = 0;
  item.id = createUUIDv4();
  return item;
};

export const createResources = () => ({
  [resources.ADDRESS]: new CrudApiService(resources.ADDRESS),
  [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH),
  [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS),
  [resources.USER]: new AuthApiService(),
  [resources.MISC]: new ReadOnlyApiService(resources.MISC),
  [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES),
  [resources.ORDER]: new CrudApiService(resources.ORDER),
  [resources.SIZES]: new ReadOnlyApiService(resources.SIZES),
});
