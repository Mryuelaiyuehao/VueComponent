<template>
	<svg :class="`${baseName}`" aria-hidden="true" :style="iconStyles">
		<use :xlink:href="iconName"></use>
	</svg>
</template>
<script>
import { handleColor, pxToRem } from "@/utils";
import { PREFIX_NAME } from "../../assets/js/const";
export default {
	name: `${PREFIX_NAME.toUpperCase()}Icon`,
	props: {
		name: {
			type: String,
			default: () => "",
		},
		size: {
			type: Number,
			default: () => 30,
		},
		color: {
			type: String,
			default: () => "textPrimary",
		},
	},
	data() {
		return {
			iconName: `#${this.name}`,
			baseName: `${PREFIX_NAME}-icon`,
		};
	},
	computed: {
		iconStyles() {
			const styles = {};
			styles.width = pxToRem(this.size);
			styles.height = pxToRem(this.size);
			styles.fill = handleColor(this.color);
			return styles;
		},
	},
};
</script>
<style lang="scss" scoped>
#{prefixName}-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
