import Home from "../screens/Home";
import Login from "../screens/Login";
import Paciente from "../screens/Paciente";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: true,
  },
  {
    path: "/login",
    component: Login,
    name: "Login Screen",
    protected: false,
  },
  {
    path: "/paciente",
    component: Paciente,
    name: "Home | Paciente",
    protected: false,
  },
];

export default routes;
