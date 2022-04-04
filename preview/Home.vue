<template>
	<base-view class="home">
		<NavBar slot="header" title="泽跃的组件库"></NavBar>
		<CellGroup class="cell-group-custom">
			<Cell :title="'切换暗黑'">
				<xzy-switch v-model="isDark" size="normal"></xzy-switch>
			</Cell>
		</CellGroup>

		<template v-for="(item, index) in list">
			<CellGroup class="cell-group-custom" :title="item.title" :key="index">
				<Cell
					v-for="({ title, to }, subIndex) in item.children"
					:key="subIndex"
					:title="title"
					:to="to"
					is-link
					center
					clickable
				></Cell>
			</CellGroup>
		</template>
	</base-view>
</template>
<script>
import cssVars from "css-vars-ponyfill";
import { generateTheme, isDarkMode } from "@/utils/index";
import NavBar from "@/components/nav-bar";
import CellGroup from "@/components/cell-group";
import Cell from "@/components/cell";
import Switch from "../src/components/switch";
export default {
	name: "Home",
	components: {
		NavBar,
		CellGroup,
		Cell,
		"xzy-switch": Switch,
	},
	data() {
		return {
			isDark: isDarkMode(),
			list: [
				{
					title: "基础组件",
					children: [
						{
							title: "Cell 单元格",
							to: "/cell",
						},
						{
							title: "Icon 图标",
							to: "/icon",
						},
					],
				},
				{
					title: "导航组件",
					children: [
						{
							title: "NavBar 导航栏",
							to: "/navBar",
						},
					],
				},
			],
		};
	},
	methods: {
		changeTheme() {
			this.isDark = !this.isDark;
		},
	},
	watch: {
		isDark(val) {
			cssVars({
				variables: generateTheme(val),
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.cell-group-custom {
	margin-bottom: $space5;
}
.switch {
	color: $c-text-primary;
}
</style>
