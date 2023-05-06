<template>
  <svg :class="`${baseName}`" aria-hidden="true" :style="iconStyles">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { handleColor, pxToRem } from "../../utils/index";
import { PREFIX_NAME } from "../../assets/js/enums";
export default {
  name: `${PREFIX_NAME}Icon`,
  props: {
    name: {
      type: String,
      default: () => "",
    },
    size: {
      type: Number,
      default: () => 30,
    },
    color: {
      type: String,
      default: () => "textPrimary",
    },
  },
  data() {
    return {
      iconName: `#${this.name}`,
      baseName: `${PREFIX_NAME}-icon`,
    };
  },
  computed: {
    iconStyles() {
      const styles = {};
      styles.width = pxToRem(this.size);
      styles.height = pxToRem(this.size);
      styles.fill = handleColor(this.color);
      return styles;
    },
  },
};
</script>
<style lang="scss" scoped>
.#{$prefix-name}-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
