import { User as AuthUser } from "lucia";
import { Ticket } from "@/generated/prisma/client";

type Entity = {
  userId: string | null;
};

export const isOwner = (
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined,
) => {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (authUser.id === entity.userId) {
    return true;
  }

  return false;
};
