"use server";

import { revalidatePath } from "next/cache";
import { ticketsPath } from "@/app/path";
import {
  fromErrorToActionState,
  ToActionState,
} from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export default async function updateTicketStatus(
  ticketId: string,
  ticketStatus: TicketStatus,
) {
  try {
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
