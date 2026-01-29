import { notFound } from "next/navigation";
import { ticketsPath } from "@/app/path";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: ticketsPath() },
          { title: "Ticket" },
        ]}
      />
      <Separator />

      <div className="w-full flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
}
