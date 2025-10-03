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

function cls(active: boolean) {
  return [
    "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm",
    active
      ? "bg-slate-800 text-slate-100 border border-slate-700"
      : "text-slate-300 hover:text-slate-100 hover:bg-slate-900 border border-transparent"
  ].join(" ");
}

export function TopNav() {
  const pathname = usePathname() || "/";
  return (
    <nav className="w-full overflow-x-auto">
      <ul className="flex items-center gap-2">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link href={l.href} className={cls(active)}>
                {l.label}
              </Link>
            </li>
          );
        })}
        <li className="ml-auto text-xs text-slate-400 hidden sm:block">
          <a href="/api/health" className="hover:underline">health</a>
        </li>
      </ul>
    </nav>
  );
}
