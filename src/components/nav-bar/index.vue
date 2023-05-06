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
$base-name: #{$prefix-name}-nav-bar;
.#{$base-name} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88px;
  padding: 0 $space4;
  color: $c-text-primary;

  &-primary {
    color: $c-white;
    background-color: $c-primary;
  }

  &-white {
    color: $c-text-primary;
    background-color: $c-body-base;
  }

  .#{$base-name}-left,
  .#{$base-name}-right {
    display: flex;
    align-items: center;
    min-width: 42px;
    font-size: $fs-h6;
    color: inherit;
  }

  .#{$base-name}-title {
    flex: 1;
    overflow: hidden;
    font-size: $fs-h4;
    color: inherit;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
