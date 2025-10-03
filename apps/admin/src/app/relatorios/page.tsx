import { TopNav } from "@/components/TopNav";

export default function RelatoriosPage() {
  return (
    <section className="space-y-6">
      <TopNav />
      <header>
        <h2 className="text-2xl font-bold">Relatórios</h2>
        <p className="text-slate-400">Indicadores e métricas (placeholder).</p>
      </header>
      <div className="rounded border border-slate-800 bg-slate-900/60 p-6">
        <ul className="list-disc list-inside text-slate-300">
          <li>Vendas por período</li>
          <li>Produtos mais vendidos</li>
          <li>Novos usuários</li>
        </ul>
      </div>
    </section>
  );
}

