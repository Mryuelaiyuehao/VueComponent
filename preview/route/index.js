const Home = () => import("../components/Home.vue");
// 基础组件
const Cell = () => import("../../src/components/cell/demo");
const Button = () => import("../../src/components/button/demo");
const Popup = () => import("../../src/components/popup/demo");
// 导航组件
const NavBar = () => import("../../src/components/nav-bar/demo");
// 表单组件
const Switch = () => import("../../src/components/switch/demo");
const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/cell",
        name: "cell",
        component: Cell,
      },
      {
        path: "/button",
        name: "button",
        component: Button,
      },
      {
        path: "/popup",
        name: "popup",
        component: Popup,
      },
      {
        path: "/navBar",
        name: "navBar",
        component: NavBar,
      },
      {
        path: "/switch",
        name: "switch",
        component: Switch,
      },
    ],
  },
];
export default routes;
