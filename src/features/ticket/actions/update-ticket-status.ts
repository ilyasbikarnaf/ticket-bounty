"use server";

import { revalidatePath } from "next/cache";
import { ticketsPath } from "@/app/path";
import {
  fromErrorToActionState,
  ToActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export default async function updateTicketStatus(
  ticketId: string,
  ticketStatus: TicketStatus,
) {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket || !isOwner(user, ticket)) {
      return ToActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: ticketStatus,
      },
    });
  } catch (err) {
    fromErrorToActionState(err);
  }

  revalidatePath(ticketsPath());

  return ToActionState("SUCCESS", "Status updated");
}
