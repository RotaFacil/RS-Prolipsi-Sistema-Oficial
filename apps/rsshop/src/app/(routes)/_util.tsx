export default function Section({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
      <div className="rounded border border-yellow-400/20 bg-slate-900/60 p-6">{children ?? <p>Em breve…</p>}</div>
    </section>
  );
}

