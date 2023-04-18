<template>
  <div :class="`${baseName}`">
    <slot name="title">
      <div
        v-if="title"
        :class="`${baseName}-title`"
      >
        {{ title }}
      </div>
    </slot>
    <slot />
  </div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/const";
export default {
	name: `${PREFIX_NAME}CellGroup`,
	props: {
		title: {
			type: String,
			default: () => "",
		},
	},
	data() {
		return {
			baseName: `${PREFIX_NAME}-cell-group`,
		};
	},
};
</script>
<style lang="scss" scoped>
$baseName: #{$prefixName}-cell-group;

.#{$baseName} {
	border-radius: $radius-card;
	background: $c-body-base;
	overflow: hidden;
	margin-bottom: $space5;
	.#{$baseName}-title {
		padding: $space4 $space5 0;
		color: $c-text-primary;
		font-size: $fs-h5;
		font-weight: bold;
	}
}
</style>
