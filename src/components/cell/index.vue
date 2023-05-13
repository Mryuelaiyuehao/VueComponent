<template>
  <div :class="classNames" @click="handleClick">
    <slot name="icon">
      <Icon v-if="icon" :name="icon" :size="30" />
    </slot>
    <div :class="`${baseName}-title`">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <slot name="label">
        <div v-if="label" :class="`${baseName}-label`">
          {{ label }}
        </div>
      </slot>
    </div>
    <div :class="`${baseName}-value`">
      <slot>
        <span v-if="value">{{ value }}</span>
      </slot>
    </div>
    <slot name="right-icon">
      <Icon
        v-if="isLink"
        :class="`${baseName}-right-icon`"
        name="arrow_right_line"
        :size="30"
      />
    </slot>
  </div>
</template>
<script>
import Icon from "../icon";
import { PREFIX_NAME } from "../../assets/js/enums";
export default {
  name: `${PREFIX_NAME}Cell`,
  components: {
    Icon,
  },
  props: {
    title: {
      type: [String, Number],
      default: () => "",
    },
    value: {
      type: [String, Number],
      default: () => "",
    },
    label: {
      type: String,
      default: () => "",
    },
    icon: {
      type: String,
      default: () => "",
    },
    url: {
      type: String,
      default: () => "",
    },
    to: {
      type: [String, Object],
      default: () => "",
    },
    replace: {
      type: Boolean,
      default: () => false,
    },
    clickable: {
      type: Boolean,
      default: () => false,
    },
    isLink: {
      type: Boolean,
      default: () => false,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    center: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-cell`,
    };
  },
  computed: {
    classNames() {
      const classNames = [this.baseName];
      if (this.center) {
        classNames.push(`${this.baseName}-center`);
      }
      if (this.clickable || this.isLink) {
        classNames.push(`${this.baseName}-clickable`);
      }
      if (this.required) {
        classNames.push(`${this.baseName}-required`);
      }
      return classNames;
    },
  },
  methods: {
    handleClick() {
      if (!this.isLink || !this.clickable) {
        return;
      }
      this.$emit("click");
      if (typeof this.url === "string" && this.url) {
        window.location.href = this.url;
        return;
      }
      if (typeof this.to === "string" && this.to) {
        if (this.replace) {
          this.$router.replace({
            path: this.to,
          });
        } else {
          this.$router.push({
            path: this.to,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$base-name: #{$prefix-name}-cell;

.#{$base-name} {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: $space4 $space5;
  overflow: hidden;
  font-size: $fs-h5;
  background-color: $c-body-base;

  .#{$base-name}-title {
    flex: 2 1 0;
    color: $c-text-primary;

    > .#{$base-name}-label {
      margin-top: $space-base;
      font-size: $fs-h6;
      color: $c-text-secondary;
    }
  }

  .#{$base-name}-value {
    display: flex;
    flex: 1 1 0;
    justify-content: flex-end;
    color: $c-text-secondary;
    text-align: right;
    word-break: break-all;
  }

  .#{$base-name}-right-icon {
    flex: 0 0 42px;
    margin-left: $space-base;
  }

  &-center {
    align-items: center;
  }

  &-required::before {
    position: absolute;
    top: 50%;
    left: 15px;
    font-size: $fs-h5;
    color: $c-danger;
    content: "*";
    transform: translateY(-50%);
  }

  &-clickable:active {
    background: $c-body-secondary;
  }

  &:not(:last-child)::after {
    position: absolute;
    right: $space5;
    bottom: 0%;
    left: $space5;
    display: block;
    content: "";
    border-bottom: 1px solid $c-border-weak;
  }
}
</style>
