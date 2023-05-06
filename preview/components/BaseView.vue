<template>
  <div class="base-view">
    <div class="view-title">
      <slot name="header" />
    </div>
    <div class="view-body">
      <slot />
    </div>
    <div class="view-footer">
      <slot name="footer" />
    </div>
    <router-view v-if="isRoot" class="child" />
  </div>
</template>
<script>
export default {
  name: "BaseView",
  props: {
    isRoot: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
<style lang="scss" scoped>
.base-view {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: $c-body-regular;

  > .view-title {
    padding-top: calc(env(safe-area-inset-top));
  }

  > .view-body {
    flex: 1;
    padding: $space4;
    overflow: scroll;
    background-color: $c-body-regular;
  }

  > .view-footer {
    padding-bottom: calc(env(safe-area-inset-bottom));
  }

  > .child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
