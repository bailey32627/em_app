import { ReactElement } from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

// Define the shape of a sidebar item
export interface LinkItem {
  title: string;
  path: string;
  icon: ReactElement;
}

export const NonUserLinks: LinkItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Login",
    path: "/login",
    icon: <FaIcons.FaChevronRight />,
  },
  {
    title: "Sign Up",
    path: "/register",
    icon: <FaIcons.FaChevronUp />,

  }
];

export const UserLinks: LinkItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillDashboard />
  }
];
