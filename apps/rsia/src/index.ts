import express from "express";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { log } from "./logger";
import { Assistants } from "./store";

dotenv.config();

const SERVICE_NAME = "rsia";
const requiredOpenAiKey = process.env.OPENAI_API_KEY;

if (!requiredOpenAiKey) {
  const message = "Missing OPENAI_API_KEY environment variable. Aborting start.";
  log(message, "error");
  console.error(message);
  process.exit(1);
}

const app = express();
const port = Number(process.env.PORT ?? 3006);
const staticRoot = process.env.STATIC_ROOT ?? path.join(__dirname, "public");
const projectsRoot = process.env.PROJECTS_ROOT ?? "/home/rsprolipsi/projects/rsia";

app.use(helmet());
app.use(express.json());
app.use((req, _res, next) => {
  log(`${req.method} ${req.url}`);
  next();
});

app.get("/health", (_req, res) => {
  const payload = {
    status: "ok",
    service: SERVICE_NAME,
    timestamp: new Date().toISOString(),
    projectsRoot
  };
  log("health check");
  res.json(payload);
});

// CRUD: Assistants (in-memory for dev)
app.get("/api/assistants", (_req, res) => {
  res.json({ data: Assistants.list() });
});

app.post("/api/assistants", (req, res) => {
  const { name, description, model, status } = req.body ?? {};
  if (!name) return res.status(400).json({ error: "name is required" });
  const created = Assistants.create({
    name,
    description,
    model: model || "gpt-4o-mini",
    status: (status as any) || "draft"
  });
  res.status(201).json(created);
});

app.get("/api/assistants/:id", (req, res) => {
  const a = Assistants.get(req.params.id);
  if (!a) return res.status(404).json({ error: "not found" });
  res.json(a);
});

app.put("/api/assistants/:id", (req, res) => {
  const updated = Assistants.update(req.params.id, req.body ?? {});
  if (!updated) return res.status(404).json({ error: "not found" });
  res.json(updated);
});

app.delete("/api/assistants/:id", (req, res) => {
  const ok = Assistants.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: "not found" });
  res.json({ ok: true });
});

app.use(express.static(staticRoot));

// Expor projetos publicados sob /pub
app.use("/pub", express.static(projectsRoot));

// Diag de provedores (policy simplificada)
app.get("/diag/providers", (_req, res) => {
  res.json({
    intents: {
      image: { primary: "stability", fallback: "openai-images" },
      landing: { primary: "claude", fallback: "openai" },
      summary: { primary: "gemini", fallback: "claude" },
      rag: { primary: "cohere", fallback: "claude" }
    }
  });
});

// Projetos: listar/criar/versionar/publicar/restaurar (MVP em disco)
function ensureDir(p: string) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

app.get("/projects", (_req, res) => {
  try {
    ensureDir(projectsRoot);
    const items = fs.readdirSync(projectsRoot, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => ({ id: d.name }));
    res.json({ ok: true, items });
  } catch (e: any) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/projects", (req, res) => {
  try {
    const id = String(req.body?.id || "").trim();
    if (!id) return res.status(400).json({ ok: false, error: "id required" });
    const root = path.join(projectsRoot, id);
    ensureDir(path.join(root, "versions"));
    res.json({ ok: true, id });
  } catch (e: any) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/projects/:id/versions", (req, res) => {
  try {
    const id = req.params.id; const now = new Date().toISOString().replace(/[:]/g, "-");
    const vdir = path.join(projectsRoot, id, "versions", now);
    ensureDir(vdir);
    const html = req.body?.html ?? "<!doctype html><title>vazio</title><h1>OK</h1>";
    fs.writeFileSync(path.join(vdir, "index.html"), html, { encoding: "utf8" });
    res.json({ ok: true, version: now });
  } catch (e: any) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/projects/:id/publish", (req, res) => {
  try {
    const id = req.params.id; const version = String(req.body?.version || "");
    if (!version) return res.status(400).json({ ok: false, error: "version required" });
    const root = path.join(projectsRoot, id);
    const target = path.join(root, "versions", version);
    const link = path.join(root, "current");
    if (!fs.existsSync(target)) return res.status(404).json({ ok: false, error: "version not found" });
    try { if (fs.existsSync(link)) fs.rmSync(link, { recursive: true, force: true }); } catch {}
    try { fs.symlinkSync(target, link, "junction"); }
    catch { fs.mkdirSync(link, { recursive: true }); }
    res.json({ ok: true, published: `/pub/${id}/current/` });
  } catch (e: any) { res.status(500).json({ ok: false, error: e.message }); }
});

app.post("/projects/:id/restore", (req, res) => {
  try {
    const id = req.params.id; const version = String(req.body?.version || "");
    const root = path.join(projectsRoot, id);
    const target = version ? path.join(root, "versions", version) : null;
    const link = path.join(root, "current");
    if (target && !fs.existsSync(target)) return res.status(404).json({ ok: false, error: "version not found" });
    try { if (fs.existsSync(link)) fs.rmSync(link, { recursive: true, force: true }); } catch {}
    if (target) { try { fs.symlinkSync(target, link, "junction"); } catch { fs.mkdirSync(link, { recursive: true }); } }
    res.json({ ok: true, restored: !!target });
  } catch (e: any) { res.status(500).json({ ok: false, error: e.message }); }
});

app.listen(port, "0.0.0.0", () => {
  log(`${SERVICE_NAME} listening on ${port}`);
});
