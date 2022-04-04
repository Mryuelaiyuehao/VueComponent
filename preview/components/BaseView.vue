<template>
	<div class="base-view">
		<div class="view-title">
			<slot name="header"></slot>
		</div>
		<div class="view-body">
			<slot></slot>
		</div>
		<div class="view-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "BaseView",
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
		background-color: $c-body-regular;
		overflow: scroll;
	}

	> .view-footer {
		padding-bottom: calc(env(safe-area-inset-bottom));
	}
}
</style>
