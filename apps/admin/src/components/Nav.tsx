"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/escritorio", label: "Escritório" },
  { href: "/usuarios", label: "Usuários" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/produtos", label: "Produtos" },
  { href: "/relatorios", label: "Relatórios" },
  { href: "/configuracoes", label: "Configurações" }
];

function itemClasses(active: boolean) {
  return [
    "block px-4 py-2 text-sm rounded-md",
    active
      ? "bg-slate-800 text-slate-100 border border-slate-700"
      : "text-slate-300 hover:text-slate-100 hover:bg-slate-900"
  ].join(" ");
}

export function Nav() {
  const pathname = usePathname() || "/";
  return (
    <nav className="p-3 space-y-1">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link key={l.href} href={l.href} className={itemClasses(active)}>
            {l.label}
          </Link>
        );
      })}
      <div className="pt-2 mt-2 border-t border-slate-800 text-xs text-slate-400">
        <a href="/api/health" className="block px-1 py-1 hover:underline">/api/health</a>
      </div>
    </nav>
  );
}
