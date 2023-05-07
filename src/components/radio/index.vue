<template>
  <div :class="baseName">
    <div :class="`${baseName}-label`">
      <slot name="label">{{ label }}</slot>
    </div>
    <div :class="`${baseName}-value`" @click="onInput">
      <Icon v-if="value" name="select_line" color="primary" :size="42"></Icon>
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
    value: {
      type: [String, Number],
      default: () => "",
    },
    label: {
      type: [String, Number],
      default: () => "",
    },
  },
  data() {
    return {
      baseName: `${PREFIX_NAME}-radio`,
    };
  },
  computed: {},
  methods: {
    onInput() {
      this.$emit("input", !this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
$base-name: #{$prefix-name}-radio;

.#{$base-name} {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-label {
    flex: 1;
    font-size: $fs-h5;
    color: $c-text-primary;
  }

  &-value {
    flex: 0 0 42px;
  }
}
</style>
