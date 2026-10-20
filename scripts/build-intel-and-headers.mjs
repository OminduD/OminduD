import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import https from "node:https";
import { C, Doc, svg, chrome, corners, wrap, textWidth, esc, mono } from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = join(ROOT, "assets");
const CACHE_FILE = join(ROOT, "scripts", "contributions-cache.json");
mkdirSync(OUT, { recursive: true });

/* --------------------------------------------------------- Section Headers */
/* Matching janiyax35/assets/head-whoami-light.svg and head-whoami.svg style exactly */
const HEAD_THEME = {
  dark: { ink: C.text, accent: "#00ff88", meta: C.dim, rule: C.line2 },
  light: { ink: "#1F2328", accent: "#4F7A00", meta: "#59636E", rule: "#D0D7DE" }
};

const SECTIONS = {
  whoami: ["01", "node_spec", "kubectl describe node/omindu"],
  arsenal: ["02", "cluster_stack", "helm list -A --all-namespaces"],
  architecture: ["03", "cloud_topology", "terraform graph | dot -Tsvg"],
  telemetry: ["04", "observability", "promtool check metrics --live"],
  space: ["05", "chaos_drill", "chaos-monkey inject --cluster"],
  contrib3d: ["06", "commit_mesh", "git log --graph --oneline --all"],
  pets: ["07", "cluster_mesh", "kubectl get pods -A -o wide --watch · self-healing"],
  certs: ["08", "certs_and_badges", "aws sts get-caller-identity"],
  cases: ["01", "workloads", "kubectl get deployments -o wide"],
  intel: ["01", "runbooks", "cat /etc/credentials/certs.pem"]
};

for (const [key, [idx, title, meta]] of Object.entries(SECTIONS)) {
  for (const theme of ["dark", "light"]) {
    const T = HEAD_THEME[theme];
    const d = new Doc(), W = 840, H = 60, ty = 40;
    const tw = textWidth(title, "sg-700", 30, -1);
    const mw = mono(12) * (meta.length + 2);
    const x1 = 50 + tw + 18, x2 = W - 2 - mw - 18, len = Math.max(x2 - x1, 40);
    d.rule(`.ln{transform-origin:${x1}px 0;animation:draw 1.1s cubic-bezier(.2,.8,.2,1) .2s both}@keyframes draw{from{transform:scaleX(0)}}
.pk{animation:pk 5s cubic-bezier(.5,0,.5,1) 1.3s infinite both}@keyframes pk{0%{transform:translateX(0);opacity:0}6%{opacity:1}54%{opacity:1}60%,100%{transform:translateX(${(len - 8).toFixed(1)}px);opacity:0}}`);

    const body = `<defs><linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="${x1}" y1="0" x2="${x2}" y2="0"><stop offset="0" stop-color="${T.rule}"/><stop offset="1" stop-color="${T.rule}" stop-opacity="0"/></linearGradient></defs>
<rect x=".5" y="19.5" width="34" height="22" rx="2" fill="none" stroke="${T.accent}" stroke-opacity=".45"/>
<text class="m" x="17.5" y="34.5" text-anchor="middle" font-size="12" fill="${T.accent}">${idx}</text>
<text class="s" x="50" y="${ty}" font-size="30" font-weight="700" letter-spacing="-1" fill="${T.ink}">${esc(title)}</text>
<rect class="ln" x="${x1}" y="30" width="${len}" height="1" fill="url(#lg)"/>
<rect class="pk" x="${x1}" y="29.5" width="8" height="2" fill="${T.accent}"/>
<text class="m" x="${W - 2}" y="35" text-anchor="end" font-size="12" fill="${T.meta}"><tspan fill="${T.accent}">$</tspan> ${esc(meta)}</text>`;

    const fileName = `head-${key}${theme === "light" ? "-light" : ""}.svg`;
    writeFileSync(
      join(OUT, fileName),
      svg({ w: W, h: H, doc: d, fonts: ["jbm-400", "sg-700"], title: `${idx} ${title}`, desc: `Section ${idx}: ${title}`, body })
    );
  }
}
console.log(`Generated: all ${Object.keys(SECTIONS).length * 2} section headers (dark & light)`);

/* ----------------------------------------------------------------- Whoami Terminal SVG */
function buildWhoami(stats = null) {
  const d = new Doc(), W = 840, H = 490, X = 28;
  const out = [];

  // CRT scanline drift
  d.rule(`.scan{animation:scan 8s linear infinite}@keyframes scan{from{transform:translateY(0)}to{transform:translateY(490px)}}
@keyframes blink{50%{opacity:0}}
.cur{animation:blink 1s steps(1) infinite}
@keyframes rise{from{opacity:0;transform:translateY(4px)}}
.fade-in{animation:rise 0.4s ease-out both}
.pulse-dot{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.8)}}`);

  out.push(`<defs>
<clipPath id="win"><rect x="1" y="37" width="${W - 2}" height="${H - 38}" rx="5"/></clipPath>
<linearGradient id="sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ff88" stop-opacity="0"/><stop offset=".5" stop-color="#00ff88" stop-opacity=".03"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#win)"><rect class="scan" x="0" y="-24" width="${W}" height="60" fill="url(#sl)"/></g>`);

  // Prompt: cat profile.yml
  const ps = 13, py = 68;
  out.push(`<text class="m" x="${X}" y="${py}" font-size="${ps}" fill="#00ff88">omindud<tspan fill="${C.dim}">:</tspan><tspan fill="${C.cyan}">~</tspan><tspan fill="${C.dim}">$</tspan> <tspan fill="${C.text}">cat profile.yml</tspan></text>`);

  // Left Column YAML items
  const lh = 21;
  let y = 98;
  const item = (key, val, comment = "", valCol = C.text) => {
    const kTxt = `${key.padEnd(12)}`;
    out.push(`<text class="m" x="${X}" y="${y}" font-size="12" fill="${C.cyan}">${kTxt}<tspan fill="${valCol}">${esc(val)}</tspan>${comment ? `  <tspan fill="${C.dim}"># ${esc(comment)}</tspan>` : ""}</text>`);
    y += lh;
  };

  item("name:", "Omindu D. Gunathilaka");
  item("handle:", "OminduD", "@github");
  item("role:", "Aspiring DevOps & Cloud Engineer", "", "#00ff88");
  item("education:", "B.Sc. in Computer Science @ UCSC", "Year 2 · Sem 1");
  item("location:", "Colombo, Sri Lanka");
  item("status:", "ready for devops & cloud roles", "99.99% uptime", C.amber);
  item("focus:", "[cloud infra, k8s, ci/cd automation, sre]", "", C.cyan);
  item("cloud:", "[AWS, GCP, Azure, Linux / Arch]");
  item("containers:", "[Kubernetes, Docker, Helm, Docker Compose]");
  item("iac/cicd:", "[Terraform, GitHub Actions, Ansible, GitOps]");
  item("observing:", "[Prometheus, Grafana, OpenTelemetry]");
  item("code:", "[Go, Python, Rust, Bash, TypeScript]");
  
  // principles
  out.push(`<text class="m" x="${X}" y="${y}" font-size="12" fill="${C.cyan}">principles:</text>`);
  y += lh;
  out.push(`<text class="m" x="${X + 16}" y="${y}" font-size="12" fill="${C.text}">- automate everything     <tspan fill="${C.dim}"># touch it twice? script it</tspan></text>`);
  y += lh;
  out.push(`<text class="m" x="${X + 16}" y="${y}" font-size="12" fill="${C.text}">- immutable infra         <tspan fill="${C.dim}"># cattle, not pets; rebuild</tspan></text>`);
  y += lh;
  out.push(`<text class="m" x="${X + 16}" y="${y}" font-size="12" fill="${C.text}">- observe &amp; measure       <tspan fill="${C.dim}"># unmonitored = down</tspan></text>`);
  y += lh + 8;

  // Next prompt with cursor
  out.push(`<text class="m" x="${X}" y="${y}" font-size="${ps}" fill="#00ff88">omindud<tspan fill="${C.dim}">:</tspan><tspan fill="${C.cyan}">~</tspan><tspan fill="${C.dim}">$</tspan><tspan class="cur" fill="#00ff88"> ▍</tspan></text>`);

  // Right Column: Node Telemetry Box
  const bx = 554, by = 90, bw = 258, bh = 348;
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(bx, by, bw, bh, "#00ff88", 8));
  out.push(`<path d="M${bx} ${by + 32}H${bx + bw}" stroke="${C.line}"/>`);
  out.push(`<circle class="pulse-dot" cx="${bx + 16}" cy="${by + 16}" r="3" fill="none" stroke="#00ff88"/><circle cx="${bx + 16}" cy="${by + 16}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="${bx + 26}" y="${by + 20}" font-size="10.5" font-weight="700" letter-spacing="1.1" fill="#00ff88">SYSTEM TELEMETRY</text>`);
  out.push(`<text class="m" x="${bx + bw - 14}" y="${by + 20}" text-anchor="end" font-size="10" fill="${C.dim}">LIVE</text>`);

  const rows = [
    ["HOST", "workstation-node01"],
    ["OS", "Arch Linux x86_64"],
    ["KERNEL", "6.x-hardened-zen"],
    ["SHELL", "zsh 5.9 (starship)"],
    ["UPTIME", "99.99% (reliable)"],
    ["CLUSTERS", "minikube · k3s mesh"],
    ["PROJECTS", stats?.reposCount ? `${stats.reposCount}+ repositories` : "50+ repositories"]
  ];

  let ry = by + 54;
  rows.forEach(([k, v]) => {
    out.push(`<text class="m" x="${bx + 16}" y="${ry}" font-size="10.5" fill="${C.dim}">${k}</text>`);
    out.push(`<text class="m" x="${bx + bw - 16}" y="${ry}" text-anchor="end" font-size="10.5" fill="${C.text}">${esc(v)}</text>`);
    ry += 22;
  });

  // Meters
  ry += 8;
  out.push(`<text class="m" x="${bx + 16}" y="${ry}" font-size="9.5" letter-spacing="0.8" fill="${C.muted}">CPU LOAD</text><text class="m" x="${bx + bw - 16}" y="${ry}" text-anchor="end" font-size="9.5" fill="#00ff88">18%</text>`);
  ry += 7;
  out.push(`<rect x="${bx + 16}" y="${ry}" width="${bw - 32}" height="6" rx="3" fill="${C.term}"/><rect x="${bx + 16}" y="${ry}" width="42" height="6" rx="3" fill="#00ff88"/>`);

  ry += 20;
  out.push(`<text class="m" x="${bx + 16}" y="${ry}" font-size="9.5" letter-spacing="0.8" fill="${C.muted}">RAM ALLOCATION</text><text class="m" x="${bx + bw - 16}" y="${ry}" text-anchor="end" font-size="9.5" fill="${C.cyan}">12.4G / 32G</text>`);
  ry += 7;
  out.push(`<rect x="${bx + 16}" y="${ry}" width="${bw - 32}" height="6" rx="3" fill="${C.term}"/><rect x="${bx + 16}" y="${ry}" width="88" height="6" rx="3" fill="${C.cyan}"/>`);

  // Target Badge
  ry += 24;
  out.push(`<rect x="${bx + 16}" y="${ry}" width="${bw - 32}" height="25" rx="3" fill="${C.term}" stroke="#00ff88" stroke-opacity=".35"/>`);
  out.push(`<circle cx="${bx + 28}" cy="${ry + 12.5}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="${bx + 38}" y="${ry + 16}" font-size="9" font-weight="700" letter-spacing="1" fill="#00ff88">STATUS: READY TO DEPLOY</text>`);

  const body = chrome(W, H, "omindud@workstation: ~ (zsh)", "cat profile.yml") + "\n" + out.join("\n");
  writeFileSync(
    join(OUT, "whoami.svg"),
    svg({
      w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
      title: "Omindu D. Gunathilaka (@OminduD) — Terminal Profile",
      desc: "Terminal displaying cat profile.yml for Omindu D. Gunathilaka (@OminduD) — Aspiring DevOps and Cloud Engineer with system telemetry",
      body
    })
  );
  console.log("Generated: whoami.svg");
}

