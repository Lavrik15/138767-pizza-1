<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="onFormSubmit" method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            type="password"
            v-model.trim="password"
            name="pass"
            placeholder="***********"
          />
        </label>
      </div>
      <button
        type="submit"
        class="button"
        :disabled="!isSubmitBtnDisabled"
        :class="{ 'button--disabled': !isSubmitBtnDisabled }"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    isSubmitBtnDisabled() {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const isEmailValid = this.email.match(validRegex);
      const isPasswordValid = this.password !== "";

      return isEmailValid && isPasswordValid;
    },
  },
  methods: {
    async onFormSubmit() {
      try {
        await this.$api.user.login({
          email: this.email,
          password: this.password,
        });
      } catch () {
        console.log(e.message);
      }
    },
  },
};
</script>

<style scoped></style>
