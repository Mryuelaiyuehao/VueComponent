<template>
  <button :class="classNames" :type="nativeType" @click="handleClick">
    <div :class="`${baseName}-item`">
      <slot v-if="isIconLeft" name="icon">
        <Icon
          v-if="icon"
          :class="`${baseName}-icon`"
          :name="icon"
          :size="iconSize"
          :color="iconColor"
        />
      </slot>
      <slot>
        <span>{{ text }}</span>
      </slot>
      <slot v-if="!isIconLeft" name="icon">
        <Icon
          v-if="icon"
          :class="`${baseName}-icon`"
          :name="icon"
          :size="iconSize"
          :color="iconColor"
        />
      </slot>
    </div>
  </button>
</template>
<script>
import Icon from "@/components/icon";
import { PREFIX_NAME } from "../../assets/js/enums";
import { BUTTON_TYPE, BUTTON_SIZE, BUTTON_ICON_POSITION } from "./enums";

export default {
  name: `${PREFIX_NAME}-cell`,
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: () => BUTTON_TYPE.DEFAULT,
    },
    nativeType: {
      type: String,
      default: () => "",
    },
    size: {
      type: String,
      default: () => BUTTON_SIZE.NORMAL,
    },
    text: {
      type: String,
      default: () => "",
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    block: {
      type: Boolean,
      default: () => false,
    },
    round: {
      type: Boolean,
      default: () => true,
    },
    icon: {
      type: String,
      default: () => "",
    },
    iconPosition: {
      type: String,
      default: () => BUTTON_ICON_POSITION.LEFT,
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-button`,
    };
  },
  computed: {
    classNames() {
      const classNames = [this.baseName];
      if (this.type === BUTTON_TYPE.PRIMARY) {
        classNames.push(`${this.baseName}-${BUTTON_TYPE.PRIMARY}`);
      } else if (this.type === BUTTON_TYPE.INFO) {
        classNames.push(`${this.baseName}-${BUTTON_TYPE.INFO}`);
      } else if (this.type === BUTTON_TYPE.TEXT) {
        classNames.push(`${this.baseName}-${BUTTON_TYPE.TEXT}`);
      } else if (this.type === BUTTON_TYPE.LINK) {
        classNames.push(`${this.baseName}-${BUTTON_TYPE.LINK}`);
      }
      if (this.size === BUTTON_SIZE.LARGE) {
        classNames.push(`${this.baseName}-${BUTTON_SIZE.LARGE}`);
      } else if (this.size === BUTTON_SIZE.SMALL) {
        classNames.push(`${this.baseName}-${BUTTON_SIZE.SMALL}`);
      }
      if (this.round) {
        classNames.push(`${this.baseName}-round`);
      }
      if (this.block) {
        classNames.push(`${this.baseName}-block`);
      }
      if (this.disabled) {
        classNames.push(`${this.baseName}-disabled`);
      }
      return classNames;
    },
    iconSize() {
      let iconSize = 28;
      if (this.size === BUTTON_SIZE.LARGE) {
        iconSize = 30;
      } else if (this.size === BUTTON_SIZE.SMALL) {
        iconSize = 24;
      }
      return iconSize;
    },
    iconColor() {
      let iconColor = "textPrimary";
      if (this.type === BUTTON_TYPE.PRIMARY) {
        iconColor = "white";
      } else if (this.type === BUTTON_TYPE.INFO) {
        iconColor = "primary";
      } else if (this.type === BUTTON_TYPE.TEXT) {
        iconColor = "textSecondary";
      } else if (this.type === BUTTON_TYPE.LINK) {
        iconColor = "link";
      }
      return iconColor;
    },
    isIconLeft() {
      return this.iconPosition === BUTTON_ICON_POSITION.LEFT;
    },
  },
  methods: {
    handleClick(e) {
      if (this.disabled) {
        return e.preventDefault();
      }
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
$baseName: #{$prefix-name}-button;

.#{$baseName} {
  position: relative;
  min-width: 120px;
  height: 72px;
  padding: 0 $space4;
  font-size: $fs-h6;
  color: $c-text-primary;
  background-color: $c-body-base;
  border-width: 0;
  $types: "primary" $c-white $c-primary, "info" $c-primary var(--primary1),
    "text" $c-text-secondary $c-body-regular, "link" $c-link $c-body-regular;

  @each $type, $color, $bgColor in $types {
    &-#{$type} {
      color: $color;
      background-color: $bgColor;
    }
  }

  $sizes: "large" 240px 96px $fs-h5, "small" 90px 60px $fs-h7;

  @each $size, $minWidth, $height, $fontSize in $sizes {
    &-#{$size} {
      min-width: $minWidth;
      height: $height;
      font-size: $fontSize;
    }
  }

  &-block {
    display: block;
    min-width: 100%;
  }

  &-round {
    border-radius: $radius-card;
  }

  &-disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: $c-black;
    border-radius: inherit;
    opacity: 0;
  }

  &:active::before {
    opacity: 0.1;
  }

  &-item {
    display: flex;
    gap: $space-base;
    align-items: center;
    justify-content: center;
  }
}
</style>
