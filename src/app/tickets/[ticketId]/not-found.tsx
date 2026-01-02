import Link from "next/link";
import { ticketsPath } from "@/app/path";
import Placeholder from "@/components/Placeholder";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Placeholder
      placeholder="We could not find your ticket"
      button={
        <Button variant={"outline"} asChild>
          <Link href={ticketsPath()}>Go Back To Tickets</Link>
        </Button>
      }
    />
  );
}
