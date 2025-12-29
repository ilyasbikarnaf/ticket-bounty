import { LucideLoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex-1 self-center flex justify-center items-center ">
      <LucideLoaderCircle className="size-16 animate-spin" />
    </div>
  );
}
