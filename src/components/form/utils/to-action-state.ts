import z, { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: Record<string, string[]> | undefined;
  timestamp: number;
  payload?: FormData;
};

export const EMPTY_ACTION_STATE: ActionState = {
  fieldErrors: {},
  message: "",
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  if (error instanceof ZodError) {
    console.log(`fieldErrors: `, z.flattenError(error).fieldErrors);

    return {
      message: "",
      payload: formData,
      fieldErrors: z.flattenError(error).fieldErrors,
      status: "ERROR",
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
      fieldErrors: {},
      status: "ERROR",
      timestamp: Date.now(),
    };
  } else {
    return {
      message: "An unknown error occured",
      payload: formData,
      fieldErrors: {},
      status: "ERROR",
      timestamp: Date.now(),
    };
  }
};

export const ToActionState = (
  status: ActionState["status"],
  message: string
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
