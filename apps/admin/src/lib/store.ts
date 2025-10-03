// In-memory store for local dev CRUD

export type ID = string;

export type User = {
  id: ID;
  name: string;
  email: string;
  createdAt: string;
};

export type Product = {
  id: ID;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
};

export type Order = {
  id: ID;
  customer: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "canceled";
  createdAt: string;
};

function genId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}

const store = {
  users: [] as User[],
  products: [] as Product[],
  orders: [] as Order[]
};

// Seed minimal data for DX
if (store.users.length === 0) {
  store.users.push(
    { id: genId("usr"), name: "Admin", email: "admin@local", createdAt: new Date().toISOString() },
    { id: genId("usr"), name: "Operador", email: "op@local", createdAt: new Date().toISOString() }
  );
}
if (store.products.length === 0) {
  store.products.push(
    { id: genId("prd"), name: "Produto A", price: 99.9, stock: 10, createdAt: new Date().toISOString() },
    { id: genId("prd"), name: "Produto B", price: 149.5, stock: 5, createdAt: new Date().toISOString() }
  );
}
if (store.orders.length === 0) {
  store.orders.push({ id: genId("ord"), customer: "Cliente X", total: 249.4, status: "pending", createdAt: new Date().toISOString() });
}

// Users
export const Users = {
  list: () => store.users,
  get: (id: ID) => store.users.find(u => u.id === id),
  create: (input: Pick<User, "name" | "email">) => {
    const u: User = { id: genId("usr"), createdAt: new Date().toISOString(), ...input };
    store.users.unshift(u);
    return u;
  },
  update: (id: ID, patch: Partial<Pick<User, "name" | "email">>) => {
    const u = store.users.find(x => x.id === id);
    if (!u) return undefined;
    Object.assign(u, patch);
    return u;
  },
  remove: (id: ID) => {
    const i = store.users.findIndex(x => x.id === id);
    if (i >= 0) store.users.splice(i, 1);
    return i >= 0;
  }
};

// Products
export const Products = {
  list: () => store.products,
  get: (id: ID) => store.products.find(p => p.id === id),
  create: (input: Pick<Product, "name" | "price" | "stock">) => {
    const p: Product = { id: genId("prd"), createdAt: new Date().toISOString(), ...input };
    store.products.unshift(p);
    return p;
  },
  update: (id: ID, patch: Partial<Pick<Product, "name" | "price" | "stock">>) => {
    const p = store.products.find(x => x.id === id);
    if (!p) return undefined;
    Object.assign(p, patch);
    return p;
  },
  remove: (id: ID) => {
    const i = store.products.findIndex(x => x.id === id);
    if (i >= 0) store.products.splice(i, 1);
    return i >= 0;
  }
};

// Orders
export const Orders = {
  list: () => store.orders,
  get: (id: ID) => store.orders.find(o => o.id === id),
  create: (input: Pick<Order, "customer" | "total" | "status">) => {
    const o: Order = { id: genId("ord"), createdAt: new Date().toISOString(), ...input };
    store.orders.unshift(o);
    return o;
  },
  update: (id: ID, patch: Partial<Pick<Order, "customer" | "total" | "status">>) => {
    const o = store.orders.find(x => x.id === id);
    if (!o) return undefined;
    Object.assign(o, patch);
    return o;
  },
  remove: (id: ID) => {
    const i = store.orders.findIndex(x => x.id === id);
    if (i >= 0) store.orders.splice(i, 1);
    return i >= 0;
  }
};

