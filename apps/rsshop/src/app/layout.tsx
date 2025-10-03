import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "RS Prólipsi Shop",
  description: "E-commerce RS Prólipsi"
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <header className="mb-10">
            <h1 className="text-3xl font-semibold">RS Shop</h1>
            <p className="text-slate-300">Porta 3004 · rota de saúde em /api/health</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
