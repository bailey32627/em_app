import { ReactElement } from "react";

import * as AiIcons from "react-icons/ai";

// Define the shape of a sidebar item
export interface LinkItem {
  title: string;
  path: string;
  icon: ReactElement;
  color?: string;
}

// Home Page Links ------------------------------------
export const HomePageLinks: LinkItem[] = [
  {
    title: "Login",
    path: "/login",
    icon: <AiIcons.AiFillCaretRight />,
  },
  {
    title: "Sign Up",
    path: "/register",
    icon: <AiIcons.AiFillCaretRight />,
  },
];

// Registeration page links ---------------------------
export const RegisterPageLinks: LinkItem[] = [
  {
    title: "Login",
    path: "/login",
    icon: <AiIcons.AiFillCaretRight />,
  },
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
];

// Log in page links ------------------------------------
export const LoginPageLinks: LinkItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Sign Up",
    path: "/register",
    icon: <AiIcons.AiFillCaretUp />,
  },
];

// dashboard Page links ----------------------------------
export const DashboardPageLinks: LinkItem[] = [
  {
    title: "HVA",
    path: "/hva",
    icon: <AiIcons.AiFillAlert />
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <AiIcons.AiFillProfile />
  },
];

// Profile Page Links ------------------------------------
export const ProfilepageLinks: LinkItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiOutlinePartition/>
  },
  {
    title: "HVA",
    path: "/hva",
    icon: <AiIcons.AiFillAlert />
  },
];

// HVA page links ----------------------------------------

// Analysis page Links -----------------------------------

// Incident page links -----------------------------------

// training page links -----------------------------------

export const NonUserLinks: LinkItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },

];

export const UserLinks: LinkItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillDashboard />
  },
];
