"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = { params: { id: string } };

export default function EditUsuarioPage({ params }: Props) {
  const { id } = params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/usuarios/${id}`);
        if (!res.ok) throw new Error("Falha ao carregar usuário");
        const u = await res.json();
        setName(u.name);
        setEmail(u.email);
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
    const res = await fetch(`/api/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
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
        <h2 className="text-2xl font-bold">Editar Usuário</h2>
        <Link href="/usuarios" className="text-sm text-slate-300 hover:underline">Voltar</Link>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1">Nome</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input value={email} type="email" onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Salvar</button>
      </form>
    </section>
  );
}

