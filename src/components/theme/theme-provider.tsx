import { ThemeProvider as BaseThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider defaultTheme="system" attribute="class" enableSystem>
      {children}
    </BaseThemeProvider>
  );
}
