const services = [
  { name: "Admin", url: "https://admin.rsprolipsi.com", port: 3001 },
  { name: "Escritório", url: "https://escritorio.rsprolipsi.com", port: 3002 },
  { name: "API", url: "https://api.rsprolipsi.com", port: 3003 },
  { name: "RS Shop", url: "https://shop.rsprolipsi.com", port: 3004 },
  { name: "Wallet/Pay", url: "https://wallet.rsprolipsi.com", port: 3005 },
  { name: "RSIA", url: "https://ia.rsprolipsi.com", port: 3006 }
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl py-16 space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">RS Prólipsi · Plataforma Oficial</h1>
        <p className="text-slate-300">
          Monorepo Next.js/NestJS preparado para deploy via PM2 e Nginx. Cada app possui health check e logging em /logs/YYYY-MM-DD.log.
        </p>
      </header>
      <section className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <div key={service.name} className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 space-y-2">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p>Porta interna: <span className="font-mono">{service.port}</span></p>
            <p>Health: <span className="font-mono">/health</span>{service.port < 3003 ? " (via /api/health)" : ""}</p>
            <a className="text-sky-400 underline" href={service.url}>
              {service.url}
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
