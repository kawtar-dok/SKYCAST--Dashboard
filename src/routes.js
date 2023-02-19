// Soft UI Dashboard React layouts clients
import Dashboard from "layouts/dashboard";
import Formation from "layouts/statistic";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import Cube from "examples/Icons/Cube";
import CustomerSupport from "examples/Icons/CustomerSupport";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

 
  {
    type: "collapse",
    name: "Historique",
    key: "statistic",
    route: "/history",
    icon: <Document size="12px" />,
    component: <Formation />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <CustomerSupport size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
