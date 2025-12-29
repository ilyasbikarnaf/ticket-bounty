import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  placeholder: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

export default function Placeholder({
  placeholder,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center self-center gap-y-2 ">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-center">{placeholder}</h2>
      {cloneElement(button, {
        className: "h-9",
      })}
    </div>
  );
}
