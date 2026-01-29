"use client";

import { cloneElement, useActionState, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Form from "./form/form";
import SubmitButton from "./form/submit-button";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/to-action-state";

type useConfirmDialogProps = {
  title?: string;
  description?: string;
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  action: () => Promise<ActionState>;
};

export default function useConfirmDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you undersetand the consequences.",
  trigger,
  action,
}: useConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteButton = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const handleSuccess = () => setIsOpen(false);

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const deleteDialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              formAction={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [deleteButton, deleteDialog];
}
