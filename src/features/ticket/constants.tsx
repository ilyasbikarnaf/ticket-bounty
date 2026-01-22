import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

export const TICKETS_ICON = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

export const TICKETS_STATUS_LABELS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
