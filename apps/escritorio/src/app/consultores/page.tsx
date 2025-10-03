"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Consultor = { id: string; nome: string; email: string; telefone?: string; especialidade?: string; ativo: boolean; createdAt: string };

export default function ConsultoresPage() {
  const [items, setItems] = useState<Consultor[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [ativo, setAtivo] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/consultores", { cache: "no-store" });
    const json = await res.json();
    setItems(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/consultores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, especialidade, ativo })
    });
    if (res.ok) {
      setNome("");
      setEmail("");
      setTelefone("");
      setEspecialidade("");
      setAtivo(true);
      load();
    }
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/consultores/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold">Consultores</h2>
        <p className="text-slate-300">Gerencie cadastro de consultores.</p>
      </header>

      <form onSubmit={onCreate} className="rounded border border-slate-700 bg-slate-800/60 p-4 grid gap-3 sm:grid-cols-6">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 sm:col-span-2" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 sm:col-span-2" required />
        <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" />
        <input value={especialidade} onChange={e => setEspecialidade(e.target.value)} placeholder="Especialidade" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" />
        <label className="inline-flex items-center gap-2 text-sm sm:col-span-5">
          <input type="checkbox" checked={ativo} onChange={e => setAtivo(e.target.checked)} />
          Ativo
        </label>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Adicionar</button>
      </form>

      <div className="rounded border border-slate-700 bg-slate-800/60 p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-200">
            <tr>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">E-mail</th>
              <th className="text-left px-4 py-2">Telefone</th>
              <th className="text-left px-4 py-2">Especialidade</th>
              <th className="text-left px-4 py-2">Ativo</th>
              <th className="text-left px-4 py-2">Criado</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={7}>Carregando…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={7}>Nenhum consultor</td></tr>
            ) : (
              items.map(c => (
                <tr key={c.id} className="border-t border-slate-700">
                  <td className="px-4 py-2">{c.nome}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.telefone ?? "—"}</td>
                  <td className="px-4 py-2">{c.especialidade ?? "—"}</td>
                  <td className="px-4 py-2">{c.ativo ? "Sim" : "Não"}</td>
                  <td className="px-4 py-2 text-slate-400">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/consultores/${c.id}`} className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">Editar</Link>
                      <button onClick={() => onDelete(c.id)} className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

