export const DOWNLOAD_URL =
  "https://github.com/deeividv/Urban-Strike-Web/releases/latest/download/UrbanStrike.exe";

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="M6 10l6 6 6-6" />
      <path d="M4 20h16" />
    </svg>
  );
}

/** Botón principal de descarga del juego (Windows, .exe desde GitHub Releases). */
export function DownloadButton({ size = "lg" }: { size?: "lg" | "sm" }) {
  if (size === "sm") {
    return (
      <a
        href={DOWNLOAD_URL}
        className="download-btn clip-corner inline-flex items-center gap-2 bg-amber px-4 py-2 font-display text-base tracking-wide text-void transition-colors hover:bg-amber-soft"
      >
        <DownloadIcon className="size-4" />
        DESCARGAR
      </a>
    );
  }

  return (
    <span className="download-glow inline-block">
    <a
      href={DOWNLOAD_URL}
      className="download-btn clip-corner group inline-flex items-center gap-4 bg-amber py-3 pr-8 pl-5 text-void transition-colors hover:bg-amber-soft"
    >
      <span className="grid size-11 shrink-0 place-items-center bg-void/90 text-amber transition-transform group-hover:translate-y-0.5">
        <DownloadIcon className="size-6" />
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="font-display text-2xl tracking-wide">DESCARGAR JUEGO</span>
        <span className="mt-1.5 text-[0.65rem] font-bold tracking-[0.2em] uppercase text-void/70">
          Windows · .exe · Gratis
        </span>
      </span>
    </a>
    </span>
  );
}
