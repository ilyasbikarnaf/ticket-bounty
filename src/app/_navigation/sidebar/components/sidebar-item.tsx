import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { closedClassName } from "../constants";
import { NavItem } from "../types";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean;
};

export default function SidebarItem({
  isOpen,
  navItem,
  isActive,
}: SidebarItemProps) {
  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex justify-start h-12",
          isActive && "bg-muted font-bold hover:bg-muted",
        )}
      >
        {cloneElement(navItem.icon, { className: "size-5 mx-1" })}

        <span
          className={cn(
            "text-base duration-200",
            isOpen ? "md:block hidden" : "w-[78px]",
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
}
