'use client'

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "../styles/globals.css";
import { Nav } from "@/components/Nav";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "RS Prólipsi Admin",
  description: "Painel administrativo RS Prólipsi"
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-100">
        <AuthProvider>
          {isLoginPage ? (
            children
          ) : (
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
              <aside className="hidden md:block border-r border-slate-800 bg-slate-900/40">
                <div className="px-5 py-4 border-b border-slate-800">
                  <h1 className="text-lg font-semibold">RS Prólipsi • Admin</h1>
                  <p className="text-xs text-slate-400">Porta 3001 • /api/health</p>
                </div>
                <Nav />
              </aside>
              <div className="flex flex-col min-h-screen">
                <header className="md:hidden border-b border-slate-800 px-5 py-4 bg-slate-900/40">
                  <h1 className="text-lg font-semibold">RS Prólipsi • Admin</h1>
                  <p className="text-xs text-slate-400">Porta 3001 • /api/health</p>
                </header>
                <main className="flex-1 px-5 py-6">{children}</main>
              </div>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}

