import { redirect } from "next/navigation";
import { signinPath } from "@/app/path";
import { getAuth } from "../actions/get-auth";

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();
  if (!auth.user) {
    redirect(signinPath());
  }

  return auth;
};
