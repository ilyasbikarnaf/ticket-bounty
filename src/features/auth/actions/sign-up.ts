"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { ticketsPath } from "@/app/path";
import {
  ActionState,
  fromErrorToActionState,
  ToActionState,
} from "@/components/form/utils/to-action-state";
import { Prisma } from "@/generated/prisma/client";
import { registerUser, setSession } from "@/lib/auth";

const signUpSchema = z
  .object({
    username: z.string().refine((val) => !val.includes(" "), {
      error: "Username cannot contains spaces",
    }),
    email: z
      .email({ error: "Invalid email address" })
      .min(1, { error: "Is required" })
      .max(191),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password, username } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await registerUser({ email, password, username });

    await setSession(user.id);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return ToActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }

    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
