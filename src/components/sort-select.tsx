"use client";

import { useQueryStates } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions, sortParser } from "@/features/ticket/search-params";

type Option = {
  label: string;
  sortKey: string;
  sortValue: string;
};

type sortSelectProps = {
  options: Option[];
};

export default function SortSelect({ options }: sortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      defaultValue={`${sort.sortKey}_${sort.sortValue}`}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={`${option.sortKey}_${option.sortValue}`}
            value={`${option.sortKey}_${option.sortValue}`}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
