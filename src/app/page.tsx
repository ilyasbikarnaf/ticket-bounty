import { Suspense } from "react";
import Heading from "@/components/Heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import {
  ParsedSearchParams,
  searchParamsCache,
} from "@/features/ticket/search-params";

type HomePageProps = {
  searchParams: Promise<ParsedSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const searchParamsAwaited = searchParamsCache.parse(await searchParams);

  return (
    <div className="flex-1 flex flex-col gap-y-8 ">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={searchParamsAwaited} />
      </Suspense>
    </div>
  );
}
