"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = { params: { id: string } };

export default function EditConsultorPage({ params }: Props) {
  const { id } = params;
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/consultores/${id}`);
        if (!res.ok) throw new Error("Falha ao carregar consultor");
        const c = await res.json();
        setNome(c.nome);
        setEmail(c.email);
        setTelefone(c.telefone ?? "");
        setEspecialidade(c.especialidade ?? "");
        setAtivo(Boolean(c.ativo));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch(`/api/consultores/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, especialidade, ativo })
    });
    if (!res.ok) {
      setError("Falha ao salvar");
      return;
    }
    history.back();
  }

  if (loading) return <p>Carregando…</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editar Consultor</h2>
        <Link href="/consultores" className="text-sm text-slate-200 hover:underline">Voltar</Link>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 max-w-xl rounded border border-slate-700 bg-slate-800/60 p-4">
        <div>
          <label className="block text-sm mb-1">Nome</label>
          <input value={nome} onChange={e => setNome(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Telefone</label>
            <input value={telefone} onChange={e => setTelefone(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm mb-1">Especialidade</label>
            <input value={especialidade} onChange={e => setEspecialidade(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" />
          </div>
        </div>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={ativo} onChange={e => setAtivo(e.target.checked)} />
          Ativo
        </label>
        <div className="pt-2">
          <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Salvar</button>
        </div>
      </form>
    </section>
  );
}

