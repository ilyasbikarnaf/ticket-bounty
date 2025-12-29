import clsx from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { ticketPath } from "@/app/path";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKETS_ICON } from "../constants";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx(
        "flex gap-x-1 w-full",
        isDetail ? "max-w-[580px]" : "max-w-[420px]"
      )}
    >
      <Card className="w-full gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKETS_ICON[ticket.status]}</span>
            <h3 className="text-2xl">{ticket.title}</h3>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p
            className={clsx(
              "whitespace-break-spaces",
              !isDetail && "line-clamp-3"
            )}
          >
            {ticket.content}
          </p>
        </CardContent>
      </Card>

      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  );
}
