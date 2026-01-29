import { notFound } from "next/navigation";
import { ticketPath, ticketsPath } from "@/app/path";
import { Breadcrumbs } from "@/components/breadcrumbs";
import CardCompact from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

export default async function TicketEditPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { user } = await getAuth();
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: ticketsPath() },
          { title: "Ticket", href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />
      <Separator />
      <div className="flex flex-col justify-center items-center flex-1">
        <CardCompact
          title="Edit Ticket"
          description="edit an existing ticket"
          content={<TicketUpsertForm ticket={ticket} />}
          className="w-full max-w-[420px] animate-fade-in-from-top"
        />
      </div>
    </div>
  );
}
