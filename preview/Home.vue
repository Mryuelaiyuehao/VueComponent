<template>
	<base-view class="home" is-root>
		<NavBar slot="header" :title="$t('common.title')"></NavBar>
		<CellGroup class="cell-group-custom">
			<Cell :title="$t('common.theme')" center>
				<ul class="theme">
					<li
						v-for="color in primaryColors"
						:class="[
							'theme-item',
							primaryColor === color ? 'theme-item-cur' : '',
						]"
						:key="color"
						:style="{ backgroundColor: color }"
						@click="changeTheme(color)"
					></li>
				</ul>
			</Cell>
			<Cell :title="$t('common.dark')">
				<xzy-switch
					v-model="isDark"
					@input="onChange"
					size="normal"
				></xzy-switch>
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
import { generateCssVars, isDarkMode } from "../src/utils/index";
import NavBar from "@/components/nav-bar";
import CellGroup from "@/components/cell-group";
import Cell from "@/components/cell";
import Switch from "../src/components/switch";
import { DARK_THEME, LIGHT_THEME } from "../src/assets/js/const";
export default {
	name: "Home",
	components: {
		NavBar,
		CellGroup,
		Cell,
		"xzy-switch": Switch,
	},
	created() {
		this.changeTheme(this.primaryColor);
	},
	data() {
		return {
			isDark: isDarkMode(),
			list: [
				{
					title: this.$t("common.baseComponent"),
					children: [
						{
							title: "Cell 单元格",
							to: "/cell",
						},
						{
							title: "Icon 图标",
							to: "/icon",
						},
						{
							title: "Button 按钮",
							to: "/button",
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
			primaryColors: [
				"#0060a6",
				"#1374bd",
				"#007edf",
				"#ff4444",
				"#ff8000",
				"#005924",
				"#30b768",
				"#00be9d",
			],
			primaryColor: isDarkMode() ? DARK_THEME.primary : LIGHT_THEME.primary,
		};
	},
	methods: {
		changeTheme(color) {
			this.primaryColor = color;
			generateCssVars(this.primaryColor, this.isDark);
		},
		onChange() {
			generateCssVars(this.primaryColor, this.isDark);
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

.theme {
	display: flex;
	align-items: center;
	> .theme-item {
		margin-left: $space2;
		list-style-type: none;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		&-cur {
			width: 46px;
			height: 46px;
		}
	}
}
</style>
