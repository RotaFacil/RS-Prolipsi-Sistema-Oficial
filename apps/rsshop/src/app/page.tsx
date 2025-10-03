const apiEndpoint = process.env.NEXT_PUBLIC_API_URL ?? "https://api.rsprolipsi.com";

export default function Page() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Catálogo em construção</h2>
      <p className="text-slate-200">
        Utilize este esqueleto para integrar vitrine, checkout e recomendações.
      </p>
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-6 space-y-2">
        <p><span className="font-semibold">API:</span> <span className="font-mono">{apiEndpoint}</span></p>
        <p><span className="font-semibold">Health:</span> <span className="font-mono">/api/health</span></p>
        <p><span className="font-semibold">Logs:</span> <span className="font-mono">logs/YYYY-MM-DD.log</span></p>
      </div>
    </section>
  );
}
