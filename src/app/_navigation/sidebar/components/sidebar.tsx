"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signinPath, signupPath } from "@/app/path";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import getActivePath from "@/utils/get-active-path";
import { navItems } from "../constants";
import SidebarItem from "./sidebar-item";

export default function Sidebar() {
  const { isFetched, user } = useAuth();
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const { activeIndex } = getActivePath(
    pathname,
    navItems.map((navItem) => navItem.href),
    [signinPath(), signupPath()],
  );

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };

  if (!user || !isFetched) {
    return <div className="w-[78px] bg-secondary/20"></div>;
  }

  return (
    <nav
      className={cn(
        "border-r h-screen pt-20 animate-sidebar-from-left overflow-hidden",
        isTransition && "duration-200",
        isOpen ? "w-[78px] md:w-60" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.href}
              isOpen={isOpen}
              navItem={navItem}
              isActive={index === activeIndex}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
