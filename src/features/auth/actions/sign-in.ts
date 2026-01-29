"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { ticketsPath } from "@/app/path";
import {
  ActionState,
  fromErrorToActionState,
  ToActionState,
} from "@/components/form/utils/to-action-state";
import { authenticateUser, setSession } from "@/lib/auth";

const signInSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .min(1, { error: "Is required" })
    .max(191),
  password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await authenticateUser({ email, password });

    if (!user) {
      return ToActionState("ERROR", "Incorrect email or password", formData);
    }

    await setSession(user.id);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
