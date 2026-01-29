import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import { accountProfilePath, homePath, ticketsPath } from "@/app/path";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    href: homePath(),
    icon: <LucideLibrary />,
  },
  {
    title: "My Tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
  },

  {
    title: "Account",
    href: accountProfilePath(),
    icon: <LucideCircleUser />,
    separator: true,
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
