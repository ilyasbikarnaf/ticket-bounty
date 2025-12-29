"use client";
import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size={"icon"}
      className="relative"
    >
      <LucideSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0 dark:rotate-90" />
      <LucideMoon className="h-4 w-4 absolute rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />

      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
