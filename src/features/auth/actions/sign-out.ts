"use server";

import { redirect } from "next/navigation";
import { signinPath } from "@/app/path";
import { logout } from "@/lib/auth";

export const signOut = async () => {
  await logout();

  redirect(signinPath());
};