/* ----------------------------------------------------------------- Case Study Cards */
const LOCK = (x, y, c) => `<path d="M${x + 1.5} ${y + 5}h7v5.5h-7zM${x + 3} ${y + 5}V${y + 3.2}a2 2 0 0 1 4 0V${y + 5}" fill="none" stroke="${c}" stroke-width="1.2"/>`;

function caseLayout(p) {
  const title = wrap(p.title, "sg-700", 20, 370, 2);
  const sum = wrap(p.summary, "sg-500", 13.5, 370, 3);
  return { title, sum, h: 38 + 34 + (title.length - 1) * 24 + 16 + sum.length * 19.5 + 12 + 22 + 60 };
}

function generateCaseCard(p, i, H) {
  const d = new Doc(), W = 410, X = 20, L = caseLayout(p);
  const out = [];
  out.push(`<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.panel}"/><stop offset="1" stop-color="${C.panel2}"/></linearGradient>
<linearGradient id="sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00ff88" stop-opacity="0"/><stop offset=".5" stop-color="#00ff88" stop-opacity=".09"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
<clipPath id="cc"><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="4"/></clipPath></defs>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="4" fill="url(#bg)" stroke="${C.line}"/>`);

  // scan sweep
  d.rule(`.sw{animation:sw 8s cubic-bezier(.4,0,.2,1) ${(1 + i * 1.6).toFixed(1)}s infinite both}@keyframes sw{0%{transform:translateX(0)}18%,100%{transform:translateX(${W + 260}px)}}`);
  out.push(`<g clip-path="url(#cc)"><rect class="sw" x="-240" y="0" width="200" height="${H}" fill="url(#sw)" transform="skewX(-12)"/></g>`);
  out.push(corners(0.5, 0.5, W - 1, H - 1, "#00ff88"));

  // top bar
  out.push(`<text class="m" x="${X}" y="24" font-size="11" letter-spacing=".9" fill="#00ff88">${p.id}</text>
<text class="m up" x="${W - X}" y="24" text-anchor="end" font-size="10.5" letter-spacing=".8" fill="${C.muted}">${esc(p.type)}</text>
<path d="M1 38.5H${W - 1}" stroke="${C.line}"/>`);

  let y = 38 + 34;
  L.title.forEach((ln, k) => out.push(`<text class="s" x="${X}" y="${y + k * 24}" font-size="20" font-weight="700" letter-spacing="-.4" fill="${C.text}">${esc(ln)}</text>`));
  y += (L.title.length - 1) * 24 + 16;
  L.sum.forEach((ln, k) => out.push(`<text class="s" x="${X}" y="${y + 13 + k * 19.5}" font-size="13.5" font-weight="500" fill="${C.muted}">${esc(ln)}</text>`));
  y += L.sum.length * 19.5 + 12;

  // stack chips
  let cx = X;
  for (const s of p.stack) {
    const w = textWidth(s, "jbm-400", 10.5) + 16;
    if (cx + w > W - X) break;
    out.push(`<rect x="${cx + .5}" y="${y + .5}" width="${w}" height="21" rx="2" fill="${C.term}" stroke="${C.line2}"/><text class="m" x="${cx + 8.5}" y="${y + 15}" font-size="10.5" fill="${C.muted}">${esc(s)}</text>`);
    cx += w + 6;
  }

  // metric + badges pinned to the bottom
  const my = H - 22, [mv, ml] = p.metric;
  const vw = textWidth(mv, "sg-700", 28, -0.8);
  out.push(`<text class="s" x="${X}" y="${my}" font-size="28" font-weight="700" letter-spacing="-.8" fill="#00ff88">${esc(mv)}</text>
<text class="m up" x="${X + vw + 10}" y="${my}" font-size="10" letter-spacing="1" fill="${C.dim}">${esc(ml)}</text>`);
  const metricEnd = X + vw + 10 + textWidth(ml.toUpperCase(), "jbm-400", 10, 1);
  const badgeW = (label) => 8 + 11 + 5 + textWidth(label.toUpperCase(), "jbm-400", 9.5, 0.9) - 0.9 + 8;
  const build = (short) => {
    const list = [];
    if (p.private) list.push({ label: short ? "private" : "private · on request", icon: "lock", color: C.muted, stroke: C.line2 });
    if (p.live) list.push({ label: "live", icon: "dot", color: "#00ff88", stroke: "#00ff88" });
    if (!p.private) list.push({ label: "public repo", icon: "arrow", color: C.muted, stroke: C.line2 });
    return list;
  };

  let badges = build(false);
  if (W - X - badges.reduce((s, b) => s + badgeW(b.label) + 6, 0) < metricEnd + 12) badges = build(true);
  let bx = W - X;
  d.rule(`.lv{transform-box:fill-box;transform-origin:center;animation:lv 1.8s ease-out infinite}@keyframes lv{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.6)}}`);
  for (const b of badges.reverse()) {
    const bw = badgeW(b.label), x0 = bx - bw;
    const icon = b.icon === "lock" ? LOCK(x0 + 7, my - 14, b.color)
      : b.icon === "dot" ? `<circle class="lv" cx="${x0 + 12.5}" cy="${my - 5.5}" r="3.2" fill="none" stroke="#00ff88"/><circle cx="${x0 + 12.5}" cy="${my - 5.5}" r="3.2" fill="#00ff88"/>`
      : `<path d="M${x0 + 8.5} ${my - 1.5}l7-7m-4.5 0h4.5v4.5" fill="none" stroke="${b.color}" stroke-width="1.3"/>`;
    out.push(`<rect x="${x0 + .5}" y="${my - 16.5}" width="${bw}" height="21" rx="2" fill="none" stroke="${b.stroke}" stroke-opacity="${b.color === "#00ff88" ? .55 : 1}"/>${icon}<text class="m up" x="${x0 + 24}" y="${my - 2.5}" font-size="9.5" letter-spacing=".9" fill="${b.color}">${esc(b.label)}</text>`);
    bx = x0 - 6;
  }

  return svg({
    w: W, h: H, doc: d, fonts: ["jbm-400", "sg-500", "sg-700"],
    title: `${p.id}: ${p.title}`,
    desc: `${p.summary} Stack: ${p.stack.join(", ")}. ${p.metric.join(" ")}.${p.private ? " Private repository, available on request." : ""}${p.live ? " Live." : ""}`,
    body: out.join("\n")
  });
}

const cases = [
  {
    file: "case-arch-sandbox", id: "CASE-001", type: "Container Runtime · CLI",
    title: "arch-sandbox: Ephemeral Containers",
    summary: "Lightweight container sandbox CLI utilizing systemd-nspawn and overlay filesystems with zero daemon overhead for secure isolated testing.",
    stack: ["Go", "systemd-nspawn", "OverlayFS", "Linux"],
    metric: ["0", "daemon overhead"],
    live: true, private: false
  },
  {
    file: "case-pulse", id: "CASE-002", type: "Systems · Observability TUI",
    title: "pulse: Real-Time Telemetry Monitor",
    summary: "High-performance async terminal monitoring TUI tracking CPU, memory, thread, and process telemetry in real time with low resource footprint.",
    stack: ["Rust", "Ratatui", "Tokio", "cgroups"],
    metric: ["<1%", "CPU footprint"],
    live: true, private: false
  },
  {
    file: "case-nexus", id: "CASE-003", type: "Production Containerization",
    title: "nexus-enroll2.0 Dockerized Service",
    summary: "Production microservice containerization for university course enrollment featuring multi-stage Docker builds, Nginx reverse proxy, and health probes.",
    stack: ["Docker", "Nginx", "React", "TypeScript"],
    metric: ["70%", "smaller image"],
    live: true, private: false
  },
  {
    file: "case-chronos", id: "CASE-004", type: "Automation · Linux Toolchain",
    title: "ChronosZSH: Unix Provisioning Suite",
    summary: "Automated developer workstation setup and system provisioning across Arch, Debian, and Ubuntu with modern CLI toolchains and shell productivity.",
    stack: ["Bash", "Zsh", "Linux", "DevOps"],
    metric: ["3", "distros supported"],
    live: true, private: false
  },
  {
    file: "case-pantheon", id: "CASE-005", type: "Desktop Linux · Display Engine",
    title: "PantheonSDDM: Cinematic Themes",
    summary: "Hardware-accelerated SDDM login suite featuring 37 cinematic video playlists, interactive TUI installer, and themes for Hyprland, Sway, and KDE.",
    stack: ["Qt/QML", "C++", "Shell", "Linux"],
    metric: ["30+", "GitHub stars"],
    live: true, private: false
  },
  {
    file: "case-ionex", id: "CASE-006", type: "Browser Extension · React",
    title: "Ionex-Tab: Productivity Extension",
    summary: "Published Mozilla Firefox Add-on featuring smart developer dashboard, AI assistant, 3D interactive themes, and focus timer widgets.",
    stack: ["TypeScript", "React", "WebExt", "Firefox"],
    metric: ["100%", "open source"],
    live: true, private: false
  },
  {
    file: "case-analyzer", id: "CASE-007", type: "Static Analysis · Security",
    title: "code_analyzer: Security Engine",
    summary: "High-speed static security analyzer detecting malware patterns, registry abuses, and data exfiltration across Python, PHP, Bash, and C/C++.",
    stack: ["Perl", "Regex", "AST", "Security"],
    metric: ["0ms", "warm overhead"],
    live: true, private: false
  },
  {
    file: "case-cipherpop", id: "CASE-008", type: "Cryptography · CLI Suite",
    title: "CipherPop: Programmable Crypto",
    summary: "Cross-platform cryptographic cipher suite supporting AES-256-GCM, RSA-4096 key-pair generation, and scriptable automated encryption workflows.",
    stack: ["Python", "AES-256", "RSA", "PKI"],
    metric: ["256-bit", "cipher strength"],
    live: true, private: false
  }
];

