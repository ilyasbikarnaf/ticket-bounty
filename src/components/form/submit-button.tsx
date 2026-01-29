"use client";
import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export default function SubmitButton({
  label,
  icon,
  size,
  variant,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {pending && <LucideLoaderCircle className="mr-1 h-4 w-4 animate-spin" />}
      {label}
      {pending ? null : icon}
    </Button>
  );
}
