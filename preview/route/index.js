import Home from "../Home.vue";
import Cell from "../../src/components/cell/demo";
import NavBar from "../../src/components/nav-bar/demo";
import Button from "../../src/components/button/demo";

const routes = [
	{
		path: "/",
		component: Home,
		meta: "泽跃的组件库",
		children: [
			{
				path: "/cell",
				name: "cell",
				component: Cell,
				meta: "Cell 单元格",
			},
			{
				path: "/navBar",
				name: "navBar",
				component: NavBar,
				meta: "NavBar 导航栏",
			},
			{
				path: "/button",
				name: "button",
				component: Button,
				meta: "Button 按钮",
			},
		],
	},
];
export default routes;

