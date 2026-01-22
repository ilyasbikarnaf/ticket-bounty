"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookie";
import { ticketsPath } from "@/app/path";
import prisma from "@/lib/prisma";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(ticketsPath());
  await setCookieByKey("toast", "Ticket deleted");

  redirect(ticketsPath());
};
