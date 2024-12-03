import { ThemeSwitch } from './ThemeSwitch';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex-1" /> {/* Spacer */}
          <h1 className="text-xl font-bold text-foreground">Tool Rental</h1>
          <div className="flex-1 flex justify-end">
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
