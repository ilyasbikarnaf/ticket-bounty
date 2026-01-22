import { format } from "date-fns";

export const formatDeadline = (date: string | Date | undefined) => {
  if (!date) return "";
  return format(date, "yyyy-LL-dd");
};
