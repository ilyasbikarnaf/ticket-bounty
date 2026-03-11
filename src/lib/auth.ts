import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { getAuth } from "@/features/auth/actions/get-auth";
import { lucia } from "@/lib/lucia";
import prisma from "./prisma";

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async ({
  email,
  username,
  password,
}: RegisterData) => {
  const passwordHash = await hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      username,
    },
  });

  return user;
};

type AuthenticateUserData = {
  email: string;
  password: string;
};

export const authenticateUser = async ({
  email,
  password,
}: AuthenticateUserData) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const validPassword = await verify(user.passwordHash, password);

  if (!validPassword) {
    return null;
  }
  return user;
};

export const logout = async () => {
  const { session } = await getAuth();

  if (!session) {
    return false;
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return true;
};

export const setSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
