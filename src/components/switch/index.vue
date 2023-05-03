<template>
  <div :class="classNames" :style="styles" @click="onClick">
    <div :class="classNodeNames" />
  </div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/enums";
import { SWITCH_SIZE } from "./enums";
import { handleColor } from "../../utils/index";
export default {
  name: `${PREFIX_NAME}Switch`,
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    size: {
      type: String,
      default: () => SWITCH_SIZE.NORMAL,
    },
    activeColor: {
      type: String,
      default: () => "primary",
    },
    inactiveColor: {
      type: String,
      default: () => "bodyRegular",
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-switch`,
    };
  },
  computed: {
    classNames() {
      const base = this.baseName;
      const classNames = [base];
      if (this.size === SWITCH_SIZE.LARGE) {
        classNames.push(`${base}-${SWITCH_SIZE.LARGE}`);
      } else if (this.size === SWITCH_SIZE.SMALL) {
        classNames.push(`${base}-${SWITCH_SIZE.SMALL}`);
      }
      return classNames;
    },
    styles() {
      const styles = {
        backgroundColor: handleColor(this.inactiveColor),
      };
      if (this.value && !this.disabled) {
        styles.backgroundColor = handleColor(this.activeColor);
      }

      return styles;
    },
    classNodeNames() {
      const base = `${this.baseName}-node`;
      const classNames = [base];
      if (this.size === SWITCH_SIZE.LARGE) {
        classNames.push(`${base}-${SWITCH_SIZE.LARGE}`);
      } else if (this.size === SWITCH_SIZE.SMALL) {
        classNames.push(`${base}-${SWITCH_SIZE.SMALL}`);
      }
      if (this.value && !this.disabled) {
        classNames.push(`${base}-on`);
      }
      return classNames;
    },
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }
      this.$emit("input", !this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
$baseName: #{$prefix-name}-switch;
.#{$baseName} {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 78px;
  height: 48px;
  padding: $space-base $space-base * 1.5;
  border-radius: $radius-card;
  transition: background-color 0.3s;

  > .#{$baseName}-node {
    width: 30px;
    height: 30px;
    background: $c-body-base;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);

    &-on {
      transform: translateX(78px - 18px - 30px);
    }
  }
}
$size: "small" 62.4px 38.4px 24px 24px, "large" 93.6px 57.6px 36px 36px;

@each $name, $width, $height, $nodeWidth, $nodeHeight in $size {
  .#{$baseName}-#{$name} {
    width: $width;
    height: $height;

    .#{$baseName}-node-#{$name} {
      width: $nodeWidth;
      height: $nodeHeight;
    }
    .#{$baseName}-node-on {
      transform: translateX($width - 18px - $nodeWidth);
    }
  }
}
</style>
