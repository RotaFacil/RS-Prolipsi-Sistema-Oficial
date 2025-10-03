"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = { params: { id: string } };

export default function EditProdutoPage({ params }: Props) {
  const { id } = params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/produtos/${id}`);
        if (!res.ok) throw new Error("Falha ao carregar produto");
        const p = await res.json();
        setName(p.name);
        setPrice(p.price);
        setStock(p.stock);
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
    const res = await fetch(`/api/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, stock })
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
        <h2 className="text-2xl font-bold">Editar Produto</h2>
        <Link href="/produtos" className="text-sm text-slate-300 hover:underline">Voltar</Link>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1">Nome</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Preço</label>
          <input type="number" step="0.01" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Estoque</label>
          <input type="number" value={stock} onChange={e => setStock(parseInt(e.target.value || "0", 10))} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Salvar</button>
      </form>
    </section>
  );
}

