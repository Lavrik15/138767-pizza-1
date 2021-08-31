<template>
  <div>
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      debugger;
      console.log("layout", layout);
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style scoped></style>
