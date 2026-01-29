import { Suspense } from "react";
import CardCompact from "@/components/card-compact";
import Heading from "@/components/Heading";
import Spinner from "@/components/spinner";
import { getAuth } from "@/features/auth/actions/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";

export default async function TicketsPage() {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} />
      </Suspense>
    </div>
  );
}
