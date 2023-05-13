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
      if (this.disabled) {
        classNames.push(`${base}-disabled`);
      }
      return classNames;
    },
    styles() {
      const styles = {
        backgroundColor: handleColor(this.inactiveColor),
      };
      if (this.value) {
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
      if (this.value) {
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
$base-name: #{$prefix-name}-switch;
.#{$base-name} {
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

  &-disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  > .#{$base-name}-node {
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

$size: "small" 62.4px 38.4px 24px 24px 18px, "large" 117px 72px 45px 45px 36px;

@each $name, $width, $height, $nodeWidth, $nodeHeight, $border-radius in $size {
  .#{$base-name}-#{$name} {
    width: $width;
    height: $height;
    border-radius: $border-radius;

    .#{$base-name}-node-#{$name} {
      width: $nodeWidth;
      height: $nodeHeight;
    }
    .#{$base-name}-node-on {
      transform: translateX($width - 18px - $nodeWidth);
    }
  }
}
</style>
