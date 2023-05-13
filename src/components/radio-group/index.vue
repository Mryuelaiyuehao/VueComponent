<template>
  <div :class="baseName">
    <slot></slot>
  </div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/enums";
export default {
  name: `${PREFIX_NAME}RadioGroup`,
  props: {
    value: {
      type: [String, Number],
      default: () => "",
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-radio-group`,
    };
  },
  watch: {
    value() {
      this.$emit("change", this.value);
    },
  },
  methods: {
    onClick(name) {
      this.$emit("input", name);
    },
  },
};
</script>
<style lang="scss" scoped>
$base-name: #{$prefix-name}-radio-group;
.#{$base-name} {
  margin-bottom: $space5;
  overflow: hidden;
  background: $c-body-base;
  border-radius: $radius-card;
}
</style>
