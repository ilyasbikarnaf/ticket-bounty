import Link from "next/link";
import CardCompact from "@/components/card-compact";
import SignInForm from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signinPath, signupPath } from "../path";

export default function SignIn() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        className="w-full max-w-[420px] animate-fade-in-from-top"
        footer={
          <>
            <Link href={signupPath()}>No account yet?</Link>
            <Link href={passwordForgotPath()}>Forgot Password?</Link>
          </>
        }
      />
    </div>
  );
}
