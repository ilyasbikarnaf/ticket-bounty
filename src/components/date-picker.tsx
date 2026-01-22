"use client";

import { LucideChevronDown } from "lucide-react";
import { useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDeadline } from "@/utils/deadline";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandlerRef?: React.RefObject<{ reset: () => void } | null>;
};

export default function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandlerRef,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const formattedDateString = date ? formatDeadline(date) : "Select date";

  useImperativeHandle(imperativeHandlerRef, () => {
    return {
      reset: () => {
        setDate(new Date());
      },
    };
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} name={name} asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
        >
          {formattedDateString}
          <LucideChevronDown />
          <input type="hidden" name={name} value={formattedDateString} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
