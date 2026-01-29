"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { homePath, signinPath, signupPath } from "@/app/path";
import ThemeSwitch from "@/components/theme/theme-switcher";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { buttonVariants } from "../../components/ui/button";
import AccountDropdown from "./account-dropdown";

export default function Header() {
  const { isFetched, user } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = (
    <>
      {!user ? (
        <>
          <Link
            href={signupPath()}
            className={buttonVariants({ variant: "outline" })}
          >
            Sign Up
          </Link>
          <Link
            href={signinPath()}
            className={buttonVariants({ variant: "default" })}
          >
            Sign In
          </Link>
        </>
      ) : (
        <AccountDropdown user={user} />
      )}
    </>
  );

  return (
    <nav className="animate-header-from-top flex items-center justify-between py-2.5 px-5 border-b bg-background/60 w-full fixed left-0 top-0 right-0 z-20 backdrop-blur-xs">
      <div className="">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="font-semibold text-lg ml-1">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex gap-x-2 items-center">
        <ThemeSwitch />
        {navItems}
      </div>
    </nav>
  );
}
