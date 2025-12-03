import { initialTickets } from "@/data";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === +ticketId);

  return <h2 className="text-lg">Ticket Page ({ticket?.title})</h2>;
}
