import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "RS Prólipsi Escritório",
  description: "Portal de escritório e consultores RS Prólipsi"
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="py-10">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-semibold">Escritório • RS Prólipsi</h1>
            <p className="text-slate-300">Porta 3002 • health em /api/health</p>
            <nav className="mt-4 flex gap-3 justify-center text-sm">
              <a className="px-3 py-1 rounded bg-slate-800 border border-slate-700" href="/">Início</a>
              <a className="px-3 py-1 rounded bg-slate-800 border border-slate-700" href="/consultores">Consultores</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

