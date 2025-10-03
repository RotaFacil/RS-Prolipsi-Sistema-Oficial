export type ID = string;

export type Assistant = {
  id: ID;
  name: string;
  description?: string;
  model: string;
  status: "draft" | "active" | "archived";
  createdAt: string;
};

function genId(prefix = "ast") {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}

const store = {
  assistants: [] as Assistant[]
};

// Seeds for DX
if (store.assistants.length === 0) {
  store.assistants.push(
    {
      id: genId(),
      name: "Atendimento Padrão",
      description: "Fluxo de boas-vindas e FAQs",
      model: "gpt-4o-mini",
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: genId(),
      name: "Vendas RS",
      description: "Auxiliar ofertas e carrinho",
      model: "gpt-4o-mini",
      status: "draft",
      createdAt: new Date().toISOString()
    }
  );
}

export const Assistants = {
  list: () => store.assistants,
  get: (id: ID) => store.assistants.find(a => a.id === id),
  create: (input: Pick<Assistant, "name" | "description" | "model" | "status">) => {
    const a: Assistant = { id: genId(), createdAt: new Date().toISOString(), ...input };
    store.assistants.unshift(a);
    return a;
  },
  update: (id: ID, patch: Partial<Pick<Assistant, "name" | "description" | "model" | "status">>) => {
    const a = store.assistants.find(x => x.id === id);
    if (!a) return undefined;
    Object.assign(a, patch);
    return a;
  },
  remove: (id: ID) => {
    const i = store.assistants.findIndex(x => x.id === id);
    if (i >= 0) store.assistants.splice(i, 1);
    return i >= 0;
  }
};

