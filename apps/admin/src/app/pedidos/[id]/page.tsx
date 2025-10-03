"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = { params: { id: string } };

export default function EditPedidoPage({ params }: Props) {
  const { id } = params;
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string>("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/pedidos/${id}`);
        if (!res.ok) throw new Error("Falha ao carregar pedido");
        const o = await res.json();
        setCustomer(o.customer);
        setTotal(o.total);
        setStatus(o.status);
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
    const res = await fetch(`/api/pedidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer, total, status })
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
        <h2 className="text-2xl font-bold">Editar Pedido</h2>
        <Link href="/pedidos" className="text-sm text-slate-300 hover:underline">Voltar</Link>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1">Cliente</label>
          <input value={customer} onChange={e => setCustomer(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Total</label>
          <input type="number" step="0.01" value={total} onChange={e => setTotal(parseFloat(e.target.value))} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700">
            <option value="pending">Pendente</option>
            <option value="paid">Pago</option>
            <option value="shipped">Enviado</option>
            <option value="canceled">Cancelado</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Salvar</button>
      </form>
    </section>
  );
}

