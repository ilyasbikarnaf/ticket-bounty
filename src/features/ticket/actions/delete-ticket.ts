"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookie";
import { ticketsPath } from "@/app/path";
import {
  fromErrorToActionState,
  ToActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });

      if (!ticket || !isOwner(user, ticket)) {
        return ToActionState("ERROR", "Not authorized");
      }
    }
    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    return fromErrorToActionState(err);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");

  redirect(ticketsPath());
};
