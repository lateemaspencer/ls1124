'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
