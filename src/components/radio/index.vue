<template>
  <div :class="classNames" @click="onClick">
    <div :class="`${baseName}-left`">
      <div v-if="label" :class="`${baseName}-label`">{{ label }}</div>
      <div v-if="desc" :class="`${baseName}-desc`">{{ desc }}</div>
    </div>
    <div :class="`${baseName}-value`">
      <Icon v-if="checked" name="select_line" color="primary" :size="42"></Icon>
    </div>
  </div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/enums";
import Icon from "../icon/index.vue";
export default {
  name: `${PREFIX_NAME}Radio`,
  components: { Icon },
  props: {
    name: {
      type: [String, Number],
      default: () => "",
    },
    label: {
      type: [String, Number],
      default: () => "",
    },
    desc: {
      type: [String, Number],
      default: () => "",
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-radio`,
    };
  },
  computed: {
    checked() {
      return this.$parent.value === this.name;
    },
    classNames() {
      const base = this.baseName;
      const classNames = [base];
      if (this.disabled) {
        classNames.push(`${base}-disabled`);
      }
      return classNames;
    },
  },
  methods: {
    onClick() {
      this.$parent.onClick(this.name);
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss" scoped>
$base-name: #{$prefix-name}-radio;

.#{$base-name} {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space4 $space5;
  overflow: hidden;

  &-disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active {
    background: $c-body-secondary;
  }

  &-left {
    font-size: $fs-h5;
    color: $c-text-primary;
  }

  &-label {
    font-size: $fs-h5;
    color: $c-text-primary;
  }

  &-desc {
    font-size: $fs-h6;
    color: $c-text-secondary;
  }

  &-value {
    display: flex;
    flex: 0 0 42px;
    align-content: center;
    justify-items: center;
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
