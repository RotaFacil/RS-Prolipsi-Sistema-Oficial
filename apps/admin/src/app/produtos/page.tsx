"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import withAuth from "@/hocs/withAuth";
import api from "@/lib/api";

type Product = { id: string; name: string; price: number; stock: number; createdAt: string };

function ProdutosPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/produtos");
      setItems(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to load products", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/produtos", { name, price, stock });
      setName("");
      setPrice(0);
      setStock(0);
      load();
    } catch (error) {
      console.error("Failed to create product", error);
    }
  }

  async function onDelete(id: string) {
    try {
      await api.delete(`/produtos/${id}`);
      load();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  }

  return (
    <section className="space-y-6">
      <TopNav />
      <header>
        <h2 className="text-2xl font-bold">Produtos</h2>
        <p className="text-slate-400">Gerencie catálogo e estoque.</p>
      </header>
      <form onSubmit={onCreate} className="rounded border border-slate-800 bg-slate-900/60 p-4 grid gap-3 sm:grid-cols-4 max-w-3xl">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <input type="number" step="0.01" value={price} onChange={e => setPrice(parseFloat(e.target.value))} placeholder="Preço" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <input type="number" value={stock} onChange={e => setStock(parseInt(e.target.value || "0", 10))} placeholder="Estoque" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Adicionar</button>
      </form>
      <div className="rounded border border-slate-800 bg-slate-900/60 p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-300">
            <tr>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">Preço</th>
              <th className="text-left px-4 py-2">Estoque</th>
              <th className="text-left px-4 py-2">Criado</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={5}>Carregando…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={5}>Nenhum produto</td></tr>
            ) : (
              items.map(p => (
                <tr key={p.id} className="border-t border-slate-800">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">R$ {p.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2 text-slate-400">{new Date(p.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/produtos/${p.id}`} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Editar</Link>
                      <button onClick={() => onDelete(p.id)} className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600">Excluir</button>
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

export default withAuth(ProdutosPage);

