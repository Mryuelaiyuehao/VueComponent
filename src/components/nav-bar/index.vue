<template>
  <div :class="classNames">
    <div :class="`${baseName}-left`" @click="clickLeft">
      <slot name="left">
        <icon
          v-if="leftArrow"
          name="arrow_left_line"
          :color="leftIconColor"
          :size="42"
        />
        {{ leftText }}
      </slot>
    </div>
    <div :class="`${baseName}-title`">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div :class="`${baseName}-right`" @click="clickRight">
      <slot name="right">
        {{ rightText }}
      </slot>
    </div>
  </div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/enums";
import Icon from "../icon";
import { NAVBAR_TYPE } from "./enums";
export default {
  name: `${PREFIX_NAME}NavBar`,
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      default: () => "",
    },
    leftText: {
      type: String,
      default: () => "",
    },
    rightText: {
      type: String,
      default: () => "",
    },
    leftArrow: {
      type: Boolean,
      default: () => false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: () => "default",
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-nav-bar`,
    };
  },
  computed: {
    classNames() {
      const base = this.baseName;
      const classNames = [base];
      if (this.type === NAVBAR_TYPE.PRIMARY) {
        classNames.push(`${base}-primary`);
      } else if (this.type === NAVBAR_TYPE.WHITE) {
        classNames.push(`${base}-white`);
      }
      return classNames;
    },
    leftIconColor() {
      let iconColor = "textPrimary";
      if (this.type === NAVBAR_TYPE.PRIMARY) {
        iconColor = "white";
      } else if (this.type === NAVBAR_TYPE.WHITE) {
        iconColor = "textPrimary";
      }
      return iconColor;
    },
  },
  methods: {
    clickLeft() {
      if (!(this.leftText || this.leftArrow)) return;
      this.$emit("click-left");
    },
    clickRight() {
      if (!this.rightText) return;
      this.$emit("click-right");
    },
  },
};
</script>
<style lang="scss" scoped>
$baseName: #{$prefix-name}-nav-bar;
.#{$baseName} {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $space4;
  height: 88px;
  color: $c-text-primary;

  &-primary {
    background-color: $c-primary;
    color: $c-white;
  }
  &-white {
    background-color: $c-body-base;
    color: $c-text-primary;
  }

  .#{$baseName}-left,
  .#{$baseName}-right {
    display: flex;
    align-items: center;
    color: inherit;
    min-width: 42px;
    font-size: $fs-h6;
  }

  .#{$baseName}-title {
    flex: 1;
    font-size: $fs-h4;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: inherit;
  }
}
</style>
