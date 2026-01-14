import App from "@/App";
import { LoginForm } from "@/components/modules/Authentication/LoginFrom";
import { RegisterForm } from "@/components/modules/Authentication/RegisterFrom";
import About from "@/pages/About";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "/about",
      },
    ],
  },
  {
    Component: LoginForm,
    path: "/login"

  },
  {
    Component: RegisterForm,
    path: "/register"
  },
  {
    Component: Verify,
    path: "/verify"
  }
]);
