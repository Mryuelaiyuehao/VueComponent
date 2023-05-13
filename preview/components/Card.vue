<template>
  <div :class="`${baseName}`">
    <div v-if="title" :class="`${baseName}-title`">
      {{ title }}
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      baseName: "card",
    };
  },
};
</script>
<style lang="scss" scoped>
$base-name: "card";

.#{$base-name} {
  margin-bottom: $space5;
  .#{$base-name}-title {
    margin-bottom: $space5;
    font-size: $fs-h5;
    font-weight: 700;
    color: $c-text-primary;
  }
}
</style>
