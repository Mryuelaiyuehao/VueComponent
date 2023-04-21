<template>
	<div :class="${baseName}">slot</div>
</template>
<script>
import { PREFIX_NAME } from "../../assets/js/enums";
import { POPUP_POSITION } from "./enums";
export default {
	name: `${PREFIX_NAME.toUpperCase()}Popup`,
	props: {
		show: {
			type: Boolean,
			default: () => false,
		},
		overlay: {
			type: Boolean,
			default: () => true,
		},
		position: {
			type: String,
			default: () => POPUP_POSITION.CENTER,
		},
		duration: {
			type: Number,
			default: () => 0.3,
		},
		round: {
			type: Boolean,
			default: () => true,
		},
		zIndex: {
			type: Number,
			default: () => 2000,
		},
		lockScroll: {
			type: Boolean,
			default: () => false,
		},
		lazyRender: {
			type: Boolean,
			default: () => true,
		},
	},
	data() {
		return {
			baseName: `${PREFIX_NAME}-popup`,
		};
	},
	computed: {},
	watch: {},
	methods: {},
};
</script>
<style lang="scss" scoped></style>

