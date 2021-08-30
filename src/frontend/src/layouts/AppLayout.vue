<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutMain";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      console.log(layout);
      // return () => import(`@/layouts/${layout}.vue`);
      return () => import(`@/layouts/AppLayoutMain.vue`);
    },
  },
};
</script>

<style scoped></style>
