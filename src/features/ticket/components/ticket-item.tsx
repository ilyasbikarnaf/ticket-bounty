import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { ticketEditPath, ticketPath } from "@/app/path";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Prisma } from "@/generated/prisma/client";
import { toCurrencyFromCent } from "@/utils/currency";
import { formatDeadline } from "@/utils/deadline";
import { TICKETS_ICON } from "../constants";
import TicketMoreMenu from "./ticket-more-menu";

type TicketItemProps = {
  // ticket: Ticket & { user: User };
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
          id: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
};

export default async function TicketItem({
  ticket,
  isDetail,
}: TicketItemProps) {
  const { user } = await getAuth();
  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner && (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

  const moreMenu = isTicketOwner && (
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
            {formatDeadline(ticket.deadline)} by {ticket.user.username}
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
