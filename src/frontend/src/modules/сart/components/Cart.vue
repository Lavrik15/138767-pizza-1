<template>
  <div>
    <form action="test.html" method="post" class="layout-form">
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <!-- <div class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div> -->

          <ul class="cart-list sheet">
            <template v-for="item in cart">
              <li class="cart-list__item" :key="item.name">
                <div class="product cart-list__product">
                  <img
                    src="@/assets/img/product.svg"
                    class="product__img"
                    width="56"
                    height="56"
                    :alt="item.name"
                  />
                  <div class="product__text">
                    <h2>{{ item.name }}</h2>
                    <ul>
                      <li>
                        {{ item.sizes.name }}, на {{ getDoughName(item) }} тесте
                      </li>
                      <li>Соус: {{ item.sauces.name }}</li>
                      <li>
                        Начинка:
                        <template v-for="ingredient in item.ingredients">
                          <span
                            :key="ingredient.name"
                            class="cart-list__ingredient"
                            >{{ ingredient.name }}</span
                          >
                        </template>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="counter cart-list__counter">
                  <button
                    type="button"
                    class="counter__button counter__button--minus"
                    @click="decreaseCount(item)"
                  >
                    <span class="visually-hidden">Меньше</span>
                  </button>
                  <input
                    type="text"
                    name="counter"
                    class="counter__input"
                    :value="item.count"
                  />
                  <button
                    type="button"
                    class="
                      counter__button
                      counter__button--plus
                      counter__button--orange
                    "
                    @click="increaseCount(item.id)"
                  >
                    <span class="visually-hidden">Больше</span>
                  </button>
                </div>

                <div class="cart-list__price">
                  <b>{{ item.price * item.count }} ₽</b>
                </div>

                <div class="cart-list__button">
                  <button
                    @click="onChangePizzaClick(item)"
                    type="button"
                    class="cart-list__edit"
                  >
                    Изменить
                  </button>
                </div>
              </li>
            </template>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <template v-for="item in misc">
                <li class="additional-list__item sheet" :key="item.name">
                  <p class="additional-list__description">
                    <img
                      :src="item.image"
                      width="39"
                      height="60"
                      :alt="item.name"
                    />
                    <span>{{ item.name }}</span>
                  </p>

                  <div class="additional-list__wrapper">
                    <div class="counter additional-list__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        @click="decreaseMisc(item)"
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        :value="item.count"
                      />
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--plus
                          counter__button--orange
                        "
                        @click="increaseMisc(item.id)"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>

                    <div class="additional-list__price">
                      <b>{{ item.price * item.count }} ₽</b>
                    </div>
                  </div>
                </li>
              </template>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select
                  v-model="deliveryType"
                  @change="deliveryChange"
                  name="delivery"
                  class="select"
                >
                  <option :value="DELIVERY.self">Заберу сам</option>
                  <option :value="DELIVERY.house">Дом</option>
                  <option :value="DELIVERY.new">Новый адрес</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  :value="phoneNumber"
                  @input="phoneNumberInputHandler"
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                />
              </label>

              <div v-if="delivery === DELIVERY.new" class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input :value="address" type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input :value="house" type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input :value="flat" type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section class="footer">
        <div class="footer__more">
          <button
            @click="oneMoreBtnClick"
            class="button button--border button--arrow"
          >
            Хочу еще одну
          </button>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ totalPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <button @click="isPopupOpen = true" type="button" class="button">
            Оформить заказ
          </button>
        </div>
      </section>
    </form>
    <Popup v-if="isPopupOpen" @confirm="popupHandler" @close="popupHandler" />
  </div>
</template>

<script>
import { createUUIDv4 } from "@/common/helpers";
import { delivery } from "@/common/constants";
import { mapState, mapActions } from "vuex";
import Popup from "@/common/components/Popup";

export default {
  name: "Cart",
  components: {
    Popup,
  },
  computed: {
    ...mapState("Cart", {
      cart: (state) => state.cart,
      misc: (state) => state.misc,
      delivery: (state) => state.delivery,
      phoneNumber: (state) => state.phoneNumber,
      address: (state) => state.address,
      house: (state) => state.house,
      flat: (state) => state.flat,
    }),
    totalPrice() {
      const calcPrice = (previousPrice, currentItem) => {
        if (currentItem.count) {
          return (previousPrice + currentItem.price) * currentItem.count;
        } else {
          return previousPrice + 0;
        }
      };
      const cartTotalPrice = this.cart.length && this.cart.reduce(calcPrice, 0);
      const miscTotalPrice = this.misc.length && this.misc.reduce(calcPrice, 0);

      return (cartTotalPrice || 0) + (miscTotalPrice || 0);
    },
  },
  created() {
    this.getMisc();
    const misc = this.misc.map((item) => {
      item.count = 0;
      item.id = createUUIDv4();
      return item;
    });
    this.setMisc(misc);
  },
  data() {
    this.DELIVERY = delivery;
    return {
      deliveryType: "",
      isPopupOpen: false,
    };
  },
  methods: {
    ...mapActions("Cart", [
      "increasePizzaCount",
      "decreasePizzaCount",
      "deletePizza",
      "getMisc",
      "setMisc",
      "increaseMiscCount",
      "decreaseMiscCount",
      "setDeliveryType",
      "setPhoneNumber",
      "setAddress",
      "setHouseNumber",
      "setFlatNumber",
    ]),
    ...mapActions("Builder", ["updateFormPizza", "resetFormPizza"]),
    getDoughName(order) {
      return order.dough.name === "Тонкое" ? "тонком" : "толстом";
    },
    increaseCount(id) {
      this.increasePizzaCount(id);
    },
    decreaseCount(order) {
      if (order.count <= 1) {
        this.deletePizza(order.id);
      }
      this.decreasePizzaCount(order.id);
    },
    increaseMisc(id) {
      this.increaseMiscCount(id);
    },
    decreaseMisc(misc) {
      if (misc.count <= 0) return;
      this.decreaseMiscCount(misc.id);
    },
    onChangePizzaClick(order) {
      this.updateFormPizza(order);
      this.$router.push("/");
    },
    deliveryChange(event) {
      this.setDeliveryType(+event.target.value);
    },
    phoneNumberInputHandler(event) {
      this.setPhoneNumber(event.target.value);
    },
    oneMoreBtnClick() {
      this.resetFormPizza();
      this.$router.push("/");
    },
    popupHandler() {
      this.isPopupOpen = false;
      this.$router.push("/orders");
    },
  },
};
</script>

<style scoped lang="scss">
.cart-list__ingredient {
  &:after {
    content: ", ";
  }
  &:last-child:after {
    content: "";
  }
}
</style>
