import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { homePath, ticketsPath } from "@/app/path";
import ThemeSwitch from "@/components/theme/theme-switcher";
import { buttonVariants } from "./ui/button";

export default function Header() {
  return (
    <nav className="flex items-center justify-between py-2.5 px-5 border-b bg-background/60 w-full fixed left-0 top-0 right-0 z-20 backdrop-blur-xs">
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
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}
