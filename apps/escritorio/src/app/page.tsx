const officeApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://api.rsprolipsi.com";

export default function Page() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Área do escritório</h2>
      <p className="text-slate-200">
        Aqui você poderá coordenar consultores, agenda e relacionamento com clientes.
      </p>
      <div className="rounded-lg border border-slate-600 bg-slate-800/60 p-6 space-y-3">
        <p>
          API central: <span className="font-mono text-slate-100">{officeApiUrl}</span>
        </p>
        <p>
          Health check: <span className="font-mono text-slate-100">/api/health</span>
        </p>
        <p>Logs em <span className="font-mono">logs/YYYY-MM-DD.log</span></p>
      </div>
    </section>
  );
}

