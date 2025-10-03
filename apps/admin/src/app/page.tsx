'use client'

import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import withAuth from "@/hocs/withAuth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.rsprolipsi.com";

function Page() {
  return (
    <section className="space-y-6">
      <TopNav />
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Bem-vindo ao painel administrativo</h2>
        <p className="text-slate-300 max-w-2xl">
          Inicie com <code className="font-mono bg-slate-900 px-2 py-1 rounded">npm run dev --workspace @rsprolipsi/admin</code>.
          As configurações ficam em <code className="font-mono bg-slate-900 px-2 py-1 rounded">.env</code>.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/usuarios", title: "Usuários", desc: "Gerencie contas e perfis" },
          { href: "/pedidos", title: "Pedidos", desc: "Acompanhe pedidos e status" },
          { href: "/produtos", title: "Produtos", desc: "Catálogo e estoque" },
          { href: "/relatorios", title: "Relatórios", desc: "Indicadores e métricas" },
          { href: "/configuracoes", title: "Configurações", desc: "Preferências do sistema" }
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900"
          >
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-slate-400 text-sm">{c.desc}</p>
          </Link>
        ))}
      </div>
      <div className="rounded border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold mb-2">Integrações</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          <li>API base: <span className="font-mono">{apiUrl}</span></li>
          <li>Health check interno: <span className="font-mono">/api/health</span></li>
          <li>Logs em <span className="font-mono">logs/YYYY-MM-DD.log</span></li>
        </ul>
      </div>
    </section>
  );
}

export default withAuth(Page);

