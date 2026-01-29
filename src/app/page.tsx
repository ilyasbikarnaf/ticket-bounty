import Link from "next/link";
import { Suspense } from "react";
import Heading from "@/components/Heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ticketsPath } from "./path";

export default async function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8 ">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
