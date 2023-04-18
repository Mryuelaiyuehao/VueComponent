<template>
  <div :class="`${baseName}`">
    <div
      v-if="title"
      :class="`${baseName}-title`"
    >
      {{ title }}
    </div>
    <slot />
  </div>
</template>
<script>
export default {
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
$baseName: "card";

.#{$baseName} {
	margin-bottom: $space5;
	.#{$baseName}-title {
		margin-bottom: $space5;
		color: $c-text-primary;
		font-size: $fs-h5;
		font-weight: 700;
	}
}
</style>
