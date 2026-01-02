import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export default function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions
) {
  const prevTimestamp = useRef(0);

  useEffect(() => {
    if (prevTimestamp.current === actionState.timestamp) {
      return;
    }

    prevTimestamp.current = actionState.timestamp;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
}
