"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { searchParser } from "@/features/ticket/search-params";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 100);

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.currentTarget.value)}
      defaultValue={search}
    />
  );
}
