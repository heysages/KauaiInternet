"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type HashLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

/** In-page anchor that still scrolls when Next.js would ignore a same-page hash. */
export default function HashLink({ href, className, children, onClick }: HashLinkProps) {
  const pathname = usePathname();
  const hashIndex = href.indexOf("#");
  const id = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
  const path = href.startsWith("#") ? "/" : hashIndex > 0 ? href.slice(0, hashIndex) : href;
  const resolved = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (id && pathname === path) {
      const slot = document.documentElement.classList.contains("reading-plain")
        ? ".reading-slot-plain"
        : ".reading-slot-technical";
      const target =
        document.querySelector<HTMLElement>(`${slot} #${CSS.escape(id)}`) ??
        document.getElementById(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${id}`);
      }
    }
    onClick?.();
  };

  return (
    <a href={resolved} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
