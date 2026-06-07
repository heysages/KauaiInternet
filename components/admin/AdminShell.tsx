"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/analytics", label: "Traffic" },
  { href: "/admin/submissions", label: "Interest" },
  { href: "/admin/inbox", label: "Email Inbox" },
  { href: "/admin/reports", label: "Reports" },
];

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ocean-deep text-mist">
      <header className="border-b border-white/10 bg-ocean-deep/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-amber-glow font-semibold">
              Kauai Internet Admin
            </p>
            <h1 className="heading-display text-lg font-semibold text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs text-mist hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-xs font-medium text-mist hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-5 pb-3 flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-amber-emergency/20 text-amber-glow"
                  : "text-mist hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
    </div>
  );
}
