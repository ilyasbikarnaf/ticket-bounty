import clsx from "clsx";
import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "../path";

export default function TicketsPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm text-muted-foreground">
          All your tickets at one place
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-y-4 fade-in-from-top">
        {initialTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full max-w-[420px] border border-slate-100 p-4 rounded"
          >
            <h3 className="text-lg truncate font-semibold ">{ticket.title}</h3>
            <p
              className={clsx("text-sm truncate text-slate-500 ", {
                "line-through": ticket.status === "DONE",
              })}
            >
              {ticket.content}
            </p>

            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
