<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">{{ title }}</h1>
        </div>
        <AppLayoutSidebar />
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
