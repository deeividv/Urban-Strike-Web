"use client";

import { useState } from "react";
import { Sprite } from "@/app/components/Sprite";
import { BOSSES, ENEMIES, type Unit } from "@/app/lib/data";

type Roster = "enemigos" | "jefes";

function HealthBar({ unit, boss }: { unit: Unit; boss: boolean }) {
  return (
    <div
      className={`w-full max-w-xs rounded-[5px] bg-[rgba(10,13,18,0.88)] p-[3px] shadow-lg ${
        boss ? "border-2 border-amber" : "border border-ice"
      }`}
    >
      <div className="relative h-5 overflow-hidden rounded-[3px] bg-black/60">
        <div className="h-full w-full bg-toxic" />
        <span className="absolute inset-0 grid place-items-center font-display text-xs tracking-wide text-white text-outline">
          {unit.name.toUpperCase()} {unit.hp}/{unit.hp}
        </span>
      </div>
    </div>
  );
}

function UnitCard({ unit, boss }: { unit: Unit; boss: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <div className="relative flex min-h-64 flex-col items-center justify-end gap-5 overflow-hidden border border-line bg-panel-2/70 p-4 grid-tactical sm:p-6">
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 ${
            boss
              ? "bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,47,34,0.22),transparent_70%)]"
              : "bg-[radial-gradient(ellipse_at_50%_100%,rgba(86,183,245,0.16),transparent_70%)]"
          }`}
        />
        <Sprite
          sheet={unit.idle}
          label={`${unit.name} en reposo`}
          scale={unit.scale}
          className="relative"
        />
        <HealthBar unit={unit} boss={boss} />
      </div>

      <div>
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-amber">{unit.role}</p>
        <h3 className="mt-1 font-display text-4xl leading-tight text-bone">{unit.name}</h3>
        <p className="mt-1 text-sm text-ash">{unit.level}</p>

        <p className="mt-5 leading-relaxed text-bone/85">{unit.brief}</p>

        <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
          {unit.stats.map((s) => (
            <div key={s.label} className="bg-panel px-3.5 py-3">
              <dt className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-ash">
                {s.label}
              </dt>
              <dd className="mt-0.5 font-display text-lg leading-none text-bone">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex gap-3 border-l-2 border-amber bg-amber/5 p-4">
          <span className="mt-0.5 font-display text-sm tracking-wide text-amber">TÁCTICA</span>
          <p className="text-sm leading-relaxed text-bone/85">{unit.tactic}</p>
        </div>
      </div>
    </div>
  );
}

export function Bestiary() {
  const [roster, setRoster] = useState<Roster>("enemigos");
  const [index, setIndex] = useState(0);

  const units = roster === "enemigos" ? ENEMIES : BOSSES;
  const unit = units[Math.min(index, units.length - 1)];
  const boss = roster === "jefes";

  const switchRoster = (next: Roster) => {
    setRoster(next);
    setIndex(0);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["enemigos", "jefes"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => switchRoster(r)}
            aria-pressed={roster === r}
            className={`px-5 py-2.5 font-display text-lg tracking-wide transition-colors ${
              roster === r
                ? "bg-amber text-void"
                : "border border-line bg-panel text-ash hover:text-bone"
            }`}
          >
            {r === "enemigos" ? "ENEMIGOS COMUNES" : "JEFES"}
          </button>
        ))}
        <span className="ml-auto hidden text-xs tracking-[0.2em] uppercase text-ash sm:block">
          6 entidades hostiles
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {units.map((u, i) => (
          <button
            key={u.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className={`flex items-center gap-3 border p-3 text-left transition-colors ${
              i === index
                ? "border-amber bg-amber/10"
                : "border-line bg-panel hover:border-ash/40"
            }`}
          >
            <div className="grid size-14 shrink-0 place-items-center overflow-hidden bg-void/60">
              <Sprite sheet={u.idle} label="" scale={56 / u.idle.frameW} />
            </div>
            <span className="min-w-0">
              <span className="block truncate font-display text-lg leading-tight text-bone">
                {u.name}
              </span>
              <span className="block text-xs text-ash">
                {u.hp} PV · {u.role}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <UnitCard unit={unit} boss={boss} />
      </div>
    </div>
  );
}
