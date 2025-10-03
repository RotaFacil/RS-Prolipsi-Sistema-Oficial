import { TopNav } from "@/components/TopNav";

export default function ConfiguracoesPage() {
  return (
    <section className="space-y-6">
      <TopNav />
      <header>
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-slate-400">Preferências do sistema (placeholder).</p>
      </header>
      <div className="rounded border border-slate-800 bg-slate-900/60 p-6 space-y-4 max-w-xl">
        <div>
          <label className="block text-sm mb-1">API Base</label>
          <input value={process.env.NEXT_PUBLIC_API_URL} readOnly className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700" />
          <p className="text-xs text-slate-500 mt-1">Defina via variável de ambiente NEXT_PUBLIC_API_URL</p>
        </div>
      </div>
    </section>
  );
}

