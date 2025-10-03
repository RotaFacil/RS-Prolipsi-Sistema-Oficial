"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import withAuth from "@/hocs/withAuth";
import api from "@/lib/api";

type Order = { id: string; customer: string; total: number; status: string; createdAt: string };

function PedidosPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<string>("pending");

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/pedidos");
      setItems(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to load orders", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/pedidos", { customer, total, status });
      setCustomer("");
      setTotal(0);
      setStatus("pending");
      load();
    } catch (error) {
      console.error("Failed to create order", error);
    }
  }

  async function onDelete(id: string) {
    try {
      await api.delete(`/pedidos/${id}`);
      load();
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  }

  return (
    <section className="space-y-6">
      <TopNav />
      <header>
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <p className="text-slate-400">Acompanhe pedidos e pagamentos.</p>
      </header>
      <form onSubmit={onCreate} className="rounded border border-slate-800 bg-slate-900/60 p-4 grid gap-3 sm:grid-cols-5 max-w-4xl">
        <input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Cliente" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <input type="number" step="0.01" value={total} onChange={e => setTotal(parseFloat(e.target.value))} placeholder="Total" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 rounded bg-slate-900 border border-slate-700">
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="shipped">Enviado</option>
          <option value="canceled">Cancelado</option>
        </select>
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Adicionar</button>
      </form>
      <div className="rounded border border-slate-800 bg-slate-900/60 p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-300">
            <tr>
              <th className="text-left px-4 py-2">Cliente</th>
              <th className="text-left px-4 py-2">Total</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Criado</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={5}>Carregando…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={5}>Nenhum pedido</td></tr>
            ) : (
              items.map(o => (
                <tr key={o.id} className="border-t border-slate-800">
                  <td className="px-4 py-2">{o.customer}</td>
                  <td className="px-4 py-2">R$ {o.total.toFixed(2)}</td>
                  <td className="px-4 py-2 capitalize">{o.status}</td>
                  <td className="px-4 py-2 text-slate-400">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/pedidos/${o.id}`} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Editar</Link>
                      <button onClick={() => onDelete(o.id)} className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600">Excluir</button>
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

export default withAuth(PedidosPage);

