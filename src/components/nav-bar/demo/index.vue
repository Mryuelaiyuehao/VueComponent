<template>
	<base-view>
		<NavBar
			:title="'NavBar'"
			type="white"
			left-arrow
			slot="header"
			@click-left="goBack"
		></NavBar>
		<card :title="'基础用法'">
			<NavBar
				:title="'标题'"
				:leftText="'返回'"
				:rightText="'按钮'"
				left-arrow
			></NavBar>
		</card>
		<card :title="'使用插槽'">
			<NavBar>
				<div slot="title">插槽</div>
				<Icon slot="left" name="close_line" :size="42" color="primary"></Icon>
				<Icon slot="right" name="search_line" :size="42" color="primary"></Icon>
			</NavBar>
		</card>
		<card :title="'primary'">
			<NavBar
				:title="'标题'"
				:leftText="'返回'"
				:rightText="'按钮'"
				left-arrow
				type="primary"
			></NavBar>
		</card>
		<card :title="'white'">
			<NavBar
				:title="'标题'"
				:leftText="'返回'"
				:rightText="'按钮'"
				left-arrow
				type="white"
			></NavBar>
		</card>
	</base-view>
</template>
<script>
import NavBar from "../index.vue";
import Icon from "../../icon";
export default {
	name: "NavBarDemo",
	components: { NavBar, Icon },
	methods: {
		goBack() {
			this.$router.back();
		},
	},
};
</script>
<style lang="scss" scoped>
.left-custom {
	display: flex;
	align-items: center;
}
</style>