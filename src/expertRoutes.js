// Soft UI Dashboard React layouts experts
import ExpertDashboard from "layouts/expert/expertDashboard";
import ExpertFormation from "layouts/expert/formation";
import ExpertWorkshop from "layouts/expert/workshop";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Cube from "examples/Icons/Cube";

const expertRoutes = [
  
  //Expert Dashboard*
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/expertDashboard",
    icon: <Shop size="12px" />,
    component: <ExpertDashboard />,
    noCollapse: true,
  },
  


  {
    type: "collapse",
    name: "Formation",
    key: "formation",
    route: "/expertFormation",
    icon: <Office size="12px" />,
    component: <ExpertFormation />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Workshop",
    key: "workshop",
    route: "/expertWorkshop",
    icon: <Office size="12px" />,
    component: <ExpertWorkshop />,
    noCollapse: true,
  },


  
  { type: "title", title: "Account Pages", key: "account-pages" },
 
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/Authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/Authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },

];

export default expertRoutes;
