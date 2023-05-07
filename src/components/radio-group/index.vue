<template>
  <div :class="baseName">
    <slot></slot>
  </div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/enums";
export default {
  name: `${PREFIX_NAME}RadioGroup`,
  props: {},
  data() {
    return {
      baseName: `${PREFIX_NAME}-radio-group`,
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
