<template>
  <div
    :class="classNames"
    @touchend="handleClick"
  >
    <slot name="icon">
      <Icon
        v-if="icon"
        :name="icon"
        :size="30"
      />
    </slot>
    <div :class="`${baseName}-title`">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <slot name="label">
        <div
          v-if="label"
          :class="`${baseName}-label`"
        >
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
	name: `${PREFIX_NAME.toUpperCase()}-cell`,
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
$baseName: #{$prefixName}-cell;

.#{$baseName} {
	position: relative;
	display: flex;
	justify-content: space-between;
	background-color: $c-body-base;
	padding: $space4 $space5;
	overflow: hidden;
	font-size: $fs-h5;

	.#{$baseName}-title {
		flex: 2 1 0;
		color: $c-text-primary;

		> .#{$baseName}-label {
			margin-top: $space-base;
			font-size: $fs-h6;
			color: $c-text-secondary;
		}
	}

	.#{$baseName}-value {
		display: flex;
		justify-content: flex-end;
		flex: 1 1 0;
		color: $c-text-secondary;
		text-align: right;
		word-break: break-all;
	}

	.#{$baseName}-right-icon {
		flex: 0 0 42px;
		margin-left: $space-base;
	}

	&-center {
		align-items: center;
	}

	&-required::before {
		content: "*";
		position: absolute;
		top: 50%;
		left: 15px;
		transform: translateY(-50%);
		font-size: $fs-h5;
		color: $c-danger;
	}
	&-clickable:active {
		background: $c-body-secondary;
	}

	&:not(:last-child)::after {
		display: block;
		content: "";
		position: absolute;
		bottom: 0%;
		left: $space5;
		right: $space5;
		border-bottom: 1px solid $c-border-weak;
	}
}
</style>

