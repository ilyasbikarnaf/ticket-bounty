import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { ticketEditPath, ticketPath } from "@/app/path";
import ConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/generated/prisma/client";
import { toCurrencyFromCent } from "@/utils/currency";
import { formatDeadline } from "@/utils/deadline";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKETS_ICON } from "../constants";
import TicketMoreMenu from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

  // const deleteButton = (
  //   <form action={deleteTicket.bind(null, ticket.id)}>
  //     <Button variant="outline" size="icon">
  //       <LucideTrash className="h-4 w-4" />
  //     </Button>
  //   </form>
  // );

  const deleteButton = (
    <ConfirmDialog
      trigger={
        <Button variant="outline" size="icon">
          <LucideTrash className="h-4 w-4" />
        </Button>
      }
      action={deleteTicket.bind(null, ticket.id)}
    />
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx(
        "flex gap-x-1 w-full",
        isDetail ? "max-w-[580px]" : "max-w-[420px]",
      )}
    >
      <Card className="w-full gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2 ">
            <span>{TICKETS_ICON[ticket.status]}</span>
            <h3 className={clsx("text-2xl", !isDetail && "line-clamp-1")}>
              {ticket.title}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="mb-3">
          <p
            className={clsx(
              "whitespace-break-spaces",
              !isDetail && "line-clamp-3",
            )}
          >
            {ticket.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {formatDeadline(ticket.deadline)}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}$
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
