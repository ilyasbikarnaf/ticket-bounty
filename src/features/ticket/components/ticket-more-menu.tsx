"use client";

import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/generated/prisma/client";
import { deleteTicket } from "../actions/delete-ticket";
import updateTicketStatus from "../actions/update-ticket-status";
import { TICKETS_STATUS_LABELS } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export default function TicketMoreMenu({
  ticket,
  trigger,
}: TicketMoreMenuProps) {
  const deleteButton = (
    <DropdownMenuItem onClick={async () => await deleteTicket(ticket.id)}>
      <LucideTrash className="w-4" /> Delete
    </DropdownMenuItem>
  );

  const handleUpdateTicketStatus = async (value: string) => {
    if (ticket.status === value) {
      return;
    }

    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, { loading: "Updating status..." });

    const result = await promise;

    if (result.status === "ERROR") {
      return toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKETS_STATUS_LABELS) as Array<TicketStatus>).map(
        (label) => (
          <DropdownMenuRadioItem key={label} value={label}>
            {TICKETS_STATUS_LABELS[label]}
          </DropdownMenuRadioItem>
        ),
      )}
    </DropdownMenuRadioGroup>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start" side="right">
        <DropdownMenuGroup>{ticketStatusRadioGroupItems}</DropdownMenuGroup>
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
