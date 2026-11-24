"use client";

import { useEffect, useState } from "react";
import { DOWNLOAD_URL, DownloadButton } from "@/app/components/DownloadButton";

const SECTIONS = [
  { id: "trailer", label: "Tráiler" },
  { id: "operativo", label: "Operativo" },
  { id: "combate", label: "Combate" },
  { id: "bestiario", label: "Bestiario" },
  { id: "zonas", label: "Zonas" },
  { id: "motor", label: "Motor" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-line bg-void/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                active === s.id ? "text-amber" : "text-ash hover:text-bone"
              }`}
            >
              {s.label}
            </a>
          ))}
          <span className="ml-2">
            <DownloadButton size="sm" />
          </span>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className="ml-auto border border-line px-3 py-2 text-sm text-ash md:hidden"
        >
          {open ? "CERRAR" : "MENÚ"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-void/95 px-5 py-2 md:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3 text-sm tracking-wide uppercase text-ash last:border-0"
            >
              {s.label}
            </a>
          ))}
          <a
            href={DOWNLOAD_URL}
            className="my-3 block bg-amber py-3 text-center font-display text-lg tracking-wide text-void"
          >
            DESCARGAR JUEGO
          </a>
        </nav>
      )}
    </header>
  );
}