const cardH = Math.ceil(Math.max(...cases.map((p) => caseLayout(p).h)));
cases.forEach((p, i) => {
  writeFileSync(join(OUT, `${p.file}.svg`), generateCaseCard(p, i, cardH));
  console.log(`Generated: ${p.file}.svg`);
});

/* ----------------------------------------------------------------- Runbook Cards */
function runbookLayout(p) {
  const title = wrap(p.title, "sg-700", 20, 370, 2);
  const sum = wrap(p.summary, "sg-500", 13.5, 370, 3);
  return { title, sum, h: 38 + 34 + (title.length - 1) * 24 + 16 + sum.length * 19.5 + 12 + 22 + 60 };
}

function generateRunbookCard(p, i, H) {
  const d = new Doc(), W = 410, X = 20, L = runbookLayout(p);
  const out = [];
  const accent = p.accent || "#00ff88";

  out.push(`<defs><linearGradient id="bg-${p.file}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.panel}"/><stop offset="1" stop-color="${C.panel2}"/></linearGradient>
<linearGradient id="sw-${p.file}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${accent}" stop-opacity="0"/><stop offset=".5" stop-color="${accent}" stop-opacity=".09"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></linearGradient>
<clipPath id="cc-${p.file}"><rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="4"/></clipPath></defs>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="4" fill="url(#bg-${p.file})" stroke="${C.line}"/>`);

  // scan sweep
  d.rule(`.sw{animation:sw 8s cubic-bezier(.4,0,.2,1) ${(1 + i * 1.3).toFixed(1)}s infinite both}@keyframes sw{0%{transform:translateX(0)}18%,100%{transform:translateX(${W + 260}px)}}
.lv{transform-box:fill-box;transform-origin:center;animation:lv 1.8s ease-out infinite}@keyframes lv{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.6)}}`);
  out.push(`<g clip-path="url(#cc-${p.file})"><rect class="sw" x="-240" y="0" width="200" height="${H}" fill="url(#sw-${p.file})" transform="skewX(-12)"/></g>`);
  out.push(corners(0.5, 0.5, W - 1, H - 1, accent));

  // top bar
  out.push(`<text class="m" x="${X}" y="24" font-size="11" letter-spacing=".9" fill="${accent}">${p.id}</text>
<text class="m up" x="${W - X}" y="24" text-anchor="end" font-size="10.5" letter-spacing=".8" fill="${C.muted}">${esc(p.type)}</text>
<path d="M1 38.5H${W - 1}" stroke="${C.line}"/>`);

  let y = 38 + 34;
  L.title.forEach((ln, k) => out.push(`<text class="s" x="${X}" y="${y + k * 24}" font-size="20" font-weight="700" letter-spacing="-.4" fill="${C.text}">${esc(ln)}</text>`));
  y += (L.title.length - 1) * 24 + 16;
  L.sum.forEach((ln, k) => out.push(`<text class="s" x="${X}" y="${y + 13 + k * 19.5}" font-size="13.5" font-weight="500" fill="${C.muted}">${esc(ln)}</text>`));
  y += L.sum.length * 19.5 + 12;

  // stack chips
  let cx = X;
  for (const s of p.stack) {
    const w = textWidth(s, "jbm-400", 10.5) + 16;
    if (cx + w > W - X) break;
    out.push(`<rect x="${cx + .5}" y="${y + .5}" width="${w}" height="21" rx="2" fill="${C.term}" stroke="${C.line2}"/><text class="m" x="${cx + 8.5}" y="${y + 15}" font-size="10.5" fill="${C.muted}">${esc(s)}</text>`);
    cx += w + 6;
  }

  // metric + status badge pinned to the bottom
  const my = H - 22, [mv, ml] = p.metric;
  const vw = textWidth(mv, "sg-700", 28, -0.8);
  out.push(`<text class="s" x="${X}" y="${my}" font-size="28" font-weight="700" letter-spacing="-.8" fill="${accent}">${esc(mv)}</text>
<text class="m up" x="${X + vw + 10}" y="${my}" font-size="10" letter-spacing="1" fill="${C.dim}">${esc(ml)}</text>`);

  const bw = textWidth(p.badge.label, "jbm-700", 9.5, 0.9) + 26;
  const bx = W - X - bw;
  out.push(`<rect x="${bx + 0.5}" y="${my - 16.5}" width="${bw}" height="21" rx="2" fill="none" stroke="${p.badge.color}" stroke-opacity="0.55"/>
<circle class="lv" cx="${bx + 10.5}" cy="${my - 5.5}" r="3" fill="none" stroke="${p.badge.color}"/><circle cx="${bx + 10.5}" cy="${my - 5.5}" r="3" fill="${p.badge.color}"/>
<text class="m up" x="${bx + 19}" y="${my - 2.5}" font-size="9.5" font-weight="700" letter-spacing="0.9" fill="${p.badge.color}">${esc(p.badge.label)}</text>`);

  return svg({
    w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
    title: `${p.id}: ${p.title}`,
    desc: `${p.summary} Stack: ${p.stack.join(", ")}. Metric: ${p.metric.join(" ")}. Status: ${p.badge.label}.`,
    body: out.join("\n")
  });
}

const runbooks = [
  {
    file: "runbook-cloud", id: "RUNBOOK-001", type: "Multi-AZ · VPC · IAM · OIDC",
    title: "Cloud Architecture & AWS Topology",
    summary: "Multi-AZ VPC network isolation with public and private subnets, NAT Gateways, least-privilege IAM policies, STS AssumeRole, OIDC GitHub federation, and S3 lifecycle tiers.",
    stack: ["AWS VPC", "IAM STS", "EC2 ASG", "S3 Tiers", "OIDC"],
    metric: ["99.99%", "high availability"],
    badge: { label: "PROD-GRADE", color: "#00ff88" },
    accent: "#00ff88"
  },
  {
    file: "runbook-k8s", id: "RUNBOOK-002", type: "Kubernetes · CNI · Helm 3",
    title: "Container Fleet & Kubernetes Mesh",
    summary: "Hardened multi-stage Docker builds with distroless non-root runtimes, declarative Kubernetes Deployments with PDBs, HPA autoscaling, Traefik ingress, and Cilium eBPF network security.",
    stack: ["Kubernetes", "Docker", "Helm 3", "Cilium eBPF", "Traefik"],
    metric: ["0", "root privileges"],
    badge: { label: "HARDENED", color: "#3BD4FF" },
    accent: "#3BD4FF"
  },
  {
    file: "runbook-iac", id: "RUNBOOK-003", type: "Terraform · ArgoCD · GitOps",
    title: "IaC Architecture & GitOps Engine",
    summary: "Modular Terraform HCL with encrypted S3 remote state and DynamoDB distributed locking, automated ArgoCD declarative GitOps reconciliation, and Ansible OS provisioning.",
    stack: ["Terraform", "ArgoCD", "Ansible", "DynamoDB", "HCL"],
    metric: ["0", "manual drift"],
    badge: { label: "GITOPS SYNC", color: "#FFB020" },
    accent: "#FFB020"
  },
  {
    file: "runbook-sre", id: "RUNBOOK-004", type: "Prometheus · Grafana · SRE",
    title: "Observability, SRE & Telemetry",
    summary: "Prometheus time-series metric collection with PromQL alert rules for 5xx spikes and pod restarts, real-time Grafana cyber telemetry, OpenTelemetry tracing, and 4 Golden Signals.",
    stack: ["Prometheus", "Grafana", "OpenTelemetry", "PromQL", "SRE"],
    metric: ["<1s", "alert latency"],
    badge: { label: "SCRAPING", color: "#A78BFA" },
    accent: "#A78BFA"
  },
  {
    file: "runbook-systems", id: "RUNBOOK-005", type: "Rust · Go · C++ Systems",
    title: "Systems Programming & Runtimes",
    summary: "Compile-time memory safety without GC in Rust with Tokio async & Ratatui (pulse), lightweight Go concurrency with Linux namespace sandboxing (arch-sandbox), and C++20 RAII.",
    stack: ["Rust", "Go", "C++20", "Tokio", "Ratatui", "cgroups"],
    metric: ["100%", "memory safe"],
    badge: { label: "NATIVE CODE", color: "#FF7B72" },
    accent: "#FF7B72"
  },
  {
    file: "runbook-network", id: "RUNBOOK-006", type: "Sockets · PKI · TLS 1.3",
    title: "Networking & Cryptographic Security",
    summary: "OSI 7-layer packet flow, TCP 3-way handshake analysis, UDP streaming, DNS hierarchy, AES-256-GCM encryption, RSA-4096 / Ed25519 signatures, and TLS 1.3 handshakes.",
    stack: ["TCP/IP", "Sockets", "TLS 1.3", "AES-256", "RSA-4096"],
    metric: ["256-bit", "cipher strength"],
    badge: { label: "ZERO TRUST", color: "#38BDF8" },
    accent: "#38BDF8"
  }
];

const runbookH = Math.ceil(Math.max(...runbooks.map((p) => runbookLayout(p).h)));
runbooks.forEach((p, i) => {
  writeFileSync(join(OUT, `${p.file}.svg`), generateRunbookCard(p, i, runbookH));
  console.log(`Generated: ${p.file}.svg`);
});

