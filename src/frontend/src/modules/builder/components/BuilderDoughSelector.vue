<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label v-for="item in dough" :key="item.image" class="dough__input">
          <input
            v-model="doughType"
            :value="item.doughType"
            @change="doughTypeHandler(item)"
            type="radio"
            name="dough"
            class="visually-hidden"
          />
          <div class="dough__image-wrapper">
            <div
              class="dough__image"
              :style="{ backgroundImage: `url('${item.image}')` }"
            ></div>
            <b>{{ item.name }}</b>
          </div>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { doughType } from "@/common/constants";

export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      doughType: doughType.small,
    };
  },
  methods: {
    doughTypeHandler(dough) {
      const data = {
        ...dough,
        doughType: +this.doughType,
      };
      this.$emit("doughTypeChange", data);
    },
  },
};
</script>

<style scoped></style>
