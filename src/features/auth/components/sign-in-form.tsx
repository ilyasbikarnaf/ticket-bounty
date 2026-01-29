"use client";

import { useActionState } from "react";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";

export default function SignInForm() {
  const [actionState, formAction] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form actionState={actionState} formAction={formAction}>
      <Input
        placeholder="email"
        name="email"
        type="email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />
      <Input
        placeholder="password"
        name="password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <SubmitButton label="Sign In" />
    </Form>
  );
}