/* ----------------------------------------------------------------- Intel Card */
const education = [
  {
    when: "2024 – 2028",
    status: "in progress",
    t: "B.Sc. in Computer Science",
    o: "University of Colombo School of Computing (UCSC)",
    d: "Year 2 · Semester 1",
    now: true
  },
  {
    when: "2023",
    status: "passed",
    t: "G.C.E. Advanced Level",
    o: "Physical Science Stream",
    d: "Combined Maths, Physics, Chemistry / ICT"
  },
  {
    when: "2020",
    status: "passed",
    t: "G.C.E. Ordinary Level",
    o: "Secondary Education",
    d: "Passed with Distinctions"
  }
];

const devopsPaths = [
  { n: "Linux & Systems Programming", done: true, d: "Arch Linux · Bash & Rust" },
  { n: "Containerization & Docker", done: true, d: "Multi-stage · Rootless" },
  { n: "Kubernetes & Helm Mesh", done: false, d: "in progress · Pod Mesh" },
  { n: "Infrastructure as Code", done: false, d: "Terraform · Ansible" }
];

const certs = [
  { t: "pulse: High-Performance Telemetry Monitor (Rust)", tag: "RUST", d: "2026" },
  { t: "arch-sandbox: Isolated Container Sandboxing (Go)", tag: "GO", d: "2026" },
  { t: "nexus-enroll2.0: Docker Multi-stage Deployment", tag: "DOCKER", d: "2026" },
  { t: "AWS Cloud Infrastructure & Services (S3, IAM, EC2)", tag: "AWS", d: "2025" },
  { t: "ChronosZSH: Automated Unix Workstation Toolchain", tag: "LINUX", d: "2025" },
  { t: "CKA / Kubernetes Administrator Curriculum", tag: "K8S", d: "in progress", wip: true }
];

const d = new Doc(), W = 840, X = 28, out = [];
const label = (x, y, txt, anchor = "start") => `<text class="m" x="${x}" y="${y}" text-anchor="${anchor}" font-size="10.5" letter-spacing="1.6" fill="${C.dim}">${esc(txt)}</text>`;
out.push(label(X, 68, "EDUCATION"), label(520, 68, "CLOUD &amp; DEVOPS PATHS"));

// Animation classes matching janiyax35 intel.svg
d.rule(`@keyframes rise{from{opacity:0;transform:translateY(4px)}}
.p0{animation:rise 0.35s ease-out 0.3s both}
.p1{animation:rise 0.35s ease-out 0.48s both}
.p2{animation:rise 0.35s ease-out 0.66s both}
.spin{transform-box:fill-box;transform-origin:center;animation:spin 3s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.p3{animation:rise 0.35s ease-out 0.5s both}
.p4{animation:rise 0.35s ease-out 0.65s both}
.p5{animation:rise 0.35s ease-out 0.8s both}
.p6{animation:rise 0.35s ease-out 0.95s both}
.p7{animation:rise 0.35s ease-out 1.1s both}
.p8{animation:rise 0.35s ease-out 1.22s both}
.p9{animation:rise 0.35s ease-out 1.34s both}
.pa{animation:rise 0.35s ease-out 1.46s both}
.pb{animation:rise 0.35s ease-out 1.58s both}
.pc{animation:rise 0.35s ease-out 1.70s both}
.pd{animation:rise 0.35s ease-out 1.82s both}
.ring{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.8)}}`);

// Education timeline
const ey = 98, step = 68;
out.push(`<path d="M36.5 ${ey - 4}V${ey - 4 + step * (education.length - 1)}" stroke="${C.line2}"/>`);
education.forEach((e, i) => {
  const y = ey + i * step;
  const tagCol = e.now ? C.amber : "#00ff88";
  const ww = textWidth(e.when, "jbm-400", 11);
  const tw = textWidth(e.status.toUpperCase(), "jbm-400", 9, 0.9) - 0.9 + 12;
  const cls = `p${i}`;
  out.push(`<g class="${cls}">
${e.now ? `<circle class="ring" cx="36.5" cy="${y - 4}" r="5" fill="none" stroke="#00ff88"/><circle cx="36.5" cy="${y - 4}" r="5" fill="#00ff88"/>`
      : `<circle cx="36.5" cy="${y - 4}" r="4.5" fill="${C.term}" stroke="${C.dim}" stroke-width="1.5"/>`}
<text class="m" x="56" y="${y}" font-size="11" fill="${e.now ? "#00ff88" : C.muted}">${esc(e.when)}</text>
<rect x="${56 + ww + 10.5}" y="${y - 10.5}" width="${tw}" height="15" rx="2" fill="none" stroke="${tagCol}" stroke-opacity=".5"/>
<text class="m up" x="${56 + ww + 16.5}" y="${y}" font-size="9" letter-spacing=".9" fill="${tagCol}">${esc(e.status)}</text>
<text class="s" x="56" y="${y + 21}" font-size="16" font-weight="700" letter-spacing="-.2" fill="${C.text}">${esc(e.t)}</text>
<text class="s" x="56" y="${y + 40}" font-size="12.5" font-weight="500" fill="${C.muted}">${esc(e.o)}${e.d ? ` · ${esc(e.d)}` : ""}</text>
</g>`);
});

