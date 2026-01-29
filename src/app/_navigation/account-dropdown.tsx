import { User as AuthUser } from "lucia";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import { accountPasswordPath, accountProfilePath } from "@/app/path";
import { signOut } from "@/features/auth/actions/sign-out";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

type AccountDropdownProps = {
  user: AuthUser;
};

export default function AccountDropdown({ user }: AccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuGroup> */}
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accountProfilePath()}>
            <LucideUser className="size-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath()}>
            <LucideLock className="size-4" />
            <span>Password</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut}>
            <LucideLogOut className="size-4" />
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
