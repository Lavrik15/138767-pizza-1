<template>
  <div>
    <AppLayoutHeader />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style scoped></style>
