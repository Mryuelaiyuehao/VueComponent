const Home = () => import("../components/Home.vue");
const Cell = () => import("../../src/components/cell/demo");
const NavBar = () => import("../../src/components/nav-bar/demo");
const Button = () => import("../../src/components/button/demo");
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
        path: "/navBar",
        name: "navBar",
        component: NavBar,
      },
      {
        path: "/button",
        name: "button",
        component: Button,
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
