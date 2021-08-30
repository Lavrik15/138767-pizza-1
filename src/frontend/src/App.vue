<template>
  <div id="app">
    <AppLayoutMain>
      <router-view />
    </AppLayoutMain>
  </div>
</template>

<script>
import AppLayoutMain from "@/layouts/AppLayoutMain";

export default {
  name: "App",
  components: {
    AppLayoutMain,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
