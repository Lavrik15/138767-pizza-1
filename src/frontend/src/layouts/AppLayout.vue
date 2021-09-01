<template>
  <div>
    <component :is="layout" :title="title">
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
      console.log(layout);
      return () => import(`@/layouts/${layout}.vue`);
    },
    title() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style scoped></style>
