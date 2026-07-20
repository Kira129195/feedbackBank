import { Link, useRouterState } from "@tanstack/react-router";

export function NavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/", label: "Feedback Form" },
    { to: "/dashboard", label: "Dashboard" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-navy-deep text-cream-soft">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lemon text-navy-deep font-display text-lg font-bold">
            L
          </span>
          <span className="font-display text-lg tracking-wide">UniCredit</span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full bg-white/5 p-1 text-xs sm:text-sm">
          {tabs.map((t) => {
            const active = pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={
                  "rounded-full px-3 py-1.5 transition-colors " +
                  (active
                    ? "bg-lemon text-navy-deep font-semibold"
                    : "text-cream-soft/80 hover:text-cream-soft")
                }
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
