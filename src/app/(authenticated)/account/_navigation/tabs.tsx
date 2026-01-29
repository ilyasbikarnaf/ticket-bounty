"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { accountPasswordPath, accountProfilePath } from "@/app/path";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountTabs() {
  const pathname = usePathname();

  return (
    <Tabs defaultValue={pathname.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
