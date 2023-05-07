<template>
  <div :class="`${baseName}`">
    <transition :name="contentName" appear>
      <div v-if="value" :class="contentClassNames" :style="customStyle">
        <slot></slot>
        <div v-if="closeable" :class="contentIconClassNames" @click="onInput">
          <Icon name="close_face" :size="36" color="textRegular"></Icon>
        </div>
      </div>
    </transition>
    <transition v-if="overlay" :name="`${baseName}-overlay`" appear>
      <div v-if="value" :class="`${baseName}-overlay`" @click="onInput"></div>
    </transition>
  </div>
</template>
<script>
import { Icon } from "../../index.js";
import { PREFIX_NAME } from "../../assets/js/enums";
import { POPUP_POSITION, POPUP_CLOSE_POSITION } from "./enums";
export default {
  name: `${PREFIX_NAME}Popup`,
  components: {
    Icon,
  },
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    overlay: {
      type: Boolean,
      default: () => true,
    },
    position: {
      type: String,
      default: () => POPUP_POSITION.CENTER,
    },
    round: {
      type: Boolean,
      default: () => false,
    },
    closeable: {
      type: Boolean,
      default: () => false,
    },
    closeIconPosition: {
      type: String,
      default: () => POPUP_CLOSE_POSITION.TOP_RIGHT,
    },
    lockScroll: {
      type: Boolean,
      default: () => true,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-popup`,
    };
  },
  computed: {
    contentName() {
      const base = `${this.baseName}-content`;
      let name = "";
      if (this.position === POPUP_POSITION.CENTER) {
        name = `${base}-center`;
      } else if (this.position === POPUP_POSITION.TOP) {
        name = `${base}-top`;
      } else if (this.position === POPUP_POSITION.BOTTOM) {
        name = `${base}-bottom`;
      } else if (this.position === POPUP_POSITION.LEFT) {
        name = `${base}-left`;
      } else if (this.position === POPUP_POSITION.RIGHT) {
        name = `${base}-right`;
      }
      return name;
    },
    contentClassNames() {
      const base = `${this.baseName}-content`;
      const classNames = [base];
      let positionClassName = "";
      let roundClassName = "";
      if (this.position === POPUP_POSITION.CENTER) {
        positionClassName = `${base}-center`;
        roundClassName = `${base}-round-center`;
      } else if (this.position === POPUP_POSITION.TOP) {
        positionClassName = `${base}-top`;
        roundClassName = `${base}-round-top`;
      } else if (this.position === POPUP_POSITION.BOTTOM) {
        positionClassName = `${base}-bottom`;
        roundClassName = `${base}-round-bottom`;
      } else if (this.position === POPUP_POSITION.LEFT) {
        positionClassName = `${base}-left`;
        roundClassName = `${base}-round-left`;
      } else if (this.position === POPUP_POSITION.RIGHT) {
        positionClassName = `${base}-right`;
        roundClassName = `${base}-round-right`;
      }
      classNames.push(positionClassName);
      if (this.round) {
        classNames.push(roundClassName);
      }
      return classNames;
    },
    contentIconClassNames() {
      const base = `${this.baseName}-content-icon`;
      const classNames = [base];
      let className = "";
      if (this.closeIconPosition === POPUP_CLOSE_POSITION.TOP_LEFT) {
        className = `${base}-top-left`;
      } else if (this.closeIconPosition === POPUP_CLOSE_POSITION.TOP_RIGHT) {
        className = `${base}-top-right`;
      }

      classNames.push(className);
      return classNames;
    },
  },
  watch: {
    value(value) {
      if (value && this.lockScroll) {
        document.body.classList.add(`${PREFIX_NAME}-overflow-hidden`);
      } else {
        document.body.classList.remove(`${PREFIX_NAME}-overflow-hidden`);
      }
    },
  },
  methods: {
    onInput() {
      this.$emit("input", false);
    },
  },
};
</script>
<style lang="scss" scoped>
$base-name: #{$prefix-name}-popup;

.#{$base-name} {
  width: 100%;

  &-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index-lg;
    background-color: $c-body-base;

    &-icon {
      position: relative;
    }

    $iconPositions: "top-left" $space4 $space4 initial initial,
      "top-right" $space4 initial $space4 initial;

    @each $position, $top, $left, $right, $bottom in $iconPositions {
      &-icon-#{$position} {
        top: $top;
        right: $right;
        bottom: $bottom;
        left: $left;
      }
    }

    $rounds: "center" $space4 $space4 $space4 $space4, "top" 0 0 $space4 $space4,
      "top" 0 0 $space4 $space4, "bottom" $space4 $space4 0 0,
      "left" 0 $space4 $space4 0, "right" $space4 0 0 $space4;

    @each $position, $t-f, $t-r, $b-r, $b-l in $rounds {
      &-round-#{$position} {
        border-radius: $t-f $t-r $b-r $b-l;
      }
    }
  }

  $positions: "center" 50% initial 50% initial -50% -50% 1 -50% -50% 0,
    "top" 0 initial 0 initial 0% 0% 1 0% -100% 1,
    "bottom" initial 0 0 initial 0% 0% 1 0% 100% 1,
    "left" 0 initial 0 initial 0% 0% 1 -100% 0% 1,
    "right" initial 0 initial 0 0% 0% 1 100% 0% 1;

  @each $position, $top, $bottom, $left, $right, $trans-x-start, $trans-y-start,
    $scale-start, $trans-x-end, $trans-y-end, $scale-end in $positions
  {
    &-content-#{$position} {
      top: $top;
      right: $right;
      bottom: $bottom;
      left: $left;
      transform: translate($trans-x-start, $trans-y-start) scale($scale-start);
    }

    &-content-#{$position}-enter,
    &-content-#{$position}-leave-to {
      transform: translate($trans-x-end, $trans-y-end) scale($scale-end);
    }
    &-content-#{$position}-enter-active,
    &-content-#{$position}-leave-active {
      transition: transform 0.3s ease;
    }
  }

  &-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $c-mask;
  }

  &-overlay-enter,
  &-overlay-leave-to {
    opacity: 0;
  }

  &-overlay-enter-to,
  &-overlay-leave {
    opacity: 1;
  }

  &-overlay-enter-active,
  &-overlay-leave-active {
    transition: opacity 0.3s ease;
  }
}
</style>
