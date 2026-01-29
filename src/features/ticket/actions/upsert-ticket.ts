"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookie";
import { signinPath, ticketPath, ticketsPath } from "@/app/path";
import {
  ActionState,
  fromErrorToActionState,
  ToActionState,
} from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/actions/get-auth";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  bounty: z.coerce.number().positive(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
});

export const upsertTicket = async (
  id: string | undefined,
  _previousState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });

      if (!ticket || !isOwner(user, ticket)) {
        return ToActionState("ERROR", "Not authorized");
      }
    }

    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      bounty: formData.get("bounty"),
      deadline: formData.get("deadline"),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
      userId: user.id,
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    await setCookieByKey("toast", "Ticket updated");
    redirect(ticketPath(id));
  }

  return ToActionState("SUCCESS", "Ticket created");
};
