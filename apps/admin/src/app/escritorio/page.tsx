"use client";

import { useMemo, useState } from "react";
import { TopNav } from "@/components/TopNav";

type Status = "livre" | "ocupado" | "ausente";

type Desk = {
  id: string;
  label: string;
  occupant?: string;
  status: Status;
};

type Room = {
  id: string;
  label: string;
  kind: "sala" | "reuniao" | "copa" | "recepcao";
};

export default function EscritorioPage() {
  // Layout simples: grid 6x6 com posições predefinidas
  const [filter, setFilter] = useState<Status | "todas">("todas");

  const desks: Desk[] = useMemo(
    () => [
      { id: "D1", label: "Mesa 01", occupant: "Ana", status: "ocupado" },
      { id: "D2", label: "Mesa 02", occupant: "Bruno", status: "livre" },
      { id: "D3", label: "Mesa 03", occupant: "Carla", status: "ausente" },
      { id: "D4", label: "Mesa 04", occupant: "Diego", status: "ocupado" },
      { id: "D5", label: "Mesa 05", occupant: "Eva", status: "livre" },
      { id: "D6", label: "Mesa 06", occupant: "Fábio", status: "ocupado" },
      { id: "D7", label: "Mesa 07", occupant: "Gabi", status: "livre" },
      { id: "D8", label: "Mesa 08", occupant: "Henrique", status: "ocupado" },
      { id: "D9", label: "Mesa 09", occupant: "Iris", status: "ausente" },
      { id: "D10", label: "Mesa 10", occupant: "Jonas", status: "livre" },
      { id: "D11", label: "Mesa 11", occupant: "Katia", status: "ocupado" },
      { id: "D12", label: "Mesa 12", occupant: "Leo", status: "livre" }
    ],
    []
  );

  const rooms: Room[] = [
    { id: "R1", label: "Recepção", kind: "recepcao" },
    { id: "R2", label: "Sala Reunião A", kind: "reuniao" },
    { id: "R3", label: "Sala Reunião B", kind: "reuniao" },
    { id: "R4", label: "Copa", kind: "copa" },
    { id: "R5", label: "Sala Operacional", kind: "sala" }
  ];

  const filtered = filter === "todas" ? desks : desks.filter(d => d.status === filter);

  return (
    <section className="space-y-6">
      <TopNav />
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Escritório (visão em desenho)</h2>
          <p className="text-slate-400">Mapa de mesas e salas — status em tempo de desenvolvimento.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-300">Filtrar:</label>
          <select
            className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="todas">Todas</option>
            <option value="livre">Livres</option>
            <option value="ocupado">Ocupadas</option>
            <option value="ausente">Ausentes</option>
          </select>
        </div>
      </header>

      {/* Legenda */}
      <div className="flex flex-wrap gap-3 text-xs text-slate-300">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-emerald-600" /> Livre
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-yellow-600" /> Ausente
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-rose-600" /> Ocupado
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-slate-700" /> Salas/ambientes
        </span>
      </div>

      {/* Desenho do escritório */}
      <div className="rounded border border-slate-800 bg-slate-900/40 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Recepção e salas */}
          {rooms.map((r) => (
            <div
              key={r.id}
              className="col-span-1 lg:col-span-2 rounded border border-slate-800 bg-slate-900/60 p-3"
            >
              <div className="text-slate-300 text-sm">{r.label}</div>
              <div className="mt-2 h-16 rounded bg-slate-950 border border-slate-800" />
            </div>
          ))}

          {/* Mesas */}
          {filtered.map((d) => (
            <div
              key={d.id}
              className="rounded border border-slate-800 p-3 bg-slate-900/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300 font-medium">{d.label}</span>
                <span
                  className={[
                    "w-2.5 h-2.5 rounded-full",
                    d.status === "livre" && "bg-emerald-600",
                    d.status === "ocupado" && "bg-rose-600",
                    d.status === "ausente" && "bg-yellow-600"
                  ].filter(Boolean).join(" ")}
                  title={d.status}
                />
              </div>
              <div className="mt-3 h-14 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                <span className="text-xs text-slate-400">
                  {d.occupant ? d.occupant : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visão em lista auxiliar */}
      <div className="rounded border border-slate-800 bg-slate-900/40 p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-300">
            <tr>
              <th className="text-left px-4 py-2">Mesa</th>
              <th className="text-left px-4 py-2">Ocupante</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {desks.map((d) => (
              <tr key={d.id} className="border-t border-slate-800">
                <td className="px-4 py-2">{d.label}</td>
                <td className="px-4 py-2 text-slate-300">{d.occupant ?? "—"}</td>
                <td className="px-4 py-2 capitalize">{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

