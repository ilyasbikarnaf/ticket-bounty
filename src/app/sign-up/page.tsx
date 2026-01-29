import Link from "next/link";
import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { signinPath } from "../path";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        content={<SignUpForm />}
        footer={<Link href={signinPath()}>Have an account? Sign In now.</Link>}
        className="w-full max-w-[420px] animate-fade-in-from-top"
      />
    </div>
  );
}
