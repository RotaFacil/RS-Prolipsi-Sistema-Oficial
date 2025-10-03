"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import withAuth from "@/hocs/withAuth";
import api from "@/lib/api";

type User = { id: string; name: string; email: string; createdAt: string };

function UsuariosPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/usuarios");
      setItems(res.data.data ?? []);
    } catch (error) {
      console.error("Failed to load users", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/usuarios", { name, email });
      setName("");
      setEmail("");
      load();
    } catch (error) {
      console.error("Failed to create user", error);
    }
  }

  async function onDelete(id: string) {
    try {
      await api.delete(`/usuarios/${id}`);
      load();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  }

  return (
    <section className="space-y-6">
      <TopNav />
      <header>
        <h2 className="text-2xl font-bold">Usuários</h2>
        <p className="text-slate-400">Gerencie contas, perfis e permissões.</p>
      </header>
      <form onSubmit={onCreate} className="rounded border border-slate-800 bg-slate-900/60 p-4 grid gap-3 sm:grid-cols-3 max-w-2xl">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="px-3 py-2 rounded bg-slate-900 border border-slate-700" required />
        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Adicionar</button>
      </form>
      <div className="rounded border border-slate-800 bg-slate-900/60 p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-300">
            <tr>
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2">E-mail</th>
              <th className="text-left px-4 py-2">Criado</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={4}>Carregando…</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={4}>Nenhum usuário</td></tr>
            ) : (
              items.map(u => (
                <tr key={u.id} className="border-t border-slate-800">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 text-slate-400">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/usuarios/${u.id}`} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">Editar</Link>
                      <button onClick={() => onDelete(u.id)} className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600">Excluir</button>
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

export default withAuth(UsuariosPage);

