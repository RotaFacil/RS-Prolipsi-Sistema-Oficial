// In-memory store for consultores (dev only)

export type ID = string;

export type Consultor = {
  id: ID;
  nome: string;
  email: string;
  telefone?: string;
  especialidade?: string;
  ativo: boolean;
  createdAt: string;
};

function genId(prefix = "cst") {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}

const store = {
  consultores: [] as Consultor[]
};

// Seed mínimo
if (store.consultores.length === 0) {
  store.consultores.push(
    { id: genId(), nome: "Alice", email: "alice@local", telefone: "(11) 90000-0001", especialidade: "Comercial", ativo: true, createdAt: new Date().toISOString() },
    { id: genId(), nome: "Bruno", email: "bruno@local", telefone: "(11) 90000-0002", especialidade: "Suporte", ativo: true, createdAt: new Date().toISOString() },
    { id: genId(), nome: "Carla", email: "carla@local", telefone: "(11) 90000-0003", especialidade: "Financeiro", ativo: false, createdAt: new Date().toISOString() }
  );
}

export const Consultores = {
  list: () => store.consultores,
  get: (id: ID) => store.consultores.find(c => c.id === id),
  create: (input: Pick<Consultor, "nome" | "email" | "telefone" | "especialidade" | "ativo">) => {
    const c: Consultor = { id: genId(), createdAt: new Date().toISOString(), ...input };
    store.consultores.unshift(c);
    return c;
  },
  update: (id: ID, patch: Partial<Pick<Consultor, "nome" | "email" | "telefone" | "especialidade" | "ativo">>) => {
    const c = store.consultores.find(x => x.id === id);
    if (!c) return undefined;
    Object.assign(c, patch);
    return c;
  },
  remove: (id: ID) => {
    const i = store.consultores.findIndex(x => x.id === id);
    if (i >= 0) store.consultores.splice(i, 1);
    return i >= 0;
  }
};

