<template>
	<div :class="classNames" :style="styles" @click="onClick">
		<div :class="classNodeNames"></div>
	</div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/const";
import { SWITCH_SIZE } from "./const";
import { handleColor } from "../../utils";
export default {
	name: `${PREFIX_NAME}Switch`,
	props: {
		value: {
			type: Boolean,
			default: () => false,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		size: {
			type: String,
			default: () => "normal",
		},
		activeColor: {
			type: String,
			default: () => "primary",
		},
		inactiveColor: {
			type: String,
			default: () => "bodyRegular",
		},
	},
	data() {
		return {
			baseName: `${PREFIX_NAME}-switch`,
		};
	},
	computed: {
		classNames() {
			const base = this.baseName;
			const classNames = [base];
			if (this.size === SWITCH_SIZE.LARGE) {
				classNames.push(`${base}-large`);
			} else if (this.size === SWITCH_SIZE.NORMAL) {
				classNames.push(`${base}-normal`);
			} else if (this.size === SWITCH_SIZE.SMALL) {
				classNames.push(`${base}-small`);
			}
			return classNames;
		},
		styles() {
			const styles = {
				backgroundColor: handleColor(this.inactiveColor),
			};
			if (this.value && !this.disabled) {
				styles.backgroundColor = handleColor(this.activeColor);
			}

			return styles;
		},
		classNodeNames() {
			const base = `${this.baseName}-node`;
			const classNames = [base];
			if (this.size === SWITCH_SIZE.LARGE) {
				classNames.push(`${base}-large`);
			} else if (this.size === SWITCH_SIZE.NORMAL) {
				classNames.push(`${base}-normal`);
			} else if (this.size === SWITCH_SIZE.SMALL) {
				classNames.push(`${base}-small`);
			}
			if (this.value && !this.disabled) {
				classNames.push(`${base}-on`);
			}
			return classNames;
		},
	},
	methods: {
		onClick() {
			if (this.disabled) {
				return;
			}
			this.$emit("input", !this.value);
		},
	},
};
</script>
<style lang="scss" scoped>
$baseName: #{$prefixName}-switch;
.#{$baseName} {
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	box-sizing: border-box;
	padding: $space-base $space-base * 1.5;
	border-radius: $radius-card;
	transition: background-color 0.3s;

	> .#{$baseName}-node {
		border-radius: 50%;
		background: $c-body-base;
		transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
	}
}
$size: "small" 62.4px 38.4px 24px 24px, "normal" 78px 48px 30px 30px,
	"large" 93.6px 57.6px 36px 36px;
@each $name, $width, $height, $nodeWidth, $nodeHeight in $size {
	.#{$baseName}-#{$name} {
		width: $width;
		height: $height;

		.#{$baseName}-node-#{$name} {
			width: $nodeWidth;
			height: $nodeHeight;
		}
		.#{$baseName}-node-on {
			transform: translateX($width - 18px - $nodeWidth);
		}
	}
}
</style>