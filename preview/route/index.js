import Home from "../Home.vue";
import Cell from "@/components/cell";
import NavBar from "@/components/nav-bar/demo";
const routes = [
	{
		path: "/",
		component: Home,
		meta: "泽跃的组件库",
	},
	{
		path: "/cell",
		name: "cell",
		component: Cell,
		meta: "单元格",
	},
	{
		path: "/navBar",
		name: "navBar",
		component: NavBar,
		meta: "导航栏",
	},
];
export default routes;