// DevOps paths
devopsPaths.forEach((p, i) => {
  const y = ey + i * 44, ix = 528, iy = y - 5;
  const icon = p.done
    ? `<circle cx="${ix}" cy="${iy}" r="7" fill="none" stroke="#00ff88" stroke-width="1.5"/><path d="M${ix - 3.2} ${iy}l2.2 2.3 4.2-4.6" fill="none" stroke="#00ff88" stroke-width="1.6"/>`
    : `<circle class="spin" cx="${ix}" cy="${iy}" r="7" fill="none" stroke="${C.amber}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  const cls = `p${3 + i}`;
  out.push(`<g class="${cls}">${icon}<text class="s" x="546" y="${y}" font-size="14.5" font-weight="700" fill="${C.text}">${esc(p.n)}</text><text class="m" x="546" y="${y + 17}" font-size="10.5" fill="${p.done ? C.dim : C.amber}">${esc(p.done ? `active · ${p.d}` : p.d)}</text></g>`);
});
out.push(`<g class="p7">${label(520, 268, "FOCUS SPECIALIZATION")}<text class="s" x="520" y="292" font-size="20" font-weight="700" letter-spacing="-.4" fill="#00ff88">DevOps &amp; Cloud<tspan class="m" font-size="11" font-weight="400" letter-spacing="0" fill="${C.dim}" dx="8">IaC · k8s · CI/CD</tspan></text></g>`);

// Certifications as git log
const gy = 330, fs = 12.5, cw = mono(fs), lh = 25;
out.push(`<path d="M20 310.5H${W - 20}" stroke="${C.line}"/>`, label(X, gy, "PROVABLE WORK &amp; MILESTONES"), label(W - X, gy, `${certs.length} COMMITS · NEWEST FIRST`, "end"));
const TAG = { RUST: "#FF7B72", GO: "#3BD4FF", DOCKER: "#00ff88", AWS: "#FFB020", LINUX: "#A78BFA", K8S: "#38BDF8" };
const commitCls = ["p8", "p9", "pa", "pb", "pc", "pd"];
certs.forEach((c, i) => {
  const y = gy + 32 + i * lh;
  const hash = c.wip ? "·······" : createHash("sha1").update(c.t).digest("hex").slice(0, 7);
  const deco = i === 0 ? `<tspan fill="${C.dim}">(</tspan><tspan fill="${C.cyan}">HEAD -&gt; </tspan><tspan fill="#00ff88">main</tspan><tspan fill="${C.dim}">)</tspan> `
    : c.wip ? `<tspan fill="${C.amber}">(wip)</tspan> ` : "";
  const tc = TAG[c.tag] || C.muted, tw = textWidth(c.tag, "jbm-700", 9.5, 1) - 1 + 14;
  const cls = commitCls[i] || "pd";
  out.push(`<g class="${cls}" font-size="${fs}">
<text class="m" x="${X}" y="${y}" fill="${c.wip ? C.amber : "#00ff88"}">*</text>
<text class="m" x="${X + 2 * cw}" y="${y}" fill="${c.wip ? C.dim : C.amber}" xml:space="preserve">${hash}  ${deco}<tspan fill="${c.wip ? C.muted : C.text}">${esc(c.t)}</tspan></text>
<rect x="${672.5}" y="${y - 11.5}" width="${tw}" height="16" rx="2" fill="none" stroke="${tc}" stroke-opacity=".5"/>
<text class="m" x="${679.5}" y="${y}" font-size="9.5" font-weight="700" letter-spacing="1" fill="${tc}">${c.tag}</text>
<text class="m" x="${W - X}" y="${y}" text-anchor="end" font-size="11.5" fill="${c.wip ? C.amber : C.dim}">${esc(c.d)}</text>
</g>`);
});

const H = gy + 32 + (certs.length - 1) * lh + 26;
writeFileSync(
  join(OUT, "intel.svg"),
  svg({
    w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
    title: "Education, DevOps paths and milestones",
    desc: "Education: University of Colombo School of Computing (UCSC) - B.Sc. in Computer Science; DevOps learning paths and provable project milestones",
    body: chrome(W, H, "intel — ~/education  ~/credentials", "git log") + "\n" + out.join("\n")
  })
);
console.log("Generated: intel.svg");

/* ----------------------------------------------------------------- Live GitHub Telemetry Fetcher */
async function fetchLiveStats(username = "OminduD") {
  let token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) {
    try {
      token = execSync("gh auth token", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    } catch {}
  }

  let cache = {};
  if (existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(readFileSync(CACHE_FILE, "utf8"));
    } catch {}
  }

  const currentYear = new Date().getUTCFullYear();
  const years = [];
  for (let y = 2021; y <= currentYear; y++) years.push(y);

  // Default verified baseline stats (if offline with no cache)
  let stats = {
    stars: "44",
    commits: "2,004",
    yearCommits: "966",
    prs: "35",
    issues: "5",
    contributedTo: "21",
    totalContribs: "2,044",
    currentStreak: "2",
    streakPeriod: "2026-10-17 – 2026-10-18",
    longestStreak: "19",
    longestPeriod: "2025-10-11 – 2025-10-29",
    grade: "A+",
    scorePercent: 0.92,
    langs: [
      { name: "TypeScript", pct: 27.47, color: "#3178c6" },
      { name: "JavaScript", pct: 19.29, color: "#f1e05a" },
      { name: "CSS", pct: 11.80, color: "#663399" },
      { name: "Jupyter Notebook", pct: 11.56, color: "#DA5B0B" },
      { name: "Python", pct: 8.30, color: "#3572A5" },
      { name: "Rust", pct: 5.28, color: "#dea584" },
      { name: "HTML", pct: 4.70, color: "#e34c26" },
      { name: "C#", pct: 3.22, color: "#7355dd" }
    ],
    reposCount: 63,
    contribDataForSpace: null
  };

  // If token is available, fetch complete live metrics via GitHub GraphQL API
  if (token) {
    try {
      const yearQueries = years.map(y => `
        y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") {
          contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
          totalCommitContributions
          restrictedContributionsCount
          commitContributionsByRepository(maxRepositories: 100) { repository { nameWithOwner } }
        }
      `).join("\n");

      const query = JSON.stringify({
        query: `query {
          user(login: "${username}") {
            repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
              totalCount
              nodes {
                name
                stargazerCount
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  edges { size node { name color } }
                }
              }
            }
            forks: repositories(first: 100, ownerAffiliations: OWNER, isFork: true) {
              totalCount
              nodes { stargazerCount }
            }
            pullRequests(states: [OPEN, CLOSED, MERGED]) { totalCount }
            issues(states: [OPEN, CLOSED]) { totalCount }
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
              totalPullRequestContributions
              totalIssueContributions
              totalRepositoriesWithContributedCommits
            }
            ${yearQueries}
          }
        }`
      });

      const res = await new Promise((resolve, reject) => {
        const req = https.request("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "User-Agent": "OminduD-Profile-Builder",
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
          }
        }, (res) => {
          let b = "";
          res.on("data", c => b += c);
          res.on("end", () => {
            if (res.statusCode === 200) {
              try {
                resolve(JSON.parse(b));
              } catch (e) {
                reject(e);
              }
            } else {
              reject(new Error("GraphQL status " + res.statusCode));
            }
          });
        });
        req.on("error", reject);
        req.write(query);
        req.end();
      });

      if (res.data?.user) {
        const u = res.data.user;
        const repos = u.repositories.nodes || [];
        const forks = u.forks?.nodes || [];

        // Stars
        let starSum = 0;
        repos.forEach(r => starSum += (r.stargazerCount || 0));
        forks.forEach(r => starSum += (r.stargazerCount || 0));
        stats.stars = String(starSum);

        // Repositories
        const totalReposCount = (u.repositories.totalCount || 0) + (u.forks?.totalCount || 0);
        stats.reposCount = totalReposCount || 63;

        // Lifetime Commits & Contributions across all active years
        let totalCommits = 0;
        let totalContribs = 0;
        const contributedRepos = new Set();
        const allDaysMap = new Map();

        for (const y of years) {
          const yc = u[`y${y}`];
          if (!yc) continue;
          totalCommits += (yc.totalCommitContributions || 0) + (yc.restrictedContributionsCount || 0);
          totalContribs += (yc.contributionCalendar?.totalContributions || 0);
          for (const r of yc.commitContributionsByRepository || []) {
            if (r.repository?.nameWithOwner) contributedRepos.add(r.repository.nameWithOwner);
          }
          for (const w of yc.contributionCalendar?.weeks || []) {
            for (const d of w.contributionDays || []) {
              allDaysMap.set(d.date, d.contributionCount);
            }
          }
        }

        stats.commits = totalCommits ? totalCommits.toLocaleString() : stats.commits;
        stats.totalContribs = totalContribs ? totalContribs.toLocaleString() : stats.totalContribs;
        if (contributedRepos.size > 0) {
          stats.contributedTo = String(contributedRepos.size);
        } else if (u.contributionsCollection?.totalRepositoriesWithContributedCommits) {
          stats.contributedTo = String(u.contributionsCollection.totalRepositoriesWithContributedCommits);
        }

        // Pull Requests & Issues
        let prCount = u.pullRequests?.totalCount || 0;
        try {
          const searchRes = await new Promise((resolve) => {
            https.get(`https://api.github.com/search/issues?q=type:pr+author:${username}`, {
              headers: { "User-Agent": "OminduD-Profile-Builder", "Authorization": `bearer ${token}` }
            }, (res) => {
              let b = "";
              res.on("data", c => b += c);
              res.on("end", () => {
                try { resolve(JSON.parse(b)); } catch { resolve(null); }
              });
            }).on("error", () => resolve(null));
          });
          if (searchRes?.total_count) prCount = Math.max(prCount, searchRes.total_count);
        } catch {}
        stats.prs = String(prCount || 35);
        stats.issues = String(u.issues?.totalCount || 5);

        // Streaks Calculation
        const todayStr = new Date().toISOString().slice(0, 10);
        const allDays = Array.from(allDaysMap.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date));
        const pastDays = allDays.filter(d => d.date <= todayStr);

        let longestStreak = 0, longestStart = "", longestEnd = "";
        let cur = 0, curStart = "";
        for (const d of pastDays) {
          if (d.count > 0) {
            if (cur === 0) curStart = d.date;
            cur++;
            if (cur > longestStreak) {
              longestStreak = cur;
              longestStart = curStart;
              longestEnd = d.date;
            }
          } else {
            cur = 0;
          }
        }

        let currentStreak = 0, currentStart = "", currentEnd = "";
        let idx = pastDays.length - 1;
        if (pastDays[idx]?.count === 0 && idx > 0 && pastDays[idx - 1]?.count > 0) {
          idx--;
        }
        if (pastDays[idx]?.count > 0) {
          currentEnd = pastDays[idx].date;
          while (idx >= 0 && pastDays[idx]?.count > 0) {
            currentStreak++;
            currentStart = pastDays[idx].date;
            idx--;
          }
        }

        stats.currentStreak = String(currentStreak);
        stats.streakPeriod = currentStreak > 0 ? `${currentStart} – ${currentEnd}` : "Continuous";
        stats.longestStreak = String(longestStreak || 19);
        stats.longestPeriod = longestStart && longestEnd ? `${longestStart} – ${longestEnd}` : "Peak Record";

        // Languages distribution across non-fork repos
        const langMap = {};
        let totalBytes = 0;
        for (const r of repos) {
          for (const e of (r.languages?.edges || [])) {
            const n = e.node.name, col = e.node.color || "#888888", sz = e.size;
            if (!langMap[n]) langMap[n] = { name: n, color: col, size: 0 };
            langMap[n].size += sz;
            totalBytes += sz;
          }
        }
        if (totalBytes > 0) {
          const sorted = Object.values(langMap).sort((a, b) => b.size - a.size).slice(0, 8);
          stats.langs = sorted.map(l => ({
            name: l.name,
            pct: Number(((l.size / totalBytes) * 100).toFixed(2)),
            color: l.color
          }));
        }

        // Calculate dynamic Grade
        const commitsVal = totalCommits || 2004;
        const commitsScore = Math.min(100, (commitsVal / 1500) * 100);
        const starsScore = Math.min(100, (starSum / 50) * 100);
        const prsScore = Math.min(100, (prCount / 30) * 100);
        const reposScore = Math.min(100, (contributedRepos.size / 20) * 100);
        const issuesScore = Math.min(100, (Number(stats.issues) / 5) * 100);
        const finalScore = (commitsScore * 0.35 + starsScore * 0.25 + prsScore * 0.20 + reposScore * 0.10 + issuesScore * 0.10);
        stats.scorePercent = Number((finalScore / 100).toFixed(2));
        stats.grade = finalScore >= 90 ? "A+" : finalScore >= 80 ? "A" : "B+";

        // Trailing 365 days for space game
        const trailingDays = pastDays.slice(-365);
        stats.contribDataForSpace = {
          total: {
            allTime: totalContribs,
            lastYear: trailingDays.reduce((a, b) => a + b.count, 0)
          },
          contributions: trailingDays
        };

        // Update local cache
        try {
          writeFileSync(CACHE_FILE, JSON.stringify(stats.contribDataForSpace, null, 2));
        } catch {}

        console.log(`Live GitHub Telemetry: ${stats.commits} commits, ${stats.stars} stars, ${stats.prs} PRs, ${stats.totalContribs} total contribs, current streak: ${stats.currentStreak}d (${stats.streakPeriod}), longest streak: ${stats.longestStreak}d`);
        return stats;
      }
    } catch (e) {
      console.warn("Could not fetch live GitHub GraphQL stats, trying fallback:", e.message);
    }
  }

  // Fallback if token unavailable or network fails: try jogruber API for contributions
  try {
    const jogruberData = await new Promise((resolve) => {
      https.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`, {
        headers: { "User-Agent": "OminduD-Profile-Builder" }
      }, (res) => {
        let b = "";
        res.on("data", c => b += c);
        res.on("end", () => {
          try { resolve(JSON.parse(b)); } catch { resolve(null); }
        });
      }).on("error", () => resolve(null));
    });

    if (jogruberData?.contributions?.length > 0) {
      let totalAll = 0;
      if (jogruberData.total) {
        for (const v of Object.values(jogruberData.total)) totalAll += Number(v);
      }
      if (totalAll > 0) stats.totalContribs = totalAll.toLocaleString();

      const sorted = jogruberData.contributions.sort((a, b) => a.date.localeCompare(b.date));
      const todayStr = new Date().toISOString().slice(0, 10);
      const pastDays = sorted.filter(d => d.date <= todayStr);

      let longestStreak = 0, longestStart = "", longestEnd = "";
      let cur = 0, curStart = "";
      for (const d of pastDays) {
        if (d.count > 0) {
          if (cur === 0) curStart = d.date;
          cur++;
          if (cur > longestStreak) {
            longestStreak = cur;
            longestStart = curStart;
            longestEnd = d.date;
          }
        } else {
          cur = 0;
        }
      }

      let currentStreak = 0, currentStart = "", currentEnd = "";
      let idx = pastDays.length - 1;
      if (pastDays[idx]?.count === 0 && idx > 0 && pastDays[idx - 1]?.count > 0) idx--;
      if (pastDays[idx]?.count > 0) {
        currentEnd = pastDays[idx].date;
        while (idx >= 0 && pastDays[idx]?.count > 0) {
          currentStreak++;
          currentStart = pastDays[idx].date;
          idx--;
        }
      }

      stats.currentStreak = String(currentStreak);
      stats.streakPeriod = currentStreak > 0 ? `${currentStart} – ${currentEnd}` : "Continuous";
      stats.longestStreak = String(longestStreak || 19);
      stats.longestPeriod = longestStart && longestEnd ? `${longestStart} – ${longestEnd}` : "Peak Record";
    }
  } catch (e) {
    console.warn("Fallback jogruber fetch failed:", e.message);
  }

  return stats;
}

/* ----------------------------------------------------------------- Telemetry Dashboard SVG */
function buildTelemetry(stats = null) {
  if (!stats) {
    stats = {
      stars: "44", commits: "2,004", prs: "35", issues: "5", contributedTo: "21",
      totalContribs: "2,044", currentStreak: "2", streakPeriod: "2026-10-17 – 2026-10-18",
      longestStreak: "19", longestPeriod: "2025-10-11 – 2025-10-29", grade: "A+", scorePercent: 0.92,
      langs: [
        { name: "TypeScript", pct: 27.47, color: "#3178c6" },
        { name: "JavaScript", pct: 19.29, color: "#f1e05a" },
        { name: "CSS", pct: 11.80, color: "#663399" },
        { name: "Jupyter Notebook", pct: 11.56, color: "#DA5B0B" },
        { name: "Python", pct: 8.30, color: "#3572A5" },
        { name: "Rust", pct: 5.28, color: "#dea584" },
        { name: "HTML", pct: 4.70, color: "#e34c26" },
        { name: "C#", pct: 3.22, color: "#7355dd" }
      ]
    };
  }

  const d = new Doc(), W = 840, H = 480;
  const out = [];

  d.rule(`.scan{animation:scan 8s linear infinite}@keyframes scan{from{transform:translateY(0)}to{transform:translateY(${H}px)}}
@keyframes blink{50%{opacity:0}}
.cur{animation:blink 1s steps(1) infinite}
@keyframes rise{from{opacity:0;transform:translateY(4px)}}
.fade-in{animation:rise 0.4s ease-out both}
.pulse-dot{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.8)}}
.flame-glow{filter:drop-shadow(0 0 6px rgba(0,255,136,0.5))}`);

  out.push(`<defs>
<clipPath id="win-telemetry"><rect x="1" y="37" width="${W - 2}" height="${H - 38}" rx="5"/></clipPath>
<linearGradient id="sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ff88" stop-opacity="0"/><stop offset=".5" stop-color="#00ff88" stop-opacity=".03"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#win-telemetry)"><rect class="scan" x="0" y="-24" width="${W}" height="60" fill="url(#sl)"/></g>`);

  // Section 1: Top Row (Side-by-Side: Left = GitHub Stats, Right = Contribution Streak)
  // Left Panel: GitHub Stats
  const p1x = 28, p1y = 54, p1w = 384, p1h = 224;
  out.push(`<rect x="${p1x}" y="${p1y}" width="${p1w}" height="${p1h}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(p1x, p1y, p1w, p1h, "#00ff88", 6));
  out.push(`<path d="M${p1x} ${p1y + 32}H${p1x + p1w}" stroke="${C.line}"/>`);
  out.push(`<circle class="pulse-dot" cx="${p1x + 16}" cy="${p1y + 16}" r="3" fill="none" stroke="#00ff88"/><circle cx="${p1x + 16}" cy="${p1y + 16}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="${p1x + 26}" y="${p1y + 20}" font-size="10.5" font-weight="700" letter-spacing="1.1" fill="#00ff88">GITHUB STATS // LIFETIME</text>`);
  out.push(`<text class="m" x="${p1x + p1w - 14}" y="${p1y + 20}" text-anchor="end" font-size="10" fill="${C.dim}">@OminduD</text>`);

  // GitHub Stats rows
  const statsRows = [
    { label: "Total Stars Earned:", val: stats.stars, icon: `<polygon points="7,1 8.8,4.8 13,5.4 10,8.3 10.7,12.5 7,10.5 3.3,12.5 4,8.3 1,5.4 5.2,4.8" fill="#E3B341"/>` },
    { label: "Total Commits:", val: stats.commits, icon: `<circle cx="7" cy="7" r="2.6" fill="none" stroke="#00ff88" stroke-width="1.6"/><path d="M1 7h3.4M9.6 7H13" stroke="#00ff88" stroke-width="1.6"/>` },
    { label: "Total Pull Requests:", val: stats.prs, icon: `<circle cx="3.5" cy="3.5" r="1.8" fill="none" stroke="#38BDF8" stroke-width="1.3"/><circle cx="10.5" cy="10.5" r="1.8" fill="none" stroke="#38BDF8" stroke-width="1.3"/><circle cx="3.5" cy="10.5" r="1.8" fill="none" stroke="#38BDF8" stroke-width="1.3"/><path d="M3.5 5.3v3.4M10.5 5.3v3.4M5.3 3.5h2.6a2.6 2.6 0 0 1 2.6 2.6" fill="none" stroke="#38BDF8" stroke-width="1.3"/>` },
    { label: "Total Issues Opened:", val: stats.issues, icon: `<circle cx="7" cy="7" r="5" fill="none" stroke="#F87171" stroke-width="1.3"/><path d="M7 4.5v3M7 9.5v.5" stroke="#F87171" stroke-width="1.3" stroke-linecap="round"/>` },
    { label: "Contributed to (repos):", val: stats.contributedTo, icon: `<rect x="2" y="2.5" width="10" height="7.5" rx="1.2" fill="none" stroke="#A78BFA" stroke-width="1.3"/><path d="M4.5 12h5M7 10v2" stroke="#A78BFA" stroke-width="1.3"/>` }
  ];

  let sy = p1y + 54;
  statsRows.forEach((r) => {
    out.push(`<g transform="translate(${p1x + 14}, ${sy - 11})">${r.icon}</g>`);
    out.push(`<text class="s" x="${p1x + 36}" y="${sy}" font-size="12" font-weight="500" fill="${C.muted}">${esc(r.label)}</text>`);
    out.push(`<text class="m" x="${p1x + 236}" y="${sy}" font-size="13" font-weight="700" fill="${C.text}">${r.val}</text>`);
    sy += 31;
  });

  // Grade badge on right side of Left Panel
  const gx = p1x + 314, gy = p1y + 118, gr = 36;
  out.push(`<circle cx="${gx}" cy="${gy}" r="${gr}" fill="${C.term}" stroke="${C.line2}" stroke-width="5"/>`);
  const circ = 2 * Math.PI * gr;
  const scorePct = stats.scorePercent || 0.92;
  out.push(`<circle cx="${gx}" cy="${gy}" r="${gr}" fill="none" stroke="#00ff88" stroke-width="5" stroke-dasharray="${(circ * scorePct).toFixed(1)} ${circ.toFixed(1)}" stroke-linecap="round" transform="rotate(-90 ${gx} ${gy})"/>`);
  out.push(`<text class="s" x="${gx}" y="${gy + 10}" text-anchor="middle" font-size="${(stats.grade || "A+").length > 1 ? 26 : 30}" font-weight="700" fill="${C.text}">${esc(stats.grade || "A+")}</text>`);
  out.push(`<text class="m up" x="${gx}" y="${gy + gr + 16}" text-anchor="middle" font-size="9" font-weight="700" letter-spacing="0.8" fill="#00ff88">GRADE</text>`);

  // Right Panel: Streak Stats
  const p2x = 428, p2y = 54, p2w = 384, p2h = 224;
  out.push(`<rect x="${p2x}" y="${p2y}" width="${p2w}" height="${p2h}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(p2x, p2y, p2w, p2h, "#00ff88", 6));
  out.push(`<path d="M${p2x} ${p2y + 32}H${p2x + p2w}" stroke="${C.line}"/>`);
  out.push(`<circle class="pulse-dot" cx="${p2x + 16}" cy="${p2y + 16}" r="3" fill="none" stroke="#00ff88"/><circle cx="${p2x + 16}" cy="${p2y + 16}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="${p2x + 26}" y="${p2y + 20}" font-size="10.5" font-weight="700" letter-spacing="1.1" fill="#00ff88">CONTRIBUTION STREAK // VELOCITY</text>`);
  out.push(`<text class="m" x="${p2x + p2w - 14}" y="${p2y + 20}" text-anchor="end" font-size="10" fill="${C.dim}">CONTINUOUS</text>`);

  // Vertical column dividers
  const sepY1 = p2y + 50, sepY2 = p2y + 196;
  out.push(`<line x1="${p2x + 120}" y1="${sepY1}" x2="${p2x + 120}" y2="${sepY2}" stroke="${C.line2}" stroke-dasharray="2 2"/>`);
  out.push(`<line x1="${p2x + 264}" y1="${sepY1}" x2="${p2x + 264}" y2="${sepY2}" stroke="${C.line2}" stroke-dasharray="2 2"/>`);

  // Left Metric: Total Contributions
  const m1x = p2x + 60;
  out.push(`<text class="s" x="${m1x}" y="152" text-anchor="middle" font-size="26" font-weight="700" letter-spacing="-0.5" fill="${C.text}">${esc(stats.totalContribs)}</text>`);
  out.push(`<text class="m up" x="${m1x}" y="178" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.8" fill="${C.dim}">TOTAL CONTRIBS</text>`);
  out.push(`<text class="m" x="${m1x}" y="196" text-anchor="middle" font-size="9" fill="${C.muted}">2021 – Present</text>`);

  // Center Column: Streak Ring & Flame
  const fx = p2x + 192, fy = 144, fr = 34;
  out.push(`<defs>
<mask id="streak-ring-cut">
  <rect x="${fx - fr - 10}" y="${fy - fr - 10}" width="${(fr + 10) * 2}" height="${(fr + 10) * 2}" fill="white"/>
  <ellipse cx="${fx}" cy="${fy - fr}" rx="14" ry="12" fill="black"/>
</mask>
</defs>`);

  out.push(`<circle cx="${fx}" cy="${fy}" r="${fr}" fill="${C.term}" stroke="${C.line2}" stroke-width="4"/>`);
  out.push(`<circle cx="${fx}" cy="${fy}" r="${fr}" fill="none" stroke="#00ff88" stroke-width="4" mask="url(#streak-ring-cut)" filter="drop-shadow(0 0 5px rgba(0,255,136,0.5))"/>`);

  // Flame icon perched at top of ring
  out.push(`<g transform="translate(${fx}, ${fy - fr - 12})" class="flame-glow">
    <path d="M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z" fill="#00ff88"/>
  </g>`);

  // Big number centered inside ring
  out.push(`<text class="s" x="${fx}" y="${fy + 10}" text-anchor="middle" font-size="28" font-weight="700" fill="#00ff88">${esc(stats.currentStreak)}</text>`);

  // Clear space below ring for label
  out.push(`<text class="m up" x="${fx}" y="${fy + fr + 20}" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.8" fill="#00ff88">CURRENT STREAK</text>`);
  out.push(`<text class="m" x="${fx}" y="${fy + fr + 36}" text-anchor="middle" font-size="9" fill="${C.dim}">${esc(stats.streakPeriod)}</text>`);

  // Right Metric: Longest Streak
  const m2x = p2x + 324;
  out.push(`<text class="s" x="${m2x}" y="152" text-anchor="middle" font-size="26" font-weight="700" letter-spacing="-0.5" fill="${C.text}">${esc(stats.longestStreak)}</text>`);
  out.push(`<text class="m up" x="${m2x}" y="178" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.8" fill="${C.dim}">LONGEST STREAK</text>`);
  out.push(`<text class="m" x="${m2x}" y="196" text-anchor="middle" font-size="9" fill="${C.muted}">${esc(stats.longestPeriod)}</text>`);

  // Section 2: Bottom Panel (Most Used Languages)
  const p3x = 28, p3y = 294, p3w = 784, p3h = 162;
  out.push(`<rect x="${p3x}" y="${p3y}" width="${p3w}" height="${p3h}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(p3x, p3y, p3w, p3h, "#00ff88", 6));
  out.push(`<path d="M${p3x} ${p3y + 32}H${p3x + p3w}" stroke="${C.line}"/>`);
  out.push(`<circle class="pulse-dot" cx="${p3x + 16}" cy="${p3y + 16}" r="3" fill="none" stroke="#00ff88"/><circle cx="${p3x + 16}" cy="${p3y + 16}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="${p3x + 26}" y="${p3y + 20}" font-size="10.5" font-weight="700" letter-spacing="1.1" fill="#00ff88">MOST USED LANGUAGES &amp; WORKLOADS</text>`);
  out.push(`<text class="m" x="${p3x + p3w - 14}" y="${p3y + 20}" text-anchor="end" font-size="10" fill="${C.dim}">${stats.langs.length} PRIMARY RUNTIMES</text>`);

  // Language segmented bar (proportional across top languages)
  const barX = p3x + 18, barY = p3y + 48, barW = p3w - 36, barH = 10;
  out.push(`<g clip-path="url(#lang-bar-clip)">`);
  out.push(`<defs><clipPath id="lang-bar-clip"><rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="5"/></clipPath></defs>`);
  let curX = barX;
  const topTotal = stats.langs.reduce((a, b) => a + b.pct, 0) || 100;
  stats.langs.forEach((l, idx) => {
    const isLast = idx === stats.langs.length - 1;
    const segW = (l.pct / topTotal) * barW;
    const w = isLast ? (barX + barW - curX) : segW;
    out.push(`<rect x="${curX.toFixed(2)}" y="${barY}" width="${(w + 0.5).toFixed(2)}" height="${barH}" fill="${l.color}"/>`);
    curX += segW;
  });
  out.push(`</g>`);

  // Language grid (2 rows x 4 columns)
  const colW = (p3w - 36) / 4;
  stats.langs.forEach((l, idx) => {
    const row = Math.floor(idx / 4);
    const col = idx % 4;
    const lx = barX + col * colW;
    const ly = barY + 34 + row * 38;
    out.push(`<circle cx="${lx + 6}" cy="${ly - 4}" r="4.5" fill="${l.color}"/>`);
    out.push(`<text class="s" x="${lx + 18}" y="${ly}" font-size="12" font-weight="600" fill="${C.text}">${esc(l.name)}</text>`);
    out.push(`<text class="m" x="${lx + 18}" y="${ly + 16}" font-size="10.5" fill="${C.dim}">${l.pct.toFixed(2)}%</text>`);
  });

  const body = chrome(W, H, "omindu@workstation: ~ (telemetry)", "promtool check metrics --live") + "\n" + out.join("\n");
  writeFileSync(
    join(OUT, "telemetry.svg"),
    svg({
      w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
      title: "Omindu — GitHub Stats & Observability Telemetry",
      desc: "GitHub Telemetry: Stars, Commits, Pull Requests, Contribution Streak Velocity, and Most Used Language Distribution",
      body
    })
  );
  console.log("Generated: telemetry.svg");
}

/* ----------------------------------------------------------------- DevOps & Cloud Curriculum SVG */
function buildDevOpsCurriculum() {
  const d = new Doc(), W = 840, H = 586;
  const out = [];

  d.rule(`.scan{animation:scan 8s linear infinite}@keyframes scan{from{transform:translateY(0)}to{transform:translateY(${H}px)}}
@keyframes blink{50%{opacity:0}}
.cur{animation:blink 1s steps(1) infinite}
@keyframes rise{from{opacity:0;transform:translateY(4px)}}
.fade-in{animation:rise 0.4s ease-out both}
.pulse-dot{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.8)}}`);

  out.push(`<defs>
<clipPath id="win-curriculum"><rect x="1" y="37" width="${W - 2}" height="${H - 38}" rx="5"/></clipPath>
<linearGradient id="sl-curr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ff88" stop-opacity="0"/><stop offset=".5" stop-color="#00ff88" stop-opacity=".03"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#win-curriculum)"><rect class="scan" x="0" y="-24" width="${W}" height="60" fill="url(#sl-curr)"/></g>`);

  // Subheader banner
  out.push(`<circle class="pulse-dot" cx="36" cy="58" r="3" fill="none" stroke="#00ff88"/><circle cx="36" cy="58" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="48" y="62" font-size="11" font-weight="700" letter-spacing="1.2" fill="#00ff88">DEVOPS &amp; CLOUD INFRASTRUCTURE RUNBOOKS // COMPETENCY MATRIX</text>`);
  out.push(`<text class="m" x="${W - 28}" y="62" text-anchor="end" font-size="10.5" fill="${C.dim}">ENVIRONMENT: <tspan fill="${C.cyan}">PRODUCTION</tspan> · ORCHESTRATION: <tspan fill="#00ff88">AUTOMATED</tspan></text>`);
  out.push(`<line x1="28" y1="72" x2="${W - 28}" y2="72" stroke="${C.line}"/>`);

  const tracks = [
    {
      col: 0, row: 0,
      accent: "#00ff88", tag: "AWS · GCP",
      title: "01 // CLOUD ARCHITECTURE &amp; TOPOLOGY",
      items: [
        { name: "AWS Multi-AZ VPC Architecture", desc: "Public/Private Subnets · NAT Gateways · Route Tables", status: "PROD", sc: "#00ff88" },
        { name: "Zero-Trust Identity &amp; Access", desc: "IAM Least Privilege · STS AssumeRole · OIDC · KMS", status: "LOCKED", sc: "#00ff88" },
        { name: "Compute &amp; Serverless Engines", desc: "EC2 Auto-Scaling · ECS Fargate · Lambda Functions", status: "ACTIVE", sc: "#3BD4FF" },
        { name: "Resilient Object &amp; Block Store", desc: "S3 Lifecycle Policies · Bucket Policies · EBS gp3", status: "VERIFIED", sc: "#00ff88" }
      ]
    },
    {
      col: 1, row: 0,
      accent: "#3BD4FF", tag: "K8S · CNI",
      title: "02 // CONTAINER FLEET &amp; KUBERNETES MESH",
      items: [
        { name: "Production Docker Hardening", desc: "Multi-Stage Builds · Distroless Base · Trivy Scans", status: "HARDENED", sc: "#00ff88" },
        { name: "Kubernetes Workload Fleet", desc: "Deployments · StatefulSets · DaemonSets · HPA", status: "ACTIVE", sc: "#3BD4FF" },
        { name: "Ingress &amp; CNI Mesh Networking", desc: "Traefik · NGINX · Cert-Manager TLS · Cilium eBPF", status: "ROUTED", sc: "#3BD4FF" },
        { name: "Helm 3 Package Ecosystem", desc: "Parametric Charts · Sub-charts · Values Schema", status: "DEPLOYED", sc: "#00ff88" }
      ]
    },
    {
      col: 0, row: 1,
      accent: "#FFB020", tag: "TERRAFORM",
      title: "03 // INFRASTRUCTURE AS CODE &amp; GITOPS",
      items: [
        { name: "Terraform HCL Architecture", desc: "Modular Infrastructure · DRY Pattern · Variables", status: "MODULAR", sc: "#FFB020" },
        { name: "Remote State &amp; State Locking", desc: "S3 Backend · DynamoDB Distributed Lock Table", status: "SECURED", sc: "#00ff88" },
        { name: "GitOps Continuous Delivery", desc: "ArgoCD Automated Sync · Zero-Drift Pull Engine", status: "GITOPS", sc: "#FFB020" },
        { name: "Ansible Fleet Provisioning", desc: "Idempotent Playbooks · Node Hardening · SSH", status: "AUTOMATED", sc: "#00ff88" }
      ]
    },
    {
      col: 1, row: 1,
      accent: "#A78BFA", tag: "METRICS",
      title: "04 // OBSERVABILITY, SRE &amp; TELEMETRY",
      items: [
        { name: "Prometheus Metric Collection", desc: "PromQL Rules · Node Exporter · Blackbox Probes", status: "SCRAPING", sc: "#00ff88" },
        { name: "Grafana Cyber Dashboards", desc: "Real-time Telemetry · Incident Panels · Alerts", status: "ONLINE", sc: "#3BD4FF" },
        { name: "Distributed Tracing &amp; Logs", desc: "OpenTelemetry SDK · Vector Pipeline · JSON Logs", status: "TRACED", sc: "#A78BFA" },
        { name: "SRE Principles &amp; Chaos Drills", desc: "4 Golden Signals · SLO Error Budgets · Drills", status: "99.99%", sc: "#00ff88" }
      ]
    }
  ];

  tracks.forEach((t) => {
    const x = t.col === 0 ? 28 : 428;
    const y = t.row === 0 ? 84 : 302;
    const w = 384, h = 206;

    out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
    out.push(corners(x, y, w, h, t.accent, 6));
    out.push(`<path d="M${x} ${y + 32}H${x + w}" stroke="${C.line}"/>`);
    out.push(`<circle class="pulse-dot" cx="${x + 16}" cy="${y + 16}" r="3" fill="none" stroke="${t.accent}"/><circle cx="${x + 16}" cy="${y + 16}" r="3" fill="${t.accent}"/>`);
    out.push(`<text class="m up" x="${x + 26}" y="${y + 20}" font-size="10.5" font-weight="700" letter-spacing="1.1" fill="${t.accent}">${t.title}</text>`);
    out.push(`<text class="m" x="${x + w - 14}" y="${y + 20}" text-anchor="end" font-size="10" fill="${C.dim}">${t.tag}</text>`);

    let cy = y + 52;
    t.items.forEach((item) => {
      // Small bullet dot
      out.push(`<circle cx="${x + 16}" cy="${cy - 4}" r="2.5" fill="${t.accent}"/>`);
      // Title
      out.push(`<text class="s" x="${x + 28}" y="${cy}" font-size="12" font-weight="600" fill="${C.text}">${item.name}</text>`);
      // Desc
      out.push(`<text class="m" x="${x + 28}" y="${cy + 14}" font-size="9.5" fill="${C.dim}">${item.desc}</text>`);

      // Status Badge
      const bw = 58, bh = 17;
      const bx = x + w - 14 - bw, by = cy - 10;
      out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="2" fill="none" stroke="${item.sc}" stroke-opacity=".5"/>`);
      out.push(`<text class="m up" x="${bx + bw / 2}" y="${by + 11.5}" text-anchor="middle" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="${item.sc}">${item.status}</text>`);

      cy += 41;
    });
  });

  // Global bottom status bar
  const fx = 28, fy = 522, fw = 784, fh = 40;
  out.push(`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(fx, fy, fw, fh, "#00ff88", 6));
  out.push(`<circle class="pulse-dot" cx="${fx + 16}" cy="${fy + 20}" r="3" fill="none" stroke="#00ff88"/><circle cx="${fx + 16}" cy="${fy + 20}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m" x="${fx + 28}" y="${fy + 24}" font-size="10.5" fill="${C.text}"><tspan fill="#00ff88">STATUS:</tspan> 4/4 DOMAINS ENGAGED · <tspan fill="${C.cyan}">AUTOMATED DRIFT DETECTION</tspan> · <tspan fill="${C.amber}">ZERO-DOWNTIME CI/CD</tspan></text>`);
  out.push(`<text class="m" x="${fx + fw - 16}" y="${fy + 24}" text-anchor="end" font-size="10.5" fill="${C.dim}">AVAILABILITY TARGET: <tspan fill="#00ff88">99.99%</tspan></text>`);

  const body = chrome(W, H, "omindu@cloud-mesh: ~ (curriculum)", "kubectl get matrix -n devops") + "\n" + out.join("\n");
  writeFileSync(
    join(OUT, "devops-curriculum.svg"),
    svg({
      w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
      title: "Omindu — DevOps & Cloud Infrastructure Curriculum Matrix",
      desc: "Comprehensive competency matrix across Cloud Architecture, Kubernetes & Containers, IaC & GitOps, and Observability & SRE",
      body
    })
  );
  console.log("Generated: devops-curriculum.svg");
}

/* ----------------------------------------------------------------- Workloads Matrix SVG */
function buildWorkloadsMatrix() {
  const d = new Doc(), W = 840, H = 490;
  const out = [];

  d.rule(`.scan{animation:scan 8s linear infinite}@keyframes scan{from{transform:translateY(0)}to{transform:translateY(${H}px)}}
@keyframes blink{50%{opacity:0}}
.cur{animation:blink 1s steps(1) infinite}
@keyframes rise{from{opacity:0;transform:translateY(4px)}}
.fade-in{animation:rise 0.4s ease-out both}
.pulse-dot{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.8)}}`);

  out.push(`<defs>
<clipPath id="win-workloads"><rect x="1" y="37" width="${W - 2}" height="${H - 38}" rx="5"/></clipPath>
<linearGradient id="sl-workloads" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ff88" stop-opacity="0"/><stop offset=".5" stop-color="#00ff88" stop-opacity=".03"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
</defs>
<g clip-path="url(#win-workloads)"><rect class="scan" x="0" y="-24" width="${W}" height="60" fill="url(#sl-workloads)"/></g>`);

  // Subheader banner
  out.push(`<circle class="pulse-dot" cx="36" cy="58" r="3" fill="none" stroke="#00ff88"/><circle cx="36" cy="58" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="48" y="62" font-size="11" font-weight="700" letter-spacing="1.2" fill="#00ff88">PRODUCTION WORKLOADS &amp; CLUSTER DEPLOYMENTS // ACTIVE FLEET</text>`);
  out.push(`<text class="m" x="${W - 28}" y="62" text-anchor="end" font-size="10.5" fill="${C.dim}">FLEET: <tspan fill="#00ff88">8 SERVICES</tspan> · STATUS: <tspan fill="${C.cyan}">HEALTHY</tspan></text>`);
  out.push(`<line x1="28" y1="72" x2="${W - 28}" y2="72" stroke="${C.line}"/>`);

  // Table Container Box
  const bx = 28, by = 86, bw = 784, bh = 340;
  out.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(bx, by, bw, bh, "#00ff88", 6));

  // Table Header row
  const hy = by + 24;
  out.push(`<text class="m up" x="${bx + 18}" y="${hy}" font-size="10" font-weight="700" letter-spacing="0.8" fill="${C.dim}">WORKLOAD NAME</text>`);
  out.push(`<text class="m up" x="${bx + 185}" y="${hy}" font-size="10" font-weight="700" letter-spacing="0.8" fill="${C.dim}">NAMESPACE</text>`);
  out.push(`<text class="m up" x="${bx + 300}" y="${hy}" font-size="10" font-weight="700" letter-spacing="0.8" fill="${C.dim}">REPLICAS</text>`);
  out.push(`<text class="m up" x="${bx + 388}" y="${hy}" font-size="10" font-weight="700" letter-spacing="0.8" fill="${C.dim}">STATUS</text>`);
  out.push(`<text class="m up" x="${bx + 482}" y="${hy}" font-size="10" font-weight="700" letter-spacing="0.8" fill="${C.dim}">PRIMARY RUNTIME / ARCHITECTURE</text>`);
  out.push(`<line x1="${bx}" y1="${by + 34}" x2="${bx + bw}" y2="${by + 34}" stroke="${C.line}"/>`);

  const rows = [
    { name: "pulse", ns: "production", rep: "3/3", st: "Running", sc: "#00ff88", rt: "Rust 1.78 · Tokio · Ratatui TUI" },
    { name: "arch-sandbox", ns: "isolated", rep: "1/1", st: "Active", sc: "#3BD4FF", rt: "Go 1.22 · systemd-nspawn · OverlayFS" },
    { name: "nexus-enroll2.0", ns: "production", rep: "4/4", st: "Running", sc: "#00ff88", rt: "Docker Multi-stage · Nginx · React TS" },
    { name: "ChronosZSH", ns: "workstation", rep: "1/1", st: "Synced", sc: "#FFB020", rt: "Zsh · Bash · Arch/Debian/Ubuntu Suite" },
    { name: "PantheonSDDM", ns: "desktop-rice", rep: "1/1", st: "Ready", sc: "#00ff88", rt: "Qt/QML · C++20 · 37 Video Engines" },
    { name: "Ionex-Tab", ns: "addons", rep: "1/1", st: "Active", sc: "#3BD4FF", rt: "TypeScript · React · Mozilla Firefox Add-on" },
    { name: "code_analyzer", ns: "security-sec", rep: "2/2", st: "Scanning", sc: "#A78BFA", rt: "Perl 5 · Regex Engine · AST Inspector" },
    { name: "CipherPop", ns: "crypto-vault", rep: "1/1", st: "Locked", sc: "#FF7B72", rt: "Python 3.12 · AES-256-GCM · RSA-4096" }
  ];

  let ry = by + 64;
  rows.forEach((r, idx) => {
    // Alternating faint row tint
    if (idx % 2 === 1) {
      out.push(`<rect x="${bx + 1}" y="${ry - 18}" width="${bw - 2}" height="35" fill="${C.panel}" opacity="0.4"/>`);
    }
    // Name
    out.push(`<text class="s" x="${bx + 18}" y="${ry}" font-size="13" font-weight="700" fill="${C.text}">${r.name}</text>`);
    // Namespace
    out.push(`<text class="m" x="${bx + 185}" y="${ry}" font-size="11" fill="${C.muted}">${r.ns}</text>`);
    // Replicas
    out.push(`<text class="m" x="${bx + 300}" y="${ry}" font-size="11" fill="${C.cyan}">${r.rep}</text>`);
    // Status badge pill
    const sw = 64, sh = 17;
    out.push(`<rect x="${bx + 388}" y="${ry - 11}" width="${sw}" height="${sh}" rx="2" fill="none" stroke="${r.sc}" stroke-opacity="0.5"/>`);
    out.push(`<text class="m up" x="${bx + 388 + sw / 2}" y="${ry + 1}" text-anchor="middle" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="${r.sc}">${r.st}</text>`);
    // Runtime
    out.push(`<text class="m" x="${bx + 482}" y="${ry}" font-size="11" fill="${C.muted}">${r.rt}</text>`);

    ry += 35;
  });

  // Global bottom status bar
  const fx = 28, fy = 440, fw = 784, fh = 36;
  out.push(`<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="4" fill="${C.panel2}" stroke="${C.line}"/>`);
  out.push(corners(fx, fy, fw, fh, "#00ff88", 6));
  out.push(`<circle class="pulse-dot" cx="${fx + 16}" cy="${fy + 18}" r="3" fill="none" stroke="#00ff88"/><circle cx="${fx + 16}" cy="${fy + 18}" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m" x="${fx + 28}" y="${fy + 22}" font-size="10.5" fill="${C.text}"><tspan fill="#00ff88">REPLICAS:</tspan> 14/14 HEALTHY · <tspan fill="${C.cyan}">ZERO RESTART OVERHEAD</tspan> · <tspan fill="${C.amber}">ROLLING UPDATE STRATEGY</tspan></text>`);
  out.push(`<text class="m" x="${fx + fw - 16}" y="${fy + 22}" text-anchor="end" font-size="10.5" fill="${C.dim}">AUTO-HEALING: <tspan fill="#00ff88">ENABLED</tspan></text>`);

  const body = chrome(W, H, "omindu@cloud-mesh: ~ (workloads)", "kubectl get deployments -A -o wide") + "\n" + out.join("\n");
  writeFileSync(
    join(OUT, "workloads-matrix.svg"),
    svg({
      w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
      title: "Omindu — Production Workloads & Cluster Deployments",
      desc: "Live status and deployment overview of all active open-source production workloads, container images, and runtime architectures",
      body
    })
  );
  console.log("Generated: workloads-matrix.svg");
}

/* ----------------------------------------------------------------- Execution */
const liveStats = await fetchLiveStats("OminduD");
buildWhoami(liveStats);
buildTelemetry(liveStats);
buildDevOpsCurriculum();
buildWorkloadsMatrix();



