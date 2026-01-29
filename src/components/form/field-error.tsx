import { ActionState } from "./utils/to-action-state";

type ErrorFieldProps = {
  actionState: ActionState;
  name: string;
};

export default function FieldError({ actionState, name }: ErrorFieldProps) {
  const message = actionState.fieldErrors?.[name]?.[0];

  if (!message) {
    return null;
  }

  return <span className="text-xs text-red-500">{message}</span>;
}
