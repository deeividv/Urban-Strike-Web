import Image from "next/image";
import type { CSSProperties } from "react";
import { DownloadButton } from "@/app/components/DownloadButton";
import { Sprite } from "@/app/components/Sprite";
import { SPEC, SPRITES } from "@/app/lib/data";
import logo from "@/public/logo.png";

const SKY = [
  { src: "/bg/night-1.png", duration: "220s", opacity: 0.9 },
  { src: "/bg/night-2.png", duration: "150s", opacity: 0.85 },
  { src: "/bg/night-3.png", duration: "95s", opacity: 0.9 },
  { src: "/bg/night-4.png", duration: "62s", opacity: 0.95 },
  { src: "/bg/night-5.png", duration: "38s", opacity: 1 },
];

export function Hero() {
  return (
    <section
      id="top"
      className="scanlines relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24"
    >
      <div className="absolute inset-0" aria-hidden>
        {SKY.map((layer) => (
          <div
            key={layer.src}
            className="sky-layer"
            style={
              {
                backgroundImage: `url(${layer.src})`,
                opacity: layer.opacity,
                "--tile-w": "1152px",
                "--sky-duration": layer.duration,
              } as CSSProperties
            }
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-void/95 via-void/30 to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_25%,rgba(5,7,11,0.75)_90%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <p className="mb-4 inline-flex items-center gap-2 border border-amber/40 bg-void/70 px-3 py-1 text-xs font-semibold tracking-[0.25em] uppercase text-amber">
          <span className="size-1.5 bg-blood alert-pulse" />
          Operación en curso
        </p>

        <h1>
          <span className="sr-only">Urban Strike: SWAT Ops</span>
          <Image
            src={logo}
            alt="Urban Strike: SWAT Ops"
            preload
            sizes="(max-width: 640px) 70vw, 420px"
            className="h-auto w-full max-w-[14rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] sm:max-w-[18rem] lg:max-w-[23rem]"
          />
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl">
          Un operativo de las fuerzas especiales avanza en solitario por{" "}
          <strong className="font-semibold text-bone">tres zonas urbanas e industriales</strong>{" "}
          infestadas de pandilleros, sobrevive a oleadas continuas y derriba a un jefe blindado al
          final de cada nivel.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <DownloadButton />
          <a
            href="#bestiario"
            className="clip-corner border border-line bg-panel/80 px-7 py-3.5 font-display text-xl tracking-wide text-bone transition-colors hover:border-amber/60 hover:text-amber"
          >
            VER EL BESTIARIO
          </a>
          <a
            href="#combate"
            className="clip-corner border border-line bg-panel/80 px-7 py-3.5 font-display text-xl tracking-wide text-bone transition-colors hover:border-amber/60 hover:text-amber"
          >
            CÓMO SE JUEGA
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {SPEC.map((item) => (
            <div key={item.label} className="bg-panel/90 px-4 py-3 backdrop-blur-sm">
              <dt className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-ash">
                {item.label}
              </dt>
              <dd className="mt-1 font-display text-lg leading-none text-bone">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Línea de suelo con los sprites reales del juego */}
      <div className="relative mt-14 h-32 sm:h-40">
        <div className="absolute inset-x-0 bottom-0 h-16 border-t border-line/80 bg-gradient-to-b from-panel-2/60 to-void" />
        <div className="absolute inset-x-0 bottom-16 h-px bg-amber/25" />

        <div className="relative mx-auto flex h-full max-w-6xl items-end justify-between px-5 pb-14">
          <Sprite
            sheet={SPRITES.swatRun}
            label="El operativo SWAT corriendo"
            scale={1.7}
            className="drop-shadow-[0_0_18px_rgba(245,165,36,0.25)]"
          />
          <Sprite
            sheet={SPRITES.gangsterShot}
            label="Un gangster disparando"
            scale={1.35}
            flip
            className="-mb-6 hidden opacity-90 sm:block"
          />
        </div>
      </div>
    </section>
  );
}
