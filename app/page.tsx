import type { ReactNode } from "react";
import { Bestiary } from "@/app/components/Bestiary";
import { DownloadButton } from "@/app/components/DownloadButton";
import { Hero } from "@/app/components/Hero";
import { Nav } from "@/app/components/Nav";
import { Sprite } from "@/app/components/Sprite";
import {
  CONTROLS,
  DAMAGE_TABLE,
  LEVELS,
  LOOP_STEPS,
  PILLARS,
  PLAYER_STATS,
  SPRITES,
  TECH_NOTES,
} from "@/app/lib/data";

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase text-amber">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl leading-[1.08] text-bone sm:text-5xl">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl leading-relaxed text-ash">{lead}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

/** Reconstrucción en CSS del HUD: vida de 10 puntos y cargador de 21 balas. */
function HudMock() {
  return (
    <div className="border border-line bg-panel-2/60 p-5">
      <div className="flex items-center gap-3">
        <span className="w-16 shrink-0 text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
          Vida
        </span>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`h-4 flex-1 ${i < 7 ? "bg-blood" : "border border-blood/30 bg-blood/10"}`}
            />
          ))}
        </div>
        <span className="w-10 shrink-0 text-right font-display text-base text-bone">7/10</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="w-16 shrink-0 text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
          Munición
        </span>
        <div className="flex flex-1 gap-[2px]">
          {Array.from({ length: 21 }, (_, i) => (
            <span
              key={i}
              className={`h-4 flex-1 ${i < 14 ? "bg-amber" : "border border-amber/25 bg-amber/10"}`}
            />
          ))}
        </div>
        <span className="w-10 shrink-0 text-right font-display text-base text-bone">14/21</span>
      </div>

      <div className="mt-5 inline-block rounded-lg border-[3px] border-amber bg-[rgba(20,20,33,0.84)] px-4 py-2">
        <span className="font-display text-base tracking-wide text-amber-soft text-outline">
          OLEADA 2/3 · 3 RESTANTES
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        {/* ---------------- OPERATIVO ---------------- */}
        <Section
          id="operativo"
          eyebrow="El personaje jugador"
          title="Diez puntos de vida. Veintiuna balas."
          lead="No hay regeneración, ni doble salto, ni recarga automática. El operativo es frágil a propósito: los jefes finales golpean por 8 de los 10 puntos de vida que tienes."
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-5">
                {PLAYER_STATS.map((s) => (
                  <div key={s.label} className="bg-panel px-4 py-4">
                    <dt className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl leading-none text-bone">
                      {s.value}
                      <span className="ml-1 text-xs font-normal tracking-wide text-ash">
                        {s.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-12 font-display text-2xl text-bone">Controles</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {CONTROLS.map((c) => (
                  <li
                    key={c.key}
                    className="flex items-center gap-3 border border-line bg-panel px-3 py-2.5"
                  >
                    <kbd
                      className={`grid h-9 shrink-0 place-items-center border-b-2 border-line bg-panel-2 px-3 font-display text-sm tracking-wide text-amber ${
                        c.wide ? "min-w-24" : "min-w-9"
                      }`}
                    >
                      {c.key}
                    </kbd>
                    <span className="text-sm text-ash">{c.action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-center gap-2 overflow-hidden border border-line bg-panel-2/60 p-6 grid-tactical">
                <Sprite sheet={SPRITES.swatIdle} label="SWAT en reposo" scale={1.3} />
                <Sprite sheet={SPRITES.swatShot} label="SWAT disparando" scale={1.3} />
              </div>
              <HudMock />
              <p className="text-sm leading-relaxed text-ash">
                Las acciones se evalúan en orden estricto cada frame: muerte, knockback, movimiento,
                patada, recarga, disparo y disparo agachado. La primera que se cumple descarta el
                resto.
              </p>
            </div>
          </div>
        </Section>

        {/* ---------------- COMBATE ---------------- */}
        <Section
          id="combate"
          eyebrow="Bucle de juego"
          title="Veintiuna bajas para invocar al jefe"
          lead="Los enemigos reaparecen sin descanso mientras acumulas bajas. Tres oleadas de cinco enemigos separan la calma del enfrentamiento final."
        >
          <ol className="relative border-l border-line pl-6 sm:pl-8">
            {LOOP_STEPS.map((step) => (
              <li key={step.phase} className="relative pb-10 last:pb-0">
                <span
                  className={`absolute -left-[1.85rem] top-1.5 size-3 border-2 sm:-left-[2.35rem] ${
                    step.tone === "blood"
                      ? "border-blood bg-blood alert-pulse"
                      : step.tone === "amber"
                        ? "border-amber bg-amber"
                        : "border-ash bg-void"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`font-display text-sm tracking-[0.18em] ${
                      step.tone === "blood"
                        ? "text-blood"
                        : step.tone === "amber"
                          ? "text-amber"
                          : "text-ash"
                    }`}
                  >
                    {step.phase}
                  </span>
                  <span className="rounded border border-amber/40 bg-void px-2 py-0.5 font-display text-[0.7rem] tracking-wide text-amber-soft">
                    {step.hud}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight text-bone">{step.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ash">{step.detail}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-display text-2xl text-bone">Pilares de diseño</h3>
          <div className="mt-5 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.n} className="bg-panel p-6">
                <span className="font-display text-3xl leading-none text-line">{p.n}</span>
                <h4 className="mt-3 font-display text-xl leading-tight text-amber">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ash">{p.body}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-16 font-display text-2xl text-bone">Todo lo que puede matarte</h3>
          <div className="mt-5 overflow-x-auto border border-line">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="bg-panel-2 text-left">
                  <th className="px-4 py-3 text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
                    Fuente
                  </th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
                    Daño
                  </th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
                    Nota
                  </th>
                  <th className="w-40 px-4 py-3 text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
                    Sobre 10 PV
                  </th>
                </tr>
              </thead>
              <tbody>
                {DAMAGE_TABLE.map((row) => (
                  <tr key={row.source} className="border-t border-line bg-panel">
                    <td className="px-4 py-3 text-bone">{row.source}</td>
                    <td className="px-4 py-3 font-display text-lg text-amber">{row.dmg}</td>
                    <td className="px-4 py-3 text-ash">{row.note}</td>
                    <td className="px-4 py-3">
                      <span className="flex h-2.5 w-full overflow-hidden bg-void">
                        <span
                          className={row.dmg >= 4 ? "bg-blood" : "bg-amber"}
                          style={{ width: `${row.dmg * 10}%` }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ---------------- BESTIARIO ---------------- */}
        <Section
          id="bestiario"
          eyebrow="Bestiario"
          title="Cuatro arquetipos y tres máquinas"
          lead="La amenaza escala de humana a mecanizada: pandilleros con pistolas al principio, prototipos blindados con armamento láser al final."
        >
          <Bestiary />
        </Section>

        {/* ---------------- ZONAS ---------------- */}
        <Section
          id="zonas"
          eyebrow="Diseño de niveles"
          title="Tres zonas, tres amenazas"
          lead="Cada nivel usa su propio tileset, su propio arquetipo de enemigo y su propio jefe. La progresión se resuelve derribando a la máquina que custodia la zona."
        >
          <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
            {LEVELS.map((lvl) => (
              <article key={lvl.n} className="relative flex flex-col overflow-hidden bg-panel p-7">
                <span
                  className={`absolute inset-x-0 top-0 h-1 ${
                    lvl.accent === "amber"
                      ? "bg-amber"
                      : lvl.accent === "ice"
                        ? "bg-ice"
                        : "bg-blood"
                  }`}
                />
                <span className="font-display text-5xl leading-none text-line">{lvl.n}</span>
                <h3 className="mt-2 font-display text-3xl leading-tight text-bone">{lvl.name}</h3>
                <p className="mt-1 text-sm text-ash italic">{lvl.tone}</p>
                <p className="mt-5 text-sm leading-relaxed text-bone/80">{lvl.detail}</p>

                <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm lg:mt-auto">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ash">Enemigo</dt>
                    <dd className="text-right text-bone">{lvl.enemy}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ash">Jefe</dt>
                    <dd className="text-right text-bone">{lvl.boss}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ash">Puntos de aparición</dt>
                    <dd className="text-right text-bone">{lvl.spawns}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border border-line bg-panel-2/60 p-6">
            <Sprite sheet={SPRITES.battleCarWalk} label="Battle Car patrullando" scale={1.6} />
            <Sprite sheet={SPRITES.machineKillerWalk} label="Machine Killer patrullando" scale={2} />
            <Sprite sheet={SPRITES.carBlueWalk} label="Car Killer patrullando" scale={1.6} />
            <p className="min-w-56 flex-1 text-sm leading-relaxed text-ash">
              Derribar al tercer jefe lleva a la pantalla de{" "}
              <span className="text-amber">¡JUEGO COMPLETADO!</span>, con fundido de entrada de 1,5 s
              y música de victoria en bucle.
            </p>
          </div>
        </Section>

        {/* ---------------- MOTOR ---------------- */}
        <Section
          id="motor"
          eyebrow="Bajo el capó"
          title="Godot 4.4 y GDScript"
          lead="Seis decisiones técnicas que sostienen el juego, extraídas directamente del código de las escenas y los scripts."
        >
          <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {TECH_NOTES.map((note) => (
              <article key={note.title} className="bg-panel p-6">
                <h3 className="font-display text-xl leading-tight text-bone">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{note.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-6 border border-amber/30 bg-amber/5 p-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <Sprite
              sheet={SPRITES.swatRecharge}
              label="El operativo recargando"
              scale={1.4}
              className="mx-auto"
            />
            <div>
              <h3 className="font-display text-2xl text-amber">Estado del proyecto</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-bone/85">
                Tres niveles jugables de principio a fin, seis entidades hostiles, HUD completo,
                menús con ajustes de sonido e idioma (español e inglés) y pantalla de final de
                partida. El sistema de guardado todavía no está implementado: la campaña se juega de
                una sentada, en unos 15–25 minutos.
              </p>
            </div>
          </div>
        </Section>

        {/* ---------------- DESCARGA ---------------- */}
        <section
          id="descargar"
          className="scanlines relative overflow-hidden border-t border-line py-20 sm:py-28 grid-tactical"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,165,36,0.12),transparent_65%)]" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
            <Sprite sheet={SPRITES.swatIdle} label="El operativo SWAT listo" scale={1.6} />
            <p className="mt-6 text-xs font-semibold tracking-[0.28em] uppercase text-amber">
              Descarga gratuita
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.08] text-bone sm:text-5xl">
              La ciudad te necesita, operativo
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ash">
              Descarga Urban Strike: SWAT Ops para Windows y juega los tres niveles de principio a
              fin.
            </p>
            <div className="mt-9">
              <DownloadButton />
            </div>
            <p className="mt-5 text-xs text-ash/80">
              Si Windows muestra un aviso de SmartScreen, pulsa «Más información» y luego «Ejecutar
              de todas formas».
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-panel/40 py-10">
        <div className="mx-auto flex max-w-6xl justify-end px-5">
          <a
            href="#top"
            className="border border-line px-4 py-2 text-xs tracking-[0.18em] uppercase text-ash transition-colors hover:border-amber/60 hover:text-amber"
          >
            Volver arriba
          </a>
        </div>
      </footer>
    </>
  );
}
