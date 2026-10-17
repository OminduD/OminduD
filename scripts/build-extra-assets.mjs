import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "/home/omindu/Documents/OminduD/assets";
mkdirSync(OUT, { recursive: true });

/* ==========================================================================
   0. ACTION BUTTONS (Portfolio, Projects, Learning, LinkedIn, Email)
   ========================================================================== */
export function buildButtons() {
  const buttons = [
    {
      file: "btn-portfolio.svg", w: 140, h: 40, label: "portfolio",
      icon: `<path d="M19 25L27 17M20 17H27V24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="square"/>`,
      textX: 38
    },
    {
      file: "btn-projects.svg", w: 132, h: 40, label: "projects",
      icon: `<text class="mono" x="18" y="24" font-size="12" font-weight="700" fill="#00ff88">&gt;_</text>`,
      textX: 42
    },
    {
      file: "btn-learning.svg", w: 134, h: 40, label: "learning",
      icon: `<text class="mono" x="18" y="24" font-size="12" font-weight="700" fill="#00ff88">//</text>`,
      textX: 42
    },
    {
      file: "btn-linkedin.svg", w: 130, h: 40, label: "linkedin",
      icon: `<rect x="18.75" y="13.75" width="12.5" height="12.5" rx="2" fill="none" stroke="#00ff88" stroke-width="1.5"/><text class="mono" x="25" y="23.3" text-anchor="middle" font-size="8" font-weight="700" fill="#00ff88">in</text>`,
      textX: 42
    },
    {
      file: "btn-email.svg", w: 112, h: 40, label: "email",
      icon: `<text class="mono" x="18" y="24" font-size="14" font-weight="700" fill="#00ff88">@</text>`,
      textX: 40
    }
  ];

  buttons.forEach(btn => {
    const content = `<svg xmlns="http://www.w3.org/2000/svg" width="${btn.w}" height="${btn.h}" viewBox="0 0 ${btn.w} ${btn.h}" role="img" aria-label="${btn.label}">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    .shine { animation: shine 6s ease-in-out 1s infinite both; }
    @keyframes shine { 0% { transform: translateX(0); } 25%, 100% { transform: translateX(${btn.w + 80}px); } }
  </style>
  <defs>
    <clipPath id="b-${btn.label}"><rect x=".5" y=".5" width="${btn.w - 1}" height="${btn.h - 1}" rx="6"/></clipPath>
    <linearGradient id="g-${btn.label}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00ff88" stop-opacity="0"/>
      <stop offset=".5" stop-color="#00ff88" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#00ff88" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x=".5" y=".5" width="${btn.w - 1}" height="${btn.h - 1}" rx="6" fill="#0d1320" stroke="#ffffff" stroke-opacity=".1"/>
  <g clip-path="url(#b-${btn.label})">
    <rect class="shine" x="-70" y="0" width="60" height="${btn.h}" fill="url(#g-${btn.label})" transform="skewX(-20)"/>
  </g>
  ${btn.icon}
  <text class="mono" x="${btn.textX}" y="24.5" font-size="12" font-weight="700" letter-spacing="1.4" fill="#e6edf3">${btn.label.toUpperCase()}</text>
  <rect x=".5" y=".5" width="${btn.w - 1}" height="${btn.h - 1}" rx="6" fill="none" stroke="#00ff88" stroke-opacity=".3" stroke-width="1"/>
</svg>`;
    writeFileSync(join(OUT, btn.file), content);
  });
  console.log("Generated: 5 action buttons with unified glassmorphism styling");
}

/* ==========================================================================
   1. HERO WIDESCREEN BANNER (1600x900)
   ========================================================================== */
export function buildHero() {
  let avatarBase64 = "";
  const avatarPath = join(OUT, "avatar.jpg");
  if (existsSync(avatarPath)) {
    avatarBase64 = `data:image/jpeg;base64,${readFileSync(avatarPath).toString("base64")}`;
  }

  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="Omindu D. Gunathilaka — Aspiring DevOps and Cloud Engineer">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    .sans { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
    @keyframes drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
    @keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,30px); } }
    @keyframes pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
    @keyframes scan { from { transform: translateY(-900px); } to { transform: translateY(900px); } }
    @keyframes rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes dash { to { stroke-dashoffset: -400; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    .orbA { animation: drift 12s ease-in-out infinite; }
    .orbB { animation: drift2 14s ease-in-out infinite; }
    .scan { animation: scan 7s linear infinite; }
    .r1 { animation: rise .9s ease-out .2s both; }
    .r2 { animation: rise .9s ease-out .5s both; }
    .r3 { animation: rise .9s ease-out .8s both; }
    .r4 { animation: rise .9s ease-out 1.1s both; }
    .r5 { animation: rise .9s ease-out 1.4s both; }
    .l1 { animation: rise .4s ease-out 1.8s both; }
    .l2 { animation: rise .4s ease-out 2.4s both; }
    .l3 { animation: rise .4s ease-out 3.0s both; }
    .l4 { animation: rise .4s ease-out 3.6s both; }
    .l5 { animation: rise .4s ease-out 4.2s both; }
    .cursor { animation: blink 1s step-end infinite; }
    .live { animation: pulse 1.6s ease-in-out infinite; }
    .flow { stroke-dasharray: 6 10; animation: dash 6s linear infinite; }
    .ring { transform-origin: 1290px 250px; animation: spin 30s linear infinite; }
  </style>

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07090f"/>
      <stop offset="1" stop-color="#0d1320"/>
    </linearGradient>
    <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#00ff88" stop-opacity=".55"/>
      <stop offset="1" stop-color="#00ff88" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#1E90FF" stop-opacity=".45"/>
      <stop offset="1" stop-color="#1E90FF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" x1="0" x2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".55" stop-color="#b9ffc7"/>
      <stop offset="1" stop-color="#00ff88"/>
    </linearGradient>
    <linearGradient id="scanG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#00ff88" stop-opacity="0"/>
      <stop offset=".5" stop-color="#00ff88" stop-opacity=".08"/>
      <stop offset="1" stop-color="#00ff88" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity=".045"/>
    </pattern>
    <clipPath id="frame"><rect x="0" y="0" width="1600" height="900" rx="36"/></clipPath>
    <clipPath id="avatarClip">
      <circle cx="1290" cy="250" r="88"/>
    </clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="1600" height="900" fill="url(#bg)"/>
    <rect width="1600" height="900" fill="url(#grid)"/>
    <circle class="orbA" cx="1250" cy="200" r="380" fill="url(#glowG)"/>
    <circle class="orbB" cx="260" cy="780" r="420" fill="url(#glowB)"/>
    <rect class="scan" width="1600" height="260" fill="url(#scanG)"/>

    <!-- Top bar -->
    <g class="mono r1" font-size="18" fill="#8b93a7">
      <circle cx="80" cy="70" r="7" fill="#00ff88" class="live"/>
      <text x="100" y="76">OMINDUD.CLOUD</text>
      <text x="1520" y="76" text-anchor="end">LK · UTC+05:30 · ASPIRING DEVOPS &amp; CLOUD ENGINEER</text>
    </g>
    <line x1="64" y1="106" x2="1536" y2="106" stroke="#ffffff" stroke-opacity=".08"/>

    <!-- Left: identity -->
    <g class="sans">
      <text class="mono r1" x="80" y="240" font-size="22" fill="#00ff88" letter-spacing="6">// ASPIRING DEVOPS &amp; CLOUD ENGINEER</text>
      <text class="r2" x="76" y="345" font-size="104" font-weight="800" fill="url(#title)" letter-spacing="-3">Omindu</text>
      <text class="r2" x="76" y="450" font-size="104" font-weight="800" fill="url(#title)" letter-spacing="-3">Gunathilaka</text>
      <g class="r3">
        <rect x="80" y="490" width="6" height="64" rx="3" fill="#00ff88"/>
        <text x="106" y="518" font-size="28" fill="#e6e9f0" font-weight="600">Aspiring DevOps &amp; Cloud Engineer</text>
        <text x="106" y="552" font-size="22" fill="#8b93a7">Kubernetes · GitOps CI/CD · Terraform · Cloud Automation &amp; Reliability</text>
      </g>
      <!-- chips -->
      <g class="r4 mono" font-size="16">
        <rect x="80" y="600" width="240" height="44" rx="22" fill="#00ff88" fill-opacity=".12" stroke="#00ff88" stroke-opacity=".5"/>
        <text x="200" y="628" text-anchor="middle" fill="#00ff88">UCSC CompSci (Yr 2)</text>
        <rect x="334" y="600" width="240" height="44" rx="22" fill="#1E90FF" fill-opacity=".12" stroke="#1E90FF" stroke-opacity=".5"/>
        <text x="454" y="628" text-anchor="middle" fill="#7cc0ff">Kubernetes · Docker</text>
        <rect x="588" y="600" width="265" height="44" rx="22" fill="#ffffff" fill-opacity=".06" stroke="#ffffff" stroke-opacity=".2"/>
        <text x="720" y="628" text-anchor="middle" fill="#e6e9f0">AWS · Terraform · Linux</text>
      </g>
      <g class="r5 mono" font-size="18" fill="#8b93a7">
        <text x="80" y="760"><tspan fill="#00ff88">▸</tspan> Automating resilient CI/CD pipelines &amp; declarative cloud infra</text>
        <text x="80" y="796"><tspan fill="#00ff88">▸</tspan> Orchestrating Kubernetes, Docker &amp; system toolchains in Go &amp; Rust</text>
      </g>
    </g>

    <!-- Right: orbit + profile avatar + terminal -->
    <g class="ring" opacity=".7">
      <circle cx="1290" cy="250" r="150" fill="none" stroke="#00ff88" stroke-opacity=".35" stroke-dasharray="2 14"/>
      <circle cx="1440" cy="250" r="7" fill="#00ff88"/>
      <circle cx="1290" cy="100" r="5" fill="#7cc0ff"/>
    </g>

    <!-- Outer tech glow rings -->
    <circle cx="1290" cy="250" r="104" fill="none" stroke="#00ff88" stroke-opacity=".2" stroke-dasharray="6 8" stroke-width="1.5"/>
    <circle cx="1290" cy="250" r="96" fill="none" stroke="#7cc0ff" stroke-opacity=".35" stroke-width="2"/>

    <!-- Avatar Circle -->
    <circle cx="1290" cy="250" r="88" fill="#131b2a"/>
    ${avatarBase64 ? `
    <image href="${avatarBase64}" x="1202" y="162" width="176" height="176" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
    ` : `
    <text x="1290" y="262" text-anchor="middle" class="mono" font-size="40" font-weight="700" fill="#ffffff">&lt;/&gt;</text>
    `}
    <circle cx="1290" cy="250" r="88" fill="none" stroke="url(#title)" stroke-width="3" stroke-opacity=".9"/>

    <!-- Online Status Badge -->
    <g transform="translate(1354 314)">
      <circle cx="0" cy="0" r="14" fill="#0b0f18" stroke="#00ff88" stroke-opacity=".8" stroke-width="2"/>
      <circle class="live" cx="0" cy="0" r="6" fill="#00ff88"/>
    </g>

    <g class="r3">
      <rect x="880" y="430" width="660" height="400" rx="22" fill="#0b0f18" fill-opacity=".92" stroke="#ffffff" stroke-opacity=".1"/>
      <rect x="880" y="430" width="660" height="54" rx="22" fill="#ffffff" fill-opacity=".04"/>
      <circle cx="914" cy="457" r="8" fill="#ff5f57"/>
      <circle cx="942" cy="457" r="8" fill="#febc2e"/>
      <circle cx="970" cy="457" r="8" fill="#28c840"/>
      <text x="1210" y="463" text-anchor="middle" class="mono" font-size="16" fill="#8b93a7">~/omindud — zsh (cluster-admin)</text>

      <g class="mono" font-size="19">
        <g transform="translate(910 530)">
          <text fill="#28c840">$ <tspan fill="#e6e9f0">whoami</tspan></text>
        </g>
        <text class="l1" x="910" y="566" fill="#8b93a7">omindu — aspiring devops &amp; cloud engineer @ UCSC</text>
        <text class="l2" x="910" y="610" fill="#28c840">$ <tspan fill="#e6e9f0">kubectl get nodes</tspan></text>
        <text class="l3" x="910" y="646" fill="#00ff88">control-plane   Ready   master   v1.31   (healthy)</text>
        <text class="l3" x="910" y="676" fill="#00ff88">worker-node-01  Ready   worker   v1.31   (healthy)</text>
        <text class="l3" x="910" y="706" fill="#7cc0ff">terraform apply -auto-approve (8 added, 0 changed)</text>
        <text class="l4" x="910" y="750" fill="#28c840">$ <tspan fill="#e6e9f0">./deploy --cluster prod</tspan></text>
        <text class="l5" x="910" y="790" fill="#7cc0ff">&gt; zero-downtime rollout · 24/24 pods healthy<tspan class="cursor" fill="#00ff88"> ▍</tspan></text>
      </g>
    </g>

    <!-- connector -->
    <path class="flow" d="M1290 346 C1290 390 1210 400 1210 430" fill="none" stroke="#00ff88" stroke-opacity=".6" stroke-width="2"/>

    <rect x="1" y="1" width="1598" height="898" rx="36" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "hero.svg"), content);
  console.log("Generated: hero.svg (1600x900 unified widescreen)");
}

/* ==========================================================================
   2. CI/CD PIPELINE (Stages 1 through 7, 1600x300)
   ========================================================================== */
export function buildPipelines() {
  const stageDefs = [
    { id: 1, name: "Commit", cmd: 'git commit -m "feat(devops): automated k8s canary deployments"', time: "0m 18s" },
    { id: 2, name: "Build", cmd: "docker buildx bake --push · distroless multi-arch", time: "0m 42s" },
    { id: 3, name: "Test", cmd: "pytest tests/ &amp;&amp; trivy image scan --severity HIGH,CRITICAL", time: "1m 05s" },
    { id: 4, name: "Review", cmd: "gh pr review 42 --approve · secops compliance passed", time: "1m 32s" },
    { id: 5, name: "Merge", cmd: "git merge origin/main --ff-only · automated gitops trigger", time: "1m 54s" },
    { id: 6, name: "Deploy", cmd: "helm upgrade --install gateway ./charts/gateway -n prod", time: "2m 15s" },
    { id: 7, name: "Live", cmd: "kubectl get pods -n prod -o wide · 99.99% uptime · 0 alerts", time: "2m 40s" }
  ];

  const stageNames = ["Commit", "Build", "Test", "Review", "Merge", "Deploy", "Live"];
  const stageX = [190, 393, 597, 800, 1003, 1207, 1410];

  // Helper stage icons at cy=176
  const getIcon = (idx, color) => {
    switch (idx) {
      case 0: // Commit
        return `<circle cx="190" cy="176" r="5" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M178 176h7M195 176h7" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 1: // Build
        return `<circle cx="393" cy="176" r="7" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3.2 2.4"/><circle cx="393" cy="176" r="2.4" fill="${color}"/>`;
      case 2: // Test
        return `<path d="M593 167v6l-6 10h20l-6-10v-6M591 167h12" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 3: // Review
        return `<path d="M789 176q11-10 22 0q-11 10-22 0z" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="800" cy="176" r="3" fill="${color}"/>`;
      case 4: // Merge
        return `<path d="M997 166v20M997 172q0 6 12 6v-6" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="1009" cy="170" r="2.6" fill="${color}"/>`;
      case 5: // Deploy
        return `<path d="M1207 186v-18M1200 174l7-8 7 8" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 6: // Live
        return `<circle cx="1410" cy="176" r="9" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1401 176h18M1410 167q-6 9 0 18q6-9 0-18" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      default:
        return "";
    }
  };

  stageDefs.forEach(curr => {
    const active = curr.id;
    const activeX = stageX[active - 1];
    const octoX = activeX - 44;
    const barWidth = Math.round((active / 7) * 1436);
    const runDist = active > 1 ? activeX - 190 : 203;

    // Track SVG components
    let trackHtml = "";
    if (active === 1) {
      trackHtml = `
    <!-- track -->
    <line x1="190" y1="220" x2="1410" y2="220" stroke="#1f2636" stroke-width="8" stroke-linecap="round"/>
    <line x1="190" y1="220" x2="1410" y2="220" stroke="#5c6478" stroke-width="3" stroke-linecap="round" class="ahead"/>
    <circle class="halo" cx="190" cy="220" r="30" fill="#00ff88" fill-opacity=".14"/><circle class="spin" cx="190" cy="220" r="24" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="10 8"/><circle cx="190" cy="220" r="17" fill="#08140c" stroke="#00ff88" stroke-width="3"/><circle class="core" cx="190" cy="220" r="5" fill="#00ff88"/><circle cx="393" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/><circle cx="597" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/><circle cx="800" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/><circle cx="1003" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/><circle cx="1207" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/><circle cx="1410" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/>`;
    } else {
      let aheadLine = "";
      if (active < 7) {
        aheadLine = `<line x1="${activeX}" y1="220" x2="1410" y2="220" stroke="#5c6478" stroke-width="3" stroke-linecap="round" class="ahead"/>\n    `;
      }
      trackHtml = `
    <!-- track -->
    <line x1="190" y1="220" x2="1410" y2="220" stroke="#1f2636" stroke-width="8" stroke-linecap="round"/>
    ${aheadLine}<line x1="190" y1="220" x2="${activeX}" y2="220" stroke="url(#done)" stroke-width="6" stroke-linecap="round"/>
    <circle class="pulse" style="animation-delay:0s" cx="190" cy="220" r="4.5" fill="#b9ffc7"/><circle class="pulse" style="animation-delay:-0.9s" cx="190" cy="220" r="4.5" fill="#b9ffc7"/><circle class="pulse" style="animation-delay:-1.8s" cx="190" cy="220" r="4.5" fill="#b9ffc7"/>`;

      // Draw all 7 node circles
      let nodesCode = "";
      for (let i = 0; i < 7; i++) {
        const sx = stageX[i];
        if (i + 1 < active) {
          // Completed node
          nodesCode += `<circle cx="${sx}" cy="220" r="17" fill="#0e2416" stroke="#28c840" stroke-width="2.5"/><path d="M${sx - 6} 220l4 5 8-10" fill="none" stroke="#28c840" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
        } else if (i + 1 === active) {
          // Active node
          const col = active === 7 ? "#28c840" : "#00ff88";
          nodesCode += `<circle class="halo" cx="${sx}" cy="220" r="30" fill="${col}" fill-opacity=".14"/><circle class="spin" cx="${sx}" cy="220" r="24" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="10 8"/><circle cx="${sx}" cy="220" r="17" fill="#08140c" stroke="${col}" stroke-width="3"/>${active === 7 ? `<path d="M${sx - 6} 220l4 5 8-10" fill="none" stroke="#28c840" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : `<circle class="core" cx="${sx}" cy="220" r="5" fill="${col}"/>`}`;
        } else {
          // Inactive node
          nodesCode += `<circle cx="${sx}" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/>`;
        }
      }
      trackHtml += `\n    ${nodesCode}`;
    }

    // Stage icons (cy=176)
    let iconsCode = "";
    for (let i = 0; i < 7; i++) {
      if (i + 1 < active) {
        iconsCode += getIcon(i, "#8ff0a4");
      } else if (i + 1 === active) {
        // active icon replaced by Octocat hovering over, except stage 7 where sparks explode
      } else {
        iconsCode += getIcon(i, "#4b5468");
      }
    }

    // Stage label texts (cy=270)
    let labelsCode = "";
    for (let i = 0; i < 7; i++) {
      const sx = stageX[i];
      const sname = stageNames[i];
      if (i + 1 < active) {
        labelsCode += `<text x="${sx}" y="270" text-anchor="middle" font-size="16" font-weight="500" fill="#8ff0a4">${sname}</text>`;
      } else if (i + 1 === active) {
        labelsCode += `<text x="${sx}" y="270" text-anchor="middle" font-size="16" font-weight="700" fill="${active === 7 ? "#28c840" : "#00ff88"}">${sname}</text>`;
      } else {
        labelsCode += `<text x="${sx}" y="270" text-anchor="middle" font-size="16" font-weight="500" fill="#4b5468">${sname}</text>`;
      }
    }

    // Spark particles for Stage 7
    let sparksCode = "";
    if (active === 7) {
      sparksCode = `\n    <circle class="spark" style="--dx:-40px;--dy:-30px;animation-delay:0s" cx="1410" cy="160" r="3.5" fill="#00ff88"/><circle class="spark" style="--dx:36px;--dy:-36px;animation-delay:0.4s" cx="1410" cy="160" r="3.5" fill="#28c840"/><circle class="spark" style="--dx:-24px;--dy:-48px;animation-delay:0.8s" cx="1410" cy="160" r="3.5" fill="#7cc0ff"/><circle class="spark" style="--dx:44px;--dy:-14px;animation-delay:1.2s" cx="1410" cy="160" r="3.5" fill="#ffd166"/><circle class="spark" style="--dx:-48px;--dy:-6px;animation-delay:0.6s" cx="1410" cy="160" r="3.5" fill="#ff7b72"/>`;
    }

    const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="300" viewBox="0 0 1600 300" role="img" aria-label="CI/CD pipeline: the Octocat is at the ${curr.name} stage">
  <style>
    @keyframes run { from { transform: translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { transform: translateX(${runDist}px); opacity: 0; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes halo { 0%,100% { opacity: .35; transform: scale(.9); } 50% { opacity: 1; } }
    @keyframes core { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
    @keyframes flow { to { stroke-dashoffset: -36; } }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes shadow { 0%,100% { transform: scaleX(1); opacity: .5; } 50% { transform: scaleX(.8); opacity: .3; } }
    @keyframes blink { 0%,92%,100% { transform: scaleY(1); } 95% { transform: scaleY(.1); } }
    @keyframes look { 0%,40%,100% { transform: translateX(0); } 50%,80% { transform: translateX(2.5px); } }
    @keyframes sway1 { 0%,100% { transform: rotate(0); } 50% { transform: rotate(10deg); } }
    @keyframes sway2 { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-10deg); } }
    @keyframes bar { from { transform: scaleX(0); } }
    @keyframes shimmer { from { transform: translateX(-200px); } to { transform: translateX(1600px); } }
    @keyframes dots { 0%,20% { opacity: 0; } 40%,100% { opacity: 1; } }
    @keyframes cur { 50% { opacity: 0; } }
    @keyframes spark { 0% { opacity: 0; transform: translate(0,0) scale(.4); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1); } }
    .pulse { animation: run 2.7s linear infinite; }
    .spin { transform-box: fill-box; transform-origin: 50% 50%; animation: spin 4s linear infinite; }
    .halo { transform-box: fill-box; transform-origin: 50% 50%; animation: halo 2.2s ease-in-out infinite; }
    .core { animation: core 1s ease-in-out infinite; }
    .ahead { stroke-dasharray: 2 16; animation: flow 1.6s linear infinite; }
    .obody { animation: bob 2.6s ease-in-out infinite; }
    .oshadow { transform-box: fill-box; transform-origin: 50% 50%; animation: shadow 2.6s ease-in-out infinite; }
    .oeyes { animation: look 6s ease-in-out infinite; }
    .oblink { transform-box: fill-box; transform-origin: 50% 50%; animation: blink 4.2s infinite; }
    .ot1 { transform-box: fill-box; transform-origin: 50% 0; animation: sway1 2.2s ease-in-out infinite; }
    .ot2 { transform-box: fill-box; transform-origin: 50% 0; animation: sway2 2.5s ease-in-out infinite; }
    .bar { transform-box: fill-box; transform-origin: 0 50%; animation: bar 1.6s cubic-bezier(.2,.7,.2,1) both; }
    .shimmer { animation: shimmer 5s ease-in-out infinite; }
    .d1 { animation: dots 1.2s infinite; } .d2 { animation: dots 1.2s .2s infinite; } .d3 { animation: dots 1.2s .4s infinite; }
    .cur { animation: cur 1s step-end infinite; }
    .spark { animation: spark 1.8s ease-out infinite; }
  </style>
  <defs>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1320"/><stop offset="1" stop-color="#0a0e17"/>
    </linearGradient>
    <linearGradient id="done" x1="0" x2="1">
      <stop offset="0" stop-color="#00ff88" stop-opacity=".35"/><stop offset="1" stop-color="#00ff88"/>
    </linearGradient>
    <linearGradient id="prog" x1="0" x2="1">
      <stop offset="0" stop-color="#00ff88"/><stop offset="1" stop-color="#00ff88"/>
    </linearGradient>
    <linearGradient id="sh" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".045"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern>
    <clipPath id="frame"><rect x="40" y="10" width="1520" height="280" rx="26"/></clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect x="40" y="10" width="1520" height="280" fill="url(#card)"/>
    <rect x="40" y="10" width="1520" height="280" fill="url(#grid)"/>
    <rect class="shimmer" x="0" y="10" width="260" height="280" fill="url(#sh)"/>
  </g>
  <rect x="40.5" y="10.5" width="1519" height="279" rx="26" fill="none" stroke="#fff" stroke-opacity=".08"/>

  <g font-family="'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace">
    <!-- header -->
    <circle cx="82" cy="48" r="6" fill="${active === 7 ? "#28c840" : "#00ff88"}" class="core"/>
    <text x="98" y="54" font-size="17" fill="#e6e9f0">devops-ci-cd.yml</text>
    <text x="246" y="54" font-size="17" fill="#5c6478">· run #${127 + active} · main</text>
    <text x="800" y="54" text-anchor="middle" font-size="16" fill="#8b93a7"><tspan fill="${active === 7 ? "#28c840" : "#00ff88"}">$</tspan> ${curr.cmd}<tspan class="cur" fill="${active === 7 ? "#28c840" : "#00ff88"}"> ▍</tspan></text>
    <rect x="1260" y="30" width="150" height="34" rx="17" fill="${active === 7 ? "#28c840" : "#00ff88"}" fill-opacity=".12" stroke="${active === 7 ? "#28c840" : "#00ff88"}" stroke-opacity=".55"/>
    <text x="1320" y="53" text-anchor="middle" font-size="15" font-weight="700" fill="${active === 7 ? "#28c840" : "#00ff88"}">${active === 7 ? "SUCCESS" : "RUNNING"}</text>
    ${active === 7 ? "" : `<g fill="#00ff88" font-size="15" font-weight="700"><text class="d1" x="1362" y="53">.</text><text class="d2" x="1370" y="53">.</text><text class="d3" x="1378" y="53">.</text></g>`}
    <text x="1528" y="54" text-anchor="end" font-size="15" fill="#5c6478">${curr.time}</text>

    <!-- progress -->
    <rect x="82" y="76" width="1436" height="4" rx="2" fill="#fff" fill-opacity=".06"/>
    <rect class="bar" x="82" y="76" width="${barWidth}" height="4" rx="2" fill="url(#prog)"/>
    ${trackHtml}
    ${iconsCode}
    ${labelsCode}${sparksCode}
  </g>
  
  <g transform="translate(${octoX} 82)">
    <ellipse class="oshadow" cx="44" cy="114" rx="34" ry="6" fill="#000" fill-opacity=".5"/>
    <g class="obody">
      <g fill="#2d333b" stroke="#7cc0ff" stroke-opacity=".7" stroke-width="2">
        <path class="ot1" d="M20 78 q-10 20 -22 26 q-4 2 -2 6 q14 0 30 -24 Z"/>
        <path class="ot2" d="M33 86 q-2 16 -10 24 q-2 4 2 5 q14 -6 18 -27 Z"/>
        <path class="ot1" d="M55 86 q2 16 10 24 q2 4 -2 5 q-14 -6 -18 -27 Z"/>
        <path class="ot2" d="M68 78 q10 20 22 26 q4 2 2 6 q-14 0 -30 -24 Z"/>
        <path d="M10 32 L14 6 Q15 2 19 4 L33 15 Q44 12 55 15 L69 4 Q73 2 74 6 L78 32 Q84 46 81 62 Q78 92 44 98 Q10 92 7 62 Q4 46 10 32 Z"/>
      </g>
      <path d="M16 50 Q16 35 31 35 Q44 38 57 35 Q72 35 72 50 Q72 77 44 78 Q16 77 16 50 Z" fill="#f1c9a5"/>
      <ellipse cx="32" cy="54" rx="7.5" ry="9.5" fill="#ad5c51"/>
      <ellipse cx="56" cy="54" rx="7.5" ry="9.5" fill="#ad5c51"/>
      <g class="oeyes">
        <ellipse class="oblink" cx="33" cy="55" rx="3.6" ry="4.8" fill="#24292f"/>
        <ellipse class="oblink" cx="57" cy="55" rx="3.6" ry="4.8" fill="#24292f"/>
      </g>
      <circle cx="34" cy="52" r="1.4" fill="#fff"/><circle cx="58" cy="52" r="1.4" fill="#fff"/>
      <ellipse cx="44" cy="64" rx="3" ry="2" fill="#ad5c51"/>
      <path d="M40 68 Q44 71 48 68" fill="none" stroke="#ad5c51" stroke-width="1.8" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;

    writeFileSync(join(OUT, `pipeline-${curr.id}.svg`), content);
  });
  console.log("Generated: pipeline-1.svg through pipeline-7.svg with animated character and all mechanics intact");
}

/* ==========================================================================
   2.5 LIVE ANIMATED CI/CD PIPELINE (1600x300, 14s continuous loop)
   ========================================================================== */
export function buildAnimatedPipeline() {
  const stageDefs = [
    { id: 1, name: "Commit", cmd: 'git commit -m "feat(devops): automated k8s canary deployments"', time: "0m 18s" },
    { id: 2, name: "Build", cmd: "docker buildx bake --push · distroless multi-arch", time: "0m 42s" },
    { id: 3, name: "Test", cmd: "pytest tests/ &amp;&amp; trivy image scan --severity HIGH,CRITICAL", time: "1m 05s" },
    { id: 4, name: "Review", cmd: "gh pr review 42 --approve · secops compliance passed", time: "1m 32s" },
    { id: 5, name: "Merge", cmd: "git merge origin/main --ff-only · automated gitops trigger", time: "1m 54s" },
    { id: 6, name: "Deploy", cmd: "helm upgrade --install gateway ./charts/gateway -n prod", time: "2m 15s" },
    { id: 7, name: "Live", cmd: "kubectl get pods -n prod -o wide · 99.99% uptime · 0 alerts", time: "2m 40s" }
  ];

  const stageNames = ["Commit", "Build", "Test", "Review", "Merge", "Deploy", "Live"];
  const stageX = [190, 393, 597, 800, 1003, 1207, 1410];

  // Stage icons at cy=176 with currentColor
  const getIcon = (idx) => {
    switch (idx) {
      case 0: // Commit
        return `<circle cx="190" cy="176" r="5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M178 176h7M195 176h7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 1: // Build
        return `<circle cx="393" cy="176" r="7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3.2 2.4"/><circle cx="393" cy="176" r="2.4" fill="currentColor"/>`;
      case 2: // Test
        return `<path d="M593 167v6l-6 10h20l-6-10v-6M591 167h12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 3: // Review
        return `<path d="M789 176q11-10 22 0q-11 10-22 0z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="800" cy="176" r="3" fill="currentColor"/>`;
      case 4: // Merge
        return `<path d="M997 166v20M997 172q0 6 12 6v-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="1009" cy="170" r="2.6" fill="currentColor"/>`;
      case 5: // Deploy
        return `<path d="M1207 186v-18M1200 174l7-8 7 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 6: // Live
        return `<circle cx="1410" cy="176" r="9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1401 176h18M1410 167q-6 9 0 18q6-9 0-18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      default:
        return "";
    }
  };

  // Base nodes + completed checkmark stamps
  let nodesMarkup = "";
  for (let i = 0; i < 7; i++) {
    const sx = stageX[i];
    nodesMarkup += `
      <!-- Node ${i + 1} (${stageNames[i]}) -->
      <circle cx="${sx}" cy="220" r="14" fill="#0b0f18" stroke="#2f3747" stroke-width="2.5"/>
      <g class="chk-${i + 1}">
        <circle cx="${sx}" cy="220" r="17" fill="#0e2416" stroke="#28c840" stroke-width="2.5"/>
        <path d="M${sx - 6} 220l4 5 8-10" fill="none" stroke="#28c840" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>`;
  }

  // Icons markup
  let iconsMarkup = "";
  for (let i = 0; i < 7; i++) {
    iconsMarkup += `
      <g class="icn-${i + 1}">
        ${getIcon(i)}
      </g>`;
  }

  // Labels markup
  let labelsMarkup = "";
  for (let i = 0; i < 7; i++) {
    const sx = stageX[i];
    labelsMarkup += `<text class="lbl-${i + 1}" x="${sx}" y="270" text-anchor="middle" font-size="16">${stageNames[i]}</text>\n`;
  }

  // Commands & Timers markup
  let commandsMarkup = "";
  let timersMarkup = "";
  stageDefs.forEach((s) => {
    commandsMarkup += `
      <g class="cmd-${s.id}">
        <text x="800" y="54" text-anchor="middle" font-size="16" fill="#8b93a7"><tspan fill="${s.id === 7 ? "#28c840" : "#00ff88"}">$</tspan> ${s.cmd}<tspan class="cur" fill="${s.id === 7 ? "#28c840" : "#00ff88"}"> ▍</tspan></text>
      </g>`;
    timersMarkup += `
      <text class="tim-${s.id}" x="1528" y="54" text-anchor="end" font-size="15" fill="#5c6478">${s.time}</text>`;
  });

  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="300" viewBox="0 0 1600 300" role="img" aria-label="CI/CD pipeline: Live animated Octocat moving through all 7 DevOps stages">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }

    /* --- Shimmer and Stream --- */
    @keyframes shimmer { from { transform: translateX(-200px); } to { transform: translateX(1600px); } }
    @keyframes flow { to { stroke-dashoffset: -36; } }
    @keyframes corePulse { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes halo { 0%,100% { transform: scale(.92); opacity: .4; } 50% { transform: scale(1.08); opacity: .9; } }
    @keyframes cur { 50% { opacity: 0; } }
    @keyframes dots { 0%,20% { opacity: 0; } 40%,100% { opacity: 1; } }

    .shimmer { animation: shimmer 5s ease-in-out infinite; }
    .ahead { stroke-dasharray: 2 16; animation: flow 1.6s linear infinite; }
    .core { animation: corePulse 1s ease-in-out infinite; }
    .spin { transform-origin: 0 0; animation: spin 4s linear infinite; }
    .halo { transform-origin: 0 0; animation: halo 2.2s ease-in-out infinite; }
    .cur { animation: cur 1s step-end infinite; }
    .d1 { animation: dots 1.2s infinite; } .d2 { animation: dots 1.2s .2s infinite; } .d3 { animation: dots 1.2s .4s infinite; }

    /* --- Character Micro-animations --- */
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes shadow { 0%,100% { transform: scaleX(1); opacity: .5; } 50% { transform: scaleX(.8); opacity: .3; } }
    @keyframes blink { 0%,92%,100% { transform: scaleY(1); } 95% { transform: scaleY(.1); } }
    @keyframes look { 0%,40%,100% { transform: translateX(0); } 50%,80% { transform: translateX(2.5px); } }
    @keyframes sway1 { 0%,100% { transform: rotate(0); } 50% { transform: rotate(10deg); } }
    @keyframes sway2 { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-10deg); } }

    .obody { animation: bob 2.6s ease-in-out infinite; }
    .oshadow { transform-box: fill-box; transform-origin: 50% 50%; animation: shadow 2.6s ease-in-out infinite; }
    .oeyes { animation: look 6s ease-in-out infinite; }
    .oblink { transform-box: fill-box; transform-origin: 50% 50%; animation: blink 4.2s infinite; }
    .ot1 { transform-box: fill-box; transform-origin: 50% 0; animation: sway1 2.2s ease-in-out infinite; }
    .ot2 { transform-box: fill-box; transform-origin: 50% 0; animation: sway2 2.5s ease-in-out infinite; }

    /* --- Octocat Continuous 14s Travel Across 7 Stages --- */
    @keyframes octoTravel {
      0%, 11.50%     { transform: translate(146px, 82px); }
      12.89%         { transform: translate(248px, 66px); }
      14.29%, 25.78% { transform: translate(349px, 82px); }
      27.18%         { transform: translate(451px, 66px); }
      28.57%, 40.07% { transform: translate(553px, 82px); }
      41.46%         { transform: translate(655px, 66px); }
      42.86%, 54.35% { transform: translate(756px, 82px); }
      55.75%         { transform: translate(858px, 66px); }
      57.14%, 68.64% { transform: translate(959px, 82px); }
      70.03%         { transform: translate(1061px, 66px); }
      71.43%, 82.92% { transform: translate(1163px, 82px); }
      84.32%         { transform: translate(1265px, 66px); }
      85.71%, 97.20% { transform: translate(1366px, 82px); }
      98.00%         { opacity: 0; transform: translate(1366px, 82px); }
      98.60%         { opacity: 0; transform: translate(146px, 82px); }
      100.00%        { opacity: 1; transform: translate(146px, 82px); }
    }
    .octoTravel { transform: translate(146px, 82px); animation: octoTravel 14s cubic-bezier(.4, 0, .2, 1) infinite; }

    /* --- Active Node Halo Continuous Travel --- */
    @keyframes haloTravel {
      0%, 11.50%     { transform: translateX(190px); }
      14.29%, 25.78% { transform: translateX(393px); }
      28.57%, 40.07% { transform: translateX(597px); }
      42.86%, 54.35% { transform: translateX(800px); }
      57.14%, 68.64% { transform: translateX(1003px); }
      71.43%, 82.92% { transform: translateX(1207px); }
      85.71%, 97.20% { transform: translateX(1410px); }
      98.00%         { opacity: 0; transform: translateX(1410px); }
      98.60%         { opacity: 0; transform: translateX(190px); }
      100.00%        { opacity: 1; transform: translateX(190px); }
    }
    .haloTravel { transform: translateX(190px); animation: haloTravel 14s cubic-bezier(.4, 0, .2, 1) infinite; }

    /* --- Done Track Continuous Extension (stroke-dasharray: 1220) --- */
    @keyframes trackGrow {
      0%, 11.50%     { stroke-dashoffset: 1220; }
      14.29%, 25.78% { stroke-dashoffset: 1017; }
      28.57%, 40.07% { stroke-dashoffset: 813; }
      42.86%, 54.35% { stroke-dashoffset: 610; }
      57.14%, 68.64% { stroke-dashoffset: 407; }
      71.43%, 82.92% { stroke-dashoffset: 203; }
      85.71%, 97.20% { stroke-dashoffset: 0; }
      98.00%         { opacity: 0; stroke-dashoffset: 0; }
      98.60%         { opacity: 0; stroke-dashoffset: 1220; }
      100.00%        { opacity: 1; stroke-dashoffset: 1220; }
    }
    .doneTrack { stroke-dasharray: 1220; stroke-dashoffset: 1220; animation: trackGrow 14s cubic-bezier(.4, 0, .2, 1) infinite; }

    /* --- Top Progress Bar Continuous Growth --- */
    @keyframes barLiveGrow {
      0%, 11.50%     { transform: scaleX(0.143); }
      14.29%, 25.78% { transform: scaleX(0.286); }
      28.57%, 40.07% { transform: scaleX(0.429); }
      42.86%, 54.35% { transform: scaleX(0.571); }
      57.14%, 68.64% { transform: scaleX(0.714); }
      71.43%, 82.92% { transform: scaleX(0.857); }
      85.71%, 97.20% { transform: scaleX(1.000); }
      98.00%         { opacity: 0; transform: scaleX(1.000); }
      98.60%         { opacity: 0; transform: scaleX(0.143); }
      100.00%        { opacity: 1; transform: scaleX(0.143); }
    }
    .barLive { transform-origin: 0 0; transform: scaleX(0.143); animation: barLiveGrow 14s cubic-bezier(.4, 0, .2, 1) infinite; }

    /* --- Completed Checkmarks Stamping --- */
    @keyframes chk1 { 0%, 13.5% { opacity: 0; transform: scale(0.5); } 14.29%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }
    @keyframes chk2 { 0%, 27.8% { opacity: 0; transform: scale(0.5); } 28.57%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }
    @keyframes chk3 { 0%, 42.0% { opacity: 0; transform: scale(0.5); } 42.86%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }
    @keyframes chk4 { 0%, 56.3% { opacity: 0; transform: scale(0.5); } 57.14%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }
    @keyframes chk5 { 0%, 70.6% { opacity: 0; transform: scale(0.5); } 71.43%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }
    @keyframes chk6 { 0%, 84.9% { opacity: 0; transform: scale(0.5); } 85.71%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }
    @keyframes chk7 { 0%, 86.0% { opacity: 0; transform: scale(0.5); } 86.80%, 97.2% { opacity: 1; transform: scale(1); } 98.0%, 100% { opacity: 0; transform: scale(0.5); } }

    .chk-1, .chk-2, .chk-3, .chk-4, .chk-5, .chk-6, .chk-7 { opacity: 0; }
    .chk-1 { transform-origin: 190px 220px; animation: chk1 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }
    .chk-2 { transform-origin: 393px 220px; animation: chk2 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }
    .chk-3 { transform-origin: 597px 220px; animation: chk3 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }
    .chk-4 { transform-origin: 800px 220px; animation: chk4 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }
    .chk-5 { transform-origin: 1003px 220px; animation: chk5 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }
    .chk-6 { transform-origin: 1207px 220px; animation: chk6 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }
    .chk-7 { transform-origin: 1410px 220px; animation: chk7 14s cubic-bezier(.175, .885, .32, 1.275) infinite; }

    /* --- Stage Commands and Timers Stepping --- */
    @keyframes s1 { 0%, 14.28% { opacity: 1; } 14.29%, 100% { opacity: 0; } }
    @keyframes s2 { 0%, 14.28% { opacity: 0; } 14.29%, 28.57% { opacity: 1; } 28.58%, 100% { opacity: 0; } }
    @keyframes s3 { 0%, 28.57% { opacity: 0; } 28.58%, 42.86% { opacity: 1; } 42.87%, 100% { opacity: 0; } }
    @keyframes s4 { 0%, 42.86% { opacity: 0; } 42.87%, 57.14% { opacity: 1; } 57.15%, 100% { opacity: 0; } }
    @keyframes s5 { 0%, 57.14% { opacity: 0; } 57.15%, 71.43% { opacity: 1; } 71.44%, 100% { opacity: 0; } }
    @keyframes s6 { 0%, 71.43% { opacity: 0; } 71.44%, 85.71% { opacity: 1; } 85.72%, 100% { opacity: 0; } }
    @keyframes s7 { 0%, 85.71% { opacity: 0; } 85.72%, 97.50% { opacity: 1; } 97.51%, 100% { opacity: 0; } }

    .cmd-1, .tim-1 { opacity: 1; animation: s1 14s step-end infinite; }
    .cmd-2, .tim-2 { opacity: 0; animation: s2 14s step-end infinite; }
    .cmd-3, .tim-3 { opacity: 0; animation: s3 14s step-end infinite; }
    .cmd-4, .tim-4 { opacity: 0; animation: s4 14s step-end infinite; }
    .cmd-5, .tim-5 { opacity: 0; animation: s5 14s step-end infinite; }
    .cmd-6, .tim-6 { opacity: 0; animation: s6 14s step-end infinite; }
    .cmd-7, .tim-7 { opacity: 0; animation: s7 14s step-end infinite; }

    /* --- Status Badge Switching --- */
    @keyframes showRun  { 0%, 85.5% { opacity: 1; } 85.71%, 97.5% { opacity: 0; } 98.0%, 100% { opacity: 1; } }
    @keyframes showSucc { 0%, 85.5% { opacity: 0; } 85.71%, 97.5% { opacity: 1; } 98.0%, 100% { opacity: 0; } }
    .statusRunning { opacity: 1; animation: showRun 14s step-end infinite; }
    .statusSuccess { opacity: 0; animation: showSucc 14s step-end infinite; }

    /* --- Dynamic Stage Node Color Sync --- */
    @keyframes col1 { 0%, 14.28% { color: #00ff88; fill: #00ff88; font-weight: 700; } 14.29%, 97.2% { color: #8ff0a4; fill: #8ff0a4; font-weight: 500; } 98.0%, 100% { color: #00ff88; fill: #00ff88; font-weight: 700; } }
    @keyframes col2 { 0%, 14.28% { color: #4b5468; fill: #4b5468; font-weight: 500; } 14.29%, 28.57% { color: #00ff88; fill: #00ff88; font-weight: 700; } 28.58%, 97.2% { color: #8ff0a4; fill: #8ff0a4; font-weight: 500; } 98.0%, 100% { color: #4b5468; fill: #4b5468; font-weight: 500; } }
    @keyframes col3 { 0%, 28.57% { color: #4b5468; fill: #4b5468; font-weight: 500; } 28.58%, 42.86% { color: #00ff88; fill: #00ff88; font-weight: 700; } 42.87%, 97.2% { color: #8ff0a4; fill: #8ff0a4; font-weight: 500; } 98.0%, 100% { color: #4b5468; fill: #4b5468; font-weight: 500; } }
    @keyframes col4 { 0%, 42.86% { color: #4b5468; fill: #4b5468; font-weight: 500; } 42.87%, 57.14% { color: #00ff88; fill: #00ff88; font-weight: 700; } 57.15%, 97.2% { color: #8ff0a4; fill: #8ff0a4; font-weight: 500; } 98.0%, 100% { color: #4b5468; fill: #4b5468; font-weight: 500; } }
    @keyframes col5 { 0%, 57.14% { color: #4b5468; fill: #4b5468; font-weight: 500; } 57.15%, 71.43% { color: #00ff88; fill: #00ff88; font-weight: 700; } 71.44%, 97.2% { color: #8ff0a4; fill: #8ff0a4; font-weight: 500; } 98.0%, 100% { color: #4b5468; fill: #4b5468; font-weight: 500; } }
    @keyframes col6 { 0%, 71.43% { color: #4b5468; fill: #4b5468; font-weight: 500; } 71.44%, 85.71% { color: #00ff88; fill: #00ff88; font-weight: 700; } 85.72%, 97.2% { color: #8ff0a4; fill: #8ff0a4; font-weight: 500; } 98.0%, 100% { color: #4b5468; fill: #4b5468; font-weight: 500; } }
    @keyframes col7 { 0%, 85.71% { color: #4b5468; fill: #4b5468; font-weight: 500; } 85.72%, 97.20% { color: #28c840; fill: #28c840; font-weight: 700; } 98.0%, 100% { color: #4b5468; fill: #4b5468; font-weight: 500; } }

    .lbl-1, .icn-1 { color: #00ff88; fill: #00ff88; font-weight: 700; animation: col1 14s step-end infinite; }
    .lbl-2, .icn-2 { color: #4b5468; fill: #4b5468; font-weight: 500; animation: col2 14s step-end infinite; }
    .lbl-3, .icn-3 { color: #4b5468; fill: #4b5468; font-weight: 500; animation: col3 14s step-end infinite; }
    .lbl-4, .icn-4 { color: #4b5468; fill: #4b5468; font-weight: 500; animation: col4 14s step-end infinite; }
    .lbl-5, .icn-5 { color: #4b5468; fill: #4b5468; font-weight: 500; animation: col5 14s step-end infinite; }
    .lbl-6, .icn-6 { color: #4b5468; fill: #4b5468; font-weight: 500; animation: col6 14s step-end infinite; }
    .lbl-7, .icn-7 { color: #4b5468; fill: #4b5468; font-weight: 500; animation: col7 14s step-end infinite; }

    /* --- Stage 7 Celebration Sparks Burst --- */
    @keyframes showSpk { 0%, 85.5% { opacity: 0; } 85.71%, 97.2% { opacity: 1; } 97.5%, 100% { opacity: 0; } }
    @keyframes spk1 { 0%, 85.71% { opacity: 0; transform: translate(0, 0) scale(.3); } 87.5% { opacity: 1; } 96.0% { opacity: 0; transform: translate(-42px, -32px) scale(1.2); } 100% { opacity: 0; transform: translate(0, 0) scale(.3); } }
    @keyframes spk2 { 0%, 85.71% { opacity: 0; transform: translate(0, 0) scale(.3); } 88.0% { opacity: 1; } 96.5% { opacity: 0; transform: translate(38px, -38px) scale(1.2); } 100% { opacity: 0; transform: translate(0, 0) scale(.3); } }
    @keyframes spk3 { 0%, 85.71% { opacity: 0; transform: translate(0, 0) scale(.3); } 88.5% { opacity: 1; } 97.0% { opacity: 0; transform: translate(-26px, -50px) scale(1.2); } 100% { opacity: 0; transform: translate(0, 0) scale(.3); } }
    @keyframes spk4 { 0%, 85.71% { opacity: 0; transform: translate(0, 0) scale(.3); } 89.0% { opacity: 1; } 97.0% { opacity: 0; transform: translate(46px, -16px) scale(1.2); } 100% { opacity: 0; transform: translate(0, 0) scale(.3); } }
    @keyframes spk5 { 0%, 85.71% { opacity: 0; transform: translate(0, 0) scale(.3); } 88.2% { opacity: 1; } 96.5% { opacity: 0; transform: translate(-50px, -8px) scale(1.2); } 100% { opacity: 0; transform: translate(0, 0) scale(.3); } }

    .sparksWrap { opacity: 0; animation: showSpk 14s step-end infinite; }
    .spk1 { transform-origin: 1410px 160px; animation: spk1 14s ease-out infinite; }
    .spk2 { transform-origin: 1410px 160px; animation: spk2 14s ease-out infinite; }
    .spk3 { transform-origin: 1410px 160px; animation: spk3 14s ease-out infinite; }
    .spk4 { transform-origin: 1410px 160px; animation: spk4 14s ease-out infinite; }
    .spk5 { transform-origin: 1410px 160px; animation: spk5 14s ease-out infinite; }
  </style>

  <defs>
    <linearGradient id="live-card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1320"/><stop offset="1" stop-color="#0a0e17"/>
    </linearGradient>
    <linearGradient id="live-done" x1="0" x2="1">
      <stop offset="0" stop-color="#00ff88" stop-opacity=".35"/><stop offset="1" stop-color="#00ff88"/>
    </linearGradient>
    <linearGradient id="live-prog" x1="0" x2="1">
      <stop offset="0" stop-color="#00ff88"/><stop offset="1" stop-color="#00ff88"/>
    </linearGradient>
    <linearGradient id="live-sh" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".045"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="live-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern>
    <clipPath id="live-frame"><rect x="40" y="10" width="1520" height="280" rx="26"/></clipPath>
  </defs>

  <!-- Background Frame and Glassmorphism -->
  <g clip-path="url(#live-frame)">
    <rect x="40" y="10" width="1520" height="280" fill="url(#live-card)"/>
    <rect x="40" y="10" width="1520" height="280" fill="url(#live-grid)"/>
    <rect class="shimmer" x="0" y="10" width="260" height="280" fill="url(#live-sh)"/>
  </g>
  <rect x="40.5" y="10.5" width="1519" height="279" rx="26" fill="none" stroke="#fff" stroke-opacity=".08"/>

  <g class="mono">
    <!-- Header Terminal Title and Metadata -->
    <circle cx="82" cy="48" r="6" fill="#00ff88" class="core"/>
    <text x="98" y="54" font-size="17" fill="#e6e9f0">devops-ci-cd.yml</text>
    <text x="246" y="54" font-size="17" fill="#5c6478">· run #148 · main</text>

    <!-- Dynamic Stage Commands and Timers -->
    ${commandsMarkup}
    ${timersMarkup}

    <!-- Status Pill (RUNNING... vs SUCCESS ✓) -->
    <g class="statusRunning">
      <rect x="1260" y="30" width="150" height="34" rx="17" fill="#00ff88" fill-opacity=".12" stroke="#00ff88" stroke-opacity=".55"/>
      <text x="1320" y="53" text-anchor="middle" font-size="15" font-weight="700" fill="#00ff88">RUNNING</text>
      <g fill="#00ff88" font-size="15" font-weight="700">
        <text class="d1" x="1362" y="53">.</text><text class="d2" x="1370" y="53">.</text><text class="d3" x="1378" y="53">.</text>
      </g>
    </g>
    <g class="statusSuccess">
      <rect x="1260" y="30" width="150" height="34" rx="17" fill="#28c840" fill-opacity=".12" stroke="#28c840" stroke-opacity=".55"/>
      <text x="1335" y="53" text-anchor="middle" font-size="15" font-weight="700" fill="#28c840">SUCCESS ✓</text>
    </g>

    <!-- Progress Bar Track and Live Fill -->
    <rect x="82" y="76" width="1436" height="4" rx="2" fill="#fff" fill-opacity=".06"/>
    <g transform="translate(82, 0)">
      <rect class="barLive" x="0" y="76" width="1436" height="4" rx="2" fill="url(#live-prog)"/>
    </g>

    <!-- Track Base Lines -->
    <line x1="190" y1="220" x2="1410" y2="220" stroke="#1f2636" stroke-width="8" stroke-linecap="round"/>
    <line x1="190" y1="220" x2="1410" y2="220" stroke="#5c6478" stroke-width="3" stroke-linecap="round" class="ahead"/>
    <line class="doneTrack" x1="190" y1="220" x2="1410" y2="220" stroke="url(#live-done)" stroke-width="6" stroke-linecap="round"/>

    <!-- Seven Stage Nodes and Checkmarks -->
    ${nodesMarkup}

    <!-- Active Halo Group (Continuously tracking active node) -->
    <g class="haloTravel">
      <g transform="translate(0, 220)">
        <circle class="halo" cx="0" cy="0" r="30" fill="#00ff88" fill-opacity=".15"/>
        <g class="spin"><circle cx="0" cy="0" r="24" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="10 8"/></g>
        <circle cx="0" cy="0" r="17" fill="#08140c" stroke="#00ff88" stroke-width="3"/>
        <circle class="core" cx="0" cy="0" r="5" fill="#00ff88"/>
      </g>
    </g>

    <!-- Stage Icons and Labels -->
    ${iconsMarkup}
    ${labelsMarkup}

    <!-- Stage 7 Celebration Sparks Burst -->
    <g class="sparksWrap">
      <circle class="spark spk1" cx="1410" cy="160" r="3.5" fill="#00ff88"/>
      <circle class="spark spk2" cx="1410" cy="160" r="3.5" fill="#28c840"/>
      <circle class="spark spk3" cx="1410" cy="160" r="3.5" fill="#7cc0ff"/>
      <circle class="spark spk4" cx="1410" cy="160" r="3.5" fill="#ffd166"/>
      <circle class="spark spk5" cx="1410" cy="160" r="3.5" fill="#ff7b72"/>
    </g>
  </g>

  <!-- Live Octocat Character (Traveling, Leaping, Breathing, Swaying) -->
  <g class="octoTravel">
    <ellipse class="oshadow" cx="44" cy="114" rx="34" ry="6" fill="#000" fill-opacity=".5"/>
    <g class="obody">
      <g fill="#2d333b" stroke="#7cc0ff" stroke-opacity=".7" stroke-width="2">
        <path class="ot1" d="M20 78 q-10 20 -22 26 q-4 2 -2 6 q14 0 30 -24 Z"/>
        <path class="ot2" d="M33 86 q-2 16 -10 24 q-2 4 2 5 q14 -6 18 -27 Z"/>
        <path class="ot1" d="M55 86 q2 16 10 24 q2 4 -2 5 q-14 -6 -18 -27 Z"/>
        <path class="ot2" d="M68 78 q10 20 22 26 q4 2 2 6 q-14 0 -30 -24 Z"/>
        <path d="M10 32 L14 6 Q15 2 19 4 L33 15 Q44 12 55 15 L69 4 Q73 2 74 6 L78 32 Q84 46 81 62 Q78 92 44 98 Q10 92 7 62 Q4 46 10 32 Z"/>
      </g>
      <path d="M16 50 Q16 35 31 35 Q44 38 57 35 Q72 35 72 50 Q72 77 44 78 Q16 77 16 50 Z" fill="#f1c9a5"/>
      <ellipse cx="32" cy="54" rx="7.5" ry="9.5" fill="#ad5c51"/>
      <ellipse cx="56" cy="54" rx="7.5" ry="9.5" fill="#ad5c51"/>
      <g class="oeyes">
        <ellipse class="oblink" cx="33" cy="55" rx="3.6" ry="4.8" fill="#24292f"/>
        <ellipse class="oblink" cx="57" cy="55" rx="3.6" ry="4.8" fill="#24292f"/>
      </g>
      <circle cx="34" cy="52" r="1.4" fill="#fff"/><circle cx="58" cy="52" r="1.4" fill="#fff"/>
      <ellipse cx="44" cy="64" rx="3" ry="2" fill="#ad5c51"/>
      <path d="M40 68 Q44 71 48 68" fill="none" stroke="#ad5c51" stroke-width="1.8" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;

  writeFileSync(join(OUT, "pipeline.svg"), content);
  writeFileSync(join(OUT, "pipeline-animated.svg"), content);
  console.log("Generated: pipeline.svg and pipeline-animated.svg (1600x300 continuous 14s loop animated pipeline)");
}

/* ==========================================================================
   3. ANIMATED OCTOCAT CODER (720x720)
   ========================================================================== */
export function buildOctocat() {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720" role="img" aria-label="Animated Octocat — Aspiring DevOps and Cloud Engineer automating CI/CD">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes blink { 0%,90%,100% { transform: scaleY(1); } 94% { transform: scaleY(.1); } }
    @keyframes ear { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-8deg); } }
    @keyframes wave1 { 0%,100% { transform: rotate(0); } 50% { transform: rotate(14deg); } }
    @keyframes wave2 { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-14deg); } }
    @keyframes tapL { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    @keyframes tapR { 0%,100% { transform: translateY(-7px); } 50% { transform: translateY(0); } }
    @keyframes shadow { 0%,100% { transform: scaleX(1); opacity: .45; } 50% { transform: scaleX(.85); opacity: .3; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
    @keyframes commit { 0% { opacity: 0; transform: translate(0,0); } 20% { opacity: 1; } 100% { opacity: 0; transform: translate(0,-120px); } }
    @keyframes cursor { 50% { opacity: 0; } }
    @keyframes glow { 0%,100% { opacity: .6; } 50% { opacity: 1; } }
    .cat { animation: bob 3s ease-in-out infinite; }
    .eye { transform-box: fill-box; transform-origin: 50% 50%; animation: blink 4.5s infinite; }
    .earL { transform-box: fill-box; transform-origin: 80% 100%; animation: ear 3s ease-in-out infinite; }
    .t1 { transform-box: fill-box; transform-origin: 50% 0; animation: wave1 2.2s ease-in-out infinite; }
    .t2 { transform-box: fill-box; transform-origin: 50% 0; animation: wave2 2.6s ease-in-out infinite; }
    .t3 { transform-box: fill-box; transform-origin: 50% 0; animation: wave1 2.4s ease-in-out .4s infinite; }
    .tapL { animation: tapL .3s ease-in-out infinite; }
    .tapR { animation: tapR .3s ease-in-out infinite; }
    .shadow { transform-box: fill-box; transform-origin: 50% 50%; animation: shadow 3s ease-in-out infinite; }
    .f1 { animation: float 4s ease-in-out infinite; }
    .f2 { animation: float 5s ease-in-out 1s infinite; }
    .c1 { animation: commit 3.6s ease-out infinite; }
    .c2 { animation: commit 3.6s ease-out 1.2s infinite; }
    .c3 { animation: commit 3.6s ease-out 2.4s infinite; }
    .cur { animation: cursor 1s step-end infinite; }
    .screen { animation: glow 2.4s ease-in-out infinite; }
  </style>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#151d2e"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="45%" r="55%">
      <stop offset="0" stop-color="#00ff88" stop-opacity=".25"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#00ff88" stop-opacity=".35"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="frame"><rect width="720" height="720" rx="40"/></clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="720" height="720" fill="url(#bg)"/>
    <circle cx="360" cy="320" r="300" fill="url(#halo)"/>

    <!-- floating git bits -->
    <g class="f1" transform="translate(110 140)">
      <rect x="-50" y="-24" width="100" height="48" rx="14" fill="#0b0f18" stroke="#28c840" stroke-opacity=".6"/>
      <text class="mono" x="0" y="7" text-anchor="middle" font-size="18" fill="#28c840">+128</text>
    </g>
    <g class="f2" transform="translate(610 150)">
      <rect x="-50" y="-24" width="100" height="48" rx="14" fill="#0b0f18" stroke="#ff5f57" stroke-opacity=".6"/>
      <text class="mono" x="0" y="7" text-anchor="middle" font-size="18" fill="#ff7b72">-42</text>
    </g>
    <!-- branch graph -->
    <g transform="translate(600 330)" stroke-width="4" fill="none">
      <path d="M0 -50 V50" stroke="#7cc0ff"/>
      <path d="M0 -10 Q30 -10 30 20 V50" stroke="#00ff88"/>
      <circle cx="0" cy="-50" r="8" fill="#0b0f18" stroke="#7cc0ff"/>
      <circle cx="0" cy="-10" r="8" fill="#0b0f18" stroke="#7cc0ff"/>
      <circle cx="30" cy="30" r="8" fill="#0b0f18" stroke="#00ff88"/>
      <circle cx="0" cy="50" r="8" fill="#7cc0ff" stroke="#7cc0ff"/>
    </g>

    <!-- commit dots rising -->
    <g fill="#28c840">
      <circle class="c1" cx="120" cy="470" r="7"/>
      <circle class="c2" cx="150" cy="470" r="5"/>
      <circle class="c3" cx="100" cy="470" r="6"/>
    </g>

    <!-- shadow -->
    <ellipse class="shadow" cx="360" cy="600" rx="170" ry="16" fill="#000"/>

    <g class="cat">
      <!-- tentacles -->
      <g fill="#2d333b" stroke="#7cc0ff" stroke-opacity=".55" stroke-width="3">
        <path class="t1" d="M262 470 q-30 50 -70 60 q-14 4 -10 14 q40 4 92 -62 Z"/>
        <path class="t2" d="M300 490 q-6 54 -36 82 q-10 10 0 16 q42 -20 54 -94 Z"/>
        <path class="t3" d="M420 490 q6 54 36 82 q10 10 0 16 q-42 -20 -54 -94 Z"/>
        <path class="t2" d="M458 470 q30 50 70 60 q14 4 10 14 q-40 4 -92 -62 Z"/>
      </g>

      <!-- body / head silhouette -->
      <path d="M232 250
               L246 160 Q250 146 262 154 L312 196
               Q360 182 408 196 L458 154 Q470 146 474 160 L488 250
               Q512 300 500 360 Q490 470 360 500 Q230 470 220 360 Q208 300 232 250 Z" fill="#2d333b" stroke="#7cc0ff" stroke-opacity=".55" stroke-width="3"/>
      <g class="earL"><path d="M246 160 Q250 146 262 154 L312 196 L252 230 Z" fill="#2d333b"/><path d="M252 230 L246 160 Q250 146 262 154 L312 196" fill="none" stroke="#7cc0ff" stroke-opacity=".55" stroke-width="3"/></g>

      <!-- face -->
      <path d="M262 300 Q262 250 312 250 Q360 262 408 250 Q458 250 458 300 Q458 400 360 404 Q262 400 262 300 Z" fill="#f1c9a5"/>
      <!-- eyes -->
      <ellipse cx="318" cy="318" rx="24" ry="30" fill="#ad5c51"/>
      <ellipse cx="402" cy="318" rx="24" ry="30" fill="#ad5c51"/>
      <ellipse class="eye" cx="322" cy="322" rx="11" ry="15" fill="#24292f"/>
      <ellipse class="eye" cx="406" cy="322" rx="11" ry="15" fill="#24292f"/>
      <circle cx="326" cy="314" r="4" fill="#fff"/>
      <circle cx="410" cy="314" r="4" fill="#fff"/>
      <!-- nose + mouth -->
      <ellipse cx="360" cy="352" rx="9" ry="6" fill="#ad5c51"/>
      <path d="M350 366 Q360 376 370 366" fill="none" stroke="#ad5c51" stroke-width="4" stroke-linecap="round"/>
      <!-- whiskers -->
      <g stroke="#ad5c51" stroke-width="3" stroke-linecap="round">
        <path d="M296 356 L250 348"/><path d="M296 366 L252 372"/>
        <path d="M424 356 L470 348"/><path d="M424 366 L468 372"/>
      </g>
    </g>

    <!-- laptop -->
    <ellipse cx="360" cy="520" rx="180" ry="70" fill="url(#screenGlow)" class="screen"/>
    <path d="M220 590 L250 480 L470 480 L500 590 Z" fill="#c7ccd6"/>
    <path d="M230 584 L256 488 L464 488 L490 584 Z" fill="#aab1bd"/>
    <!-- sticker: brackets -->
    <rect x="322" y="514" width="76" height="40" rx="10" fill="#00ff88"/>
    <text class="mono" x="360" y="541" text-anchor="middle" font-size="20" font-weight="700" fill="#0b0f18">&lt;/&gt;</text>
    <rect x="196" y="586" width="328" height="12" rx="6" fill="#8d95a3"/>

    <!-- tentacle tips typing -->
    <g class="tapL"><ellipse cx="250" cy="584" rx="22" ry="11" fill="#2d333b" stroke="#7cc0ff" stroke-opacity=".55" stroke-width="3"/></g>
    <g class="tapR"><ellipse cx="470" cy="584" rx="22" ry="11" fill="#2d333b" stroke="#7cc0ff" stroke-opacity=".55" stroke-width="3"/></g>

    <!-- terminal line -->
    <text class="mono" x="60" y="670" font-size="20" fill="#8b93a7"><tspan fill="#28c840">$</tspan> git commit -m "feat(devops): automate cloud infrastructure"<tspan class="cur" fill="#00ff88"> ▍</tspan></text>

    <rect x="1" y="1" width="718" height="718" rx="40" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "octocat.svg"), content);
  console.log("Generated: octocat.svg (720x720 with full character animation)");
}

/* ==========================================================================
   4. CLOUD TOPOLOGY ARCHITECTURE (1600x900)
   ========================================================================== */
export function buildServices() {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="End-to-End DevOps and Cloud Architecture Lifecycle Topology">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    .sans { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
    @keyframes rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
    @keyframes dash { to { stroke-dashoffset: -320; } }
    @keyframes pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
    @keyframes glow { 0%,100% { stroke-opacity: .35; } 50% { stroke-opacity: .95; } }
    .n1 { animation: rise .8s ease-out .2s both; }
    .n2 { animation: rise .8s ease-out .5s both; }
    .n3 { animation: rise .8s ease-out .8s both; }
    .n4 { animation: rise .8s ease-out 1.1s both; }
    .n5 { animation: rise .8s ease-out 1.4s both; }
    .flow { stroke-dasharray: 8 12; animation: dash 5s linear infinite; }
    .live { animation: pulse 1.8s ease-in-out infinite; }
    .core { animation: glow 3s ease-in-out infinite; }
  </style>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07090f"/>
      <stop offset="1" stop-color="#0d1320"/>
    </linearGradient>
    <radialGradient id="coreG"><stop offset="0" stop-color="#00ff88" stop-opacity=".35"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".04"/></pattern>
    <clipPath id="frame"><rect width="1600" height="900" rx="36"/></clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="1600" height="900" fill="url(#bg)"/>
    <rect width="1600" height="900" fill="url(#grid)"/>
    <circle cx="800" cy="520" r="300" fill="url(#coreG)"/>

    <g class="n1 sans">
      <text class="mono" x="80" y="110" font-size="20" fill="#00ff88" letter-spacing="6">// 03 — CLOUD TOPOLOGY &amp; DEVOPS LIFECYCLE</text>
      <text x="78" y="180" font-size="60" font-weight="800" fill="#fff" letter-spacing="-1.5">End-to-End DevOps &amp; Cloud Infrastructure</text>
    </g>

    <!-- Flow lines from core to services -->
    <g fill="none" stroke-width="2.5">
      <path class="flow" d="M800 520 C640 520 580 330 520 330" stroke="#00ff88" stroke-opacity=".6"/>
      <path class="flow" d="M800 520 C960 520 1020 330 1080 330" stroke="#7cc0ff" stroke-opacity=".6"/>
      <path class="flow" d="M800 520 C640 520 580 720 520 720" stroke="#7cc0ff" stroke-opacity=".6"/>
      <path class="flow" d="M800 520 C960 520 1020 720 1080 720" stroke="#00ff88" stroke-opacity=".6"/>
    </g>

    <!-- Core Hub -->
    <g class="n2">
      <circle class="core" cx="800" cy="520" r="112" fill="#0b0f18" stroke="#00ff88" stroke-width="2.5"/>
      <circle cx="800" cy="520" r="88" fill="none" stroke="#fff" stroke-opacity=".08"/>
      <text class="sans" x="800" y="508" text-anchor="middle" font-size="22" fill="#8b93a7">GITOPS</text>
      <text class="sans" x="800" y="546" text-anchor="middle" font-size="36" font-weight="800" fill="#fff">CORE HUB</text>
    </g>

    <!-- Service nodes: 450x150 -->
    <g class="n3">
      <rect x="70" y="255" width="450" height="150" rx="22" fill="#0b0f18" stroke="#00ff88" stroke-opacity=".45"/>
      <text class="mono" x="100" y="298" font-size="15" fill="#00ff88" letter-spacing="3">01 // IAC &amp; PROVISIONING</text>
      <text class="sans" x="100" y="338" font-size="28" font-weight="700" fill="#fff">Infrastructure as Code</text>
      <text class="sans" x="100" y="372" font-size="16" fill="#8b93a7">Terraform · Ansible · AWS VPC, EC2 &amp; IAM</text>
    </g>
    <g class="n3">
      <rect x="1080" y="255" width="450" height="150" rx="22" fill="#0b0f18" stroke="#1E90FF" stroke-opacity=".45"/>
      <text class="mono" x="1110" y="298" font-size="15" fill="#7cc0ff" letter-spacing="3">02 // CONTAINERIZATION</text>
      <text class="sans" x="1110" y="338" font-size="28" font-weight="700" fill="#fff">Container Runtime &amp; OCI</text>
      <text class="sans" x="1110" y="372" font-size="16" fill="#8b93a7">Docker · Distroless · Rootless Containers · GHCR</text>
    </g>
    <g class="n4">
      <rect x="70" y="645" width="450" height="150" rx="22" fill="#0b0f18" stroke="#1E90FF" stroke-opacity=".45"/>
      <text class="mono" x="100" y="688" font-size="15" fill="#7cc0ff" letter-spacing="3">03 // ORCHESTRATION &amp; GITOPS</text>
      <text class="sans" x="100" y="728" font-size="28" font-weight="700" fill="#fff">Kubernetes Cluster Mesh</text>
      <text class="sans" x="100" y="762" font-size="16" fill="#8b93a7">Helm Charts · Ingress · Automated Canary Rollouts</text>
    </g>
    <g class="n4">
      <rect x="1080" y="645" width="450" height="150" rx="22" fill="#0b0f18" stroke="#00ff88" stroke-opacity=".45"/>
      <text class="mono" x="1110" y="688" font-size="15" fill="#00ff88" letter-spacing="3">04 // SRE &amp; OBSERVABILITY</text>
      <text class="sans" x="1110" y="728" font-size="28" font-weight="700" fill="#fff">Cloud Telemetry &amp; SRE Health</text>
      <text class="sans" x="1110" y="762" font-size="16" fill="#8b93a7">Prometheus Metrics · Grafana Dashboards · Alerts</text>
    </g>

    <!-- status chip -->
    <g class="n5 mono" font-size="17">
      <rect x="1180" y="88" width="340" height="46" rx="23" fill="#28c840" fill-opacity=".1" stroke="#28c840" stroke-opacity=".45"/>
      <circle cx="1210" cy="111" r="6" fill="#28c840" class="live"/>
      <text x="1230" y="117" fill="#8ff0a4">DevOps: 100% Automated</text>
    </g>

    <rect x="1" y="1" width="1598" height="898" rx="36" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "services.svg"), content);
  console.log("Generated: services.svg (1600x900 Cloud Architecture Topology)");
}

/* ==========================================================================
   5. KUBERNETES FLEET RECONCILER & SELF-HEALING MESH (1600x480)
   ========================================================================== */
export function buildPets() {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="480" viewBox="0 0 1600 480" role="img" aria-label="Kubernetes Autonomous Self-Healing Fleet: Live Pod Reconciliation, Cilium eBPF Ingress Routing, and Real-Time SRE Failover">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    .sans { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }

    /* --- Shimmer and Micro-Animations --- */
    @keyframes shimmer { from { transform: translateX(-300px); } to { transform: translateX(1600px); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes spinReverse { to { transform: rotate(-360deg); } }
    @keyframes radarPulse { 0% { r: 5px; opacity: .9; } 100% { r: 16px; opacity: 0; } }
    @keyframes corePulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
    @keyframes streamDash { to { stroke-dashoffset: -48; } }
    @keyframes cur { 50% { opacity: 0; } }

    .shimmer { animation: shimmer 6s ease-in-out infinite; }
    .spin { transform-origin: 200px 235px; animation: spin 8s linear infinite; }
    .spinRev { transform-origin: 200px 235px; animation: spinReverse 12s linear infinite; }
    .radar { transform-origin: 1364px 60px; animation: radarPulse 1.8s ease-out infinite; }
    .core { animation: corePulse 1s ease-in-out infinite; }
    .trafficIn { stroke-dasharray: 4 6; animation: streamDash 1.2s linear infinite; }
    .stream1 { stroke-dasharray: 6 8; animation: streamDash 1.4s linear infinite; }
    .stream2 { stroke-dasharray: 6 8; animation: streamDash 1.1s linear infinite; }
    .stream3 { stroke-dasharray: 6 8; animation: streamDash 1.6s linear infinite; }
    .cur { animation: cur 1s step-end infinite; }

    /* --- Node 02: 12-Second Self-Healing and Reconciliation Lifecycle --- */
    /* Phase 1: 0.0s - 4.0s (0% - 33.3%)  Normal Running */
    /* Phase 2: 4.0s - 6.0s (33.3% - 50%) CrashLoopBackOff OOMKilled */
    /* Phase 3: 6.0s - 8.0s (50% - 66.7%) Auto-Evict and ContainerCreating */
    /* Phase 4: 8.0s - 11.5s (66.7% - 95.8%) Restored and Reconciled (Ready 2/2) */
    /* Phase 5: 11.5s - 12.0s (95.8% - 100%) Reset Loop */

    @keyframes phaseP1 {
      0%, 32.5% { opacity: 1; }
      33.3%, 96.0% { opacity: 0; }
      97.0%, 100% { opacity: 1; }
    }
    @keyframes phaseP2 {
      0%, 32.5% { opacity: 0; }
      33.3%, 49.2% { opacity: 1; }
      50.0%, 100% { opacity: 0; }
    }
    @keyframes phaseP3 {
      0%, 49.2% { opacity: 0; }
      50.0%, 65.8% { opacity: 1; }
      66.7%, 100% { opacity: 0; }
    }
    @keyframes phaseP4 {
      0%, 65.8% { opacity: 0; }
      66.7%, 96.0% { opacity: 1; }
      97.0%, 100% { opacity: 0; }
    }

    /* Node 02 Header Status Badge Animations */
    @keyframes statusBadgeCol {
      0%, 32.5% { color: #00ff88; fill: #00ff88; }
      33.3%, 49.2% { color: #ff5f57; fill: #ff5f57; }
      50.0%, 65.8% { color: #ffd166; fill: #ffd166; }
      66.7%, 96.0% { color: #28c840; fill: #28c840; }
      97.0%, 100% { color: #00ff88; fill: #00ff88; }
    }

    /* Log Stream Fade-ins */
    @keyframes logL1 { 0%, 96.0% { opacity: 1; } }
    @keyframes logL2 { 0%, 32.5% { opacity: 0.25; } 33.3%, 96.0% { opacity: 1; } 97.0%, 100% { opacity: 0.25; } }
    @keyframes logL3 { 0%, 41.0% { opacity: 0.25; } 41.7%, 96.0% { opacity: 1; } 97.0%, 100% { opacity: 0.25; } }
    @keyframes logL4 { 0%, 49.2% { opacity: 0.25; } 50.0%, 96.0% { opacity: 1; } 97.0%, 100% { opacity: 0.25; } }
    @keyframes logL5 { 0%, 57.5% { opacity: 0.25; } 58.3%, 96.0% { opacity: 1; } 97.0%, 100% { opacity: 0.25; } }
    @keyframes logL6 { 0%, 65.8% { opacity: 0.25; } 66.7%, 96.0% { opacity: 1; } 97.0%, 100% { opacity: 0.25; } }
    @keyframes logL7 { 0%, 74.0% { opacity: 0.25; } 75.0%, 96.0% { opacity: 1; } 97.0%, 100% { opacity: 0.25; } }

    /* Node Card 2 Border Pulse During Healing */
    @keyframes node2Glow {
      0%, 32.5% { stroke: rgba(255,255,255,0.08); stroke-width: 1; }
      33.3%, 49.2% { stroke: #ff5f57; stroke-width: 2; }
      50.0%, 65.8% { stroke: #ffd166; stroke-width: 2; }
      66.7%, 96.0% { stroke: #00ff88; stroke-width: 1.5; }
      97.0%, 100% { stroke: rgba(255,255,255,0.08); stroke-width: 1; }
    }

    /* Baseline Initial Properties */
    .p1 { opacity: 1; animation: phaseP1 12s step-end infinite; }
    .p2 { opacity: 0; animation: phaseP2 12s step-end infinite; }
    .p3 { opacity: 0; animation: phaseP3 12s step-end infinite; }
    .p4 { opacity: 0; animation: phaseP4 12s step-end infinite; }

    .node2Card { animation: node2Glow 12s ease-in-out infinite; }
    .node2Status { animation: statusBadgeCol 12s step-end infinite; }

    .ll-1 { opacity: 1; animation: logL1 12s infinite; }
    .ll-2 { opacity: 0.25; animation: logL2 12s step-end infinite; }
    .ll-3 { opacity: 0.25; animation: logL3 12s step-end infinite; }
    .ll-4 { opacity: 0.25; animation: logL4 12s step-end infinite; }
    .ll-5 { opacity: 0.25; animation: logL5 12s step-end infinite; }
    .ll-6 { opacity: 0.25; animation: logL6 12s step-end infinite; }
    .ll-7 { opacity: 0.25; animation: logL7 12s step-end infinite; }
  </style>

  <defs>
    <linearGradient id="bg-fleet" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07090f"/><stop offset="1" stop-color="#0d1320"/>
    </linearGradient>
    <linearGradient id="sh-fleet" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid-fleet" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#fff" stroke-opacity=".03"/></pattern>
    <clipPath id="frame-fleet"><rect width="1600" height="480" rx="36"/></clipPath>
  </defs>

  <g clip-path="url(#frame-fleet)">
    <!-- Base Background and Grid -->
    <rect width="1600" height="480" fill="url(#bg-fleet)"/>
    <rect width="1600" height="480" fill="url(#grid-fleet)"/>
    <rect class="shimmer" x="0" y="0" width="300" height="480" fill="url(#sh-fleet)"/>

    <!-- ==================== HEADER ==================== -->
    <g class="mono">
      <text x="60" y="58" font-size="16" fill="#00ff88" letter-spacing="4">// 09 — CLUSTER AUTO-HEALING and RECONCILIATION MESH</text>
      <text class="sans" x="58" y="96" font-size="32" font-weight="800" fill="#fff" letter-spacing="-0.8">Autonomous Self-Healing Kubernetes Fleet</text>
      <text x="60" y="122" font-size="14" fill="#8b93a7">Declarative GitOps Reconciliation · Liveness Failover · Zero-Downtime Service Mesh</text>

      <!-- Right HUD Badges -->
      <rect x="1150" y="44" width="180" height="32" rx="16" fill="#1b2232" stroke="#7cc0ff" stroke-opacity=".3"/>
      <text x="1240" y="65" text-anchor="middle" font-size="12" font-weight="700" fill="#7cc0ff">K8S v1.31 · PROD-FLEET</text>

      <rect x="1346" y="44" width="194" height="32" rx="16" fill="#0e2416" stroke="#00ff88" stroke-opacity=".4"/>
      <circle class="core" cx="1364" cy="60" r="5" fill="#00ff88"/>
      <circle class="radar" cx="1364" cy="60" r="9" fill="none" stroke="#00ff88" stroke-width="1.5"/>
      <text x="1450" y="65" text-anchor="middle" font-size="12" font-weight="700" fill="#00ff88">AUTO-HEALING ACTIVE</text>
    </g>

    <!-- ==================== ZONE 1: INGRESS and eBPF GATEWAY ==================== -->
    <g transform="translate(60 145)">
      <rect width="280" height="275" rx="18" fill="#0d1320" stroke="#fff" stroke-opacity=".08"/>
      <g class="mono">
        <circle cx="20" cy="24" r="4.5" fill="#00ff88"/>
        <text x="34" y="29" font-size="13" font-weight="700" fill="#e6edf3">INGRESS // CILIUM-eBPF</text>

        <!-- Router Node Center Graphic -->
        <circle cx="140" cy="90" r="28" fill="#131b2a" stroke="#7cc0ff" stroke-width="2"/>
        <circle class="spin" cx="140" cy="90" r="38" fill="none" stroke="#7cc0ff" stroke-dasharray="8 6" stroke-width="1.5"/>
        <circle class="spinRev" cx="140" cy="90" r="46" fill="none" stroke="#00ff88" stroke-opacity=".3" stroke-dasharray="4 8" stroke-width="1"/>
        
        <!-- Crosshairs and Core -->
        <path d="M128 90h24 M140 78v24" stroke="#7cc0ff" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="140" cy="90" r="4" fill="#00ff88"/>

        <!-- WAN Input Stream -->
        <line x1="20" y1="90" x2="94" y2="90" stroke="#7cc0ff" stroke-width="2" stroke-linecap="round" class="trafficIn"/>
        <text x="20" y="78" font-size="11" fill="#8b93a7">WAN :443</text>

        <!-- Telemetry Metrics Strip -->
        <rect x="16" y="152" width="248" height="106" rx="10" fill="#07090f" stroke="#fff" stroke-opacity=".05"/>
        <text x="28" y="176" font-size="11.5" fill="#8b93a7">Traffic Rate:  <tspan fill="#00ff88" font-weight="700">14,850 req/s</tspan></text>
        <text x="28" y="198" font-size="11.5" fill="#8b93a7">p99 Latency:   <tspan fill="#7cc0ff" font-weight="700">12.4 ms</tspan></text>
        <text x="28" y="220" font-size="11.5" fill="#8b93a7">mTLS Policy:   <tspan fill="#00ff88">Strict Zero-Trust</tspan></text>
        <text x="28" y="242" font-size="11.5" fill="#8b93a7">Packet Loss:   <tspan fill="#00ff88" font-weight="700">0.00% (Healthy)</tspan></text>
      </g>
    </g>

    <!-- Ingress Network Streams to Nodes -->
    <path d="M340 235 C 360 235, 365 210, 370 210" fill="none" stroke="#7cc0ff" stroke-width="2" class="stream1"/>
    <path d="M340 235 C 480 235, 540 210, 620 210" fill="none" stroke="#00ff88" stroke-width="2" class="stream2"/>
    <path d="M340 235 C 600 250, 750 250, 870 250" fill="none" stroke="#7cc0ff" stroke-width="2" class="stream3"/>

    <!-- ZONE 2: 3 WORKER NODES -->

    <!-- Node 01: worker-01 (us-east-1a) -->
    <g transform="translate(370 145)">
      <rect width="235" height="275" rx="18" fill="#0d1320" stroke="#fff" stroke-opacity=".08"/>
      <g class="mono">
        <circle cx="18" cy="24" r="4.5" fill="#00ff88"/>
        <text x="32" y="29" font-size="12" font-weight="700" fill="#e6edf3">NODE-01 · 1A</text>
        <text x="218" y="29" text-anchor="end" font-size="11" font-weight="700" fill="#00ff88">READY</text>

        <!-- Pod 1 -->
        <rect x="12" y="44" width="211" height="46" rx="8" fill="#131b2a" stroke="#00ff88" stroke-opacity=".3"/>
        <circle cx="28" cy="67" r="4.5" fill="#00ff88"/>
        <text x="42" y="62" font-size="12" font-weight="700" fill="#e6edf3">pod/gateway-api</text>
        <text x="42" y="78" font-size="10.5" fill="#8b93a7">CPU: 24% · RAM: 180MB · 2/2</text>

        <!-- Pod 2 -->
        <rect x="12" y="98" width="211" height="46" rx="8" fill="#131b2a" stroke="#00ff88" stroke-opacity=".3"/>
        <circle cx="28" cy="121" r="4.5" fill="#00ff88"/>
        <text x="42" y="116" font-size="12" font-weight="700" fill="#e6edf3">pod/auth-svc</text>
        <text x="42" y="132" font-size="10.5" fill="#8b93a7">CPU: 16% · RAM: 140MB · 1/1</text>

        <!-- Node Spec Footer -->
        <rect x="12" y="152" width="211" height="106" rx="8" fill="#07090f" stroke="#fff" stroke-opacity=".05"/>
        <text x="24" y="176" font-size="11" fill="#8b93a7">Kernel: Linux 6.8 · Kubelet</text>
        <text x="24" y="196" font-size="11" fill="#8b93a7">Cores: 8/8 · Load: 0.28</text>
        <text x="24" y="216" font-size="11" fill="#8b93a7">eBPF Route: eth0 mTLS OK</text>
        <text x="24" y="242" font-size="11.5" font-weight="700" fill="#00ff88">NODE STATUS: HEALTHY</text>
      </g>
    </g>

    <!-- Node 02: worker-02 (us-east-1b) - LIVE SELF-HEALING HERO -->
    <g transform="translate(620 145)">
      <rect class="node2Card" width="235" height="275" rx="18" fill="#0d1320" stroke="#fff" stroke-opacity=".08"/>
      <g class="mono">
        <circle class="node2Status" cx="18" cy="24" r="4.5" fill="#00ff88"/>
        <text x="32" y="29" font-size="12" font-weight="700" fill="#e6edf3">NODE-02 · 1B</text>
        
        <!-- Dynamic Header Tag -->
        <g class="p1"><text x="218" y="29" text-anchor="end" font-size="11" font-weight="700" fill="#00ff88">READY</text></g>
        <g class="p2"><text x="218" y="29" text-anchor="end" font-size="11" font-weight="700" fill="#ff5f57">FAILOVER</text></g>
        <g class="p3"><text x="218" y="29" text-anchor="end" font-size="11" font-weight="700" fill="#ffd166">HEALING</text></g>
        <g class="p4"><text x="218" y="29" text-anchor="end" font-size="11" font-weight="700" fill="#28c840">RECONCILED ✓</text></g>

        <!-- Pod 1: The Self-Healing Pod Lifecycle -->
        <!-- State 1: Normal Running -->
        <g class="p1">
          <rect x="12" y="44" width="211" height="46" rx="8" fill="#131b2a" stroke="#00ff88" stroke-opacity=".3"/>
          <circle cx="28" cy="67" r="4.5" fill="#00ff88"/>
          <text x="42" y="62" font-size="12" font-weight="700" fill="#e6edf3">pod/payment-svc-5c2a</text>
          <text x="42" y="78" font-size="10.5" fill="#8b93a7">Running · CPU 42% · 310MB</text>
        </g>

        <!-- State 2: CrashLoopBackOff Failure -->
        <g class="p2">
          <rect x="12" y="44" width="211" height="46" rx="8" fill="#281418" stroke="#ff5f57" stroke-width="1.8"/>
          <circle cx="28" cy="67" r="4.5" fill="#ff5f57"/>
          <text x="42" y="62" font-size="12" font-weight="700" fill="#ff7b72">CrashLoopBackOff</text>
          <text x="42" y="78" font-size="10.5" fill="#ff7b72">exit 137 OOM · liveness fail</text>
        </g>

        <!-- State 3: Auto-Evict and ContainerCreating -->
        <g class="p3">
          <rect x="12" y="44" width="211" height="46" rx="8" fill="#262013" stroke="#ffd166" stroke-width="1.8"/>
          <circle cx="28" cy="67" r="4.5" fill="#ffd166"/>
          <text x="42" y="62" font-size="12" font-weight="700" fill="#ffd166">ContainerCreating</text>
          <text x="42" y="78" font-size="10.5" fill="#ffd166">evicting dead · pull ghcr.io</text>
        </g>

        <!-- State 4: Restored and Reconciled -->
        <g class="p4">
          <rect x="12" y="44" width="211" height="46" rx="8" fill="#0e2416" stroke="#28c840" stroke-width="1.8"/>
          <circle cx="28" cy="67" r="4.5" fill="#28c840"/>
          <text x="42" y="62" font-size="12" font-weight="700" fill="#28c840">payment-svc-6e3d ✓</text>
          <text x="42" y="78" font-size="10.5" fill="#8ff0a4">Ready 2/2 · 0 dropped pkts</text>
        </g>

        <!-- Pod 2: Running Steadily -->
        <rect x="12" y="98" width="211" height="46" rx="8" fill="#131b2a" stroke="#00ff88" stroke-opacity=".3"/>
        <circle cx="28" cy="121" r="4.5" fill="#00ff88"/>
        <text x="42" y="116" font-size="12" font-weight="700" fill="#e6edf3">pod/cache-worker</text>
        <text x="42" y="132" font-size="10.5" fill="#8b93a7">CPU: 12% · RAM: 220MB · 1/1</text>

        <!-- Node 2 Dynamic Footer -->
        <rect x="12" y="152" width="211" height="106" rx="8" fill="#07090f" stroke="#fff" stroke-opacity=".05"/>
        <text x="24" y="176" font-size="11" fill="#8b93a7">Kubelet: Watchdog Probe OK</text>
        <text x="24" y="196" font-size="11" fill="#8b93a7">ReplicaSet: 3/3 desired state</text>
        <text x="24" y="216" font-size="11" fill="#8b93a7">MTTR: 1.8s · Auto Failover</text>
        
        <g class="p1"><text x="24" y="242" font-size="11.5" font-weight="700" fill="#00ff88">STATUS: HEALTHY</text></g>
        <g class="p2"><text x="24" y="242" font-size="11.5" font-weight="700" fill="#ff5f57">STATUS: HEALING TRIGGERED</text></g>
        <g class="p3"><text x="24" y="242" font-size="11.5" font-weight="700" fill="#ffd166">STATUS: RESCHEDULING POD</text></g>
        <g class="p4"><text x="24" y="242" font-size="11.5" font-weight="700" fill="#28c840">STATUS: AUTO-HEALED (0 DOWNTIME)</text></g>
      </g>
    </g>

    <!-- Node 03: worker-03 (us-east-1c) -->
    <g transform="translate(870 145)">
      <rect width="235" height="275" rx="18" fill="#0d1320" stroke="#fff" stroke-opacity=".08"/>
      <g class="mono">
        <circle cx="18" cy="24" r="4.5" fill="#00ff88"/>
        <text x="32" y="29" font-size="12" font-weight="700" fill="#e6edf3">NODE-03 · 1C</text>
        <text x="218" y="29" text-anchor="end" font-size="11" font-weight="700" fill="#00ff88">READY</text>

        <!-- Pod 1 -->
        <rect x="12" y="44" width="211" height="46" rx="8" fill="#131b2a" stroke="#00ff88" stroke-opacity=".3"/>
        <circle cx="28" cy="67" r="4.5" fill="#00ff88"/>
        <text x="42" y="62" font-size="12" font-weight="700" fill="#e6edf3">pod/order-proc</text>
        <text x="42" y="78" font-size="10.5" fill="#8b93a7">CPU: 32% · RAM: 340MB · 2/2</text>

        <!-- Pod 2 -->
        <rect x="12" y="98" width="211" height="46" rx="8" fill="#131b2a" stroke="#00ff88" stroke-opacity=".3"/>
        <circle cx="28" cy="121" r="4.5" fill="#00ff88"/>
        <text x="42" y="116" font-size="12" font-weight="700" fill="#e6edf3">pod/prom-exporter</text>
        <text x="42" y="132" font-size="10.5" fill="#8b93a7">CPU: 6% · RAM: 64MB · 1/1</text>

        <!-- Node Spec Footer -->
        <rect x="12" y="152" width="211" height="106" rx="8" fill="#07090f" stroke="#fff" stroke-opacity=".05"/>
        <text x="24" y="176" font-size="11" fill="#8b93a7">Kernel: Linux 6.8 · Kubelet</text>
        <text x="24" y="196" font-size="11" fill="#8b93a7">Cores: 8/8 · Load: 0.34</text>
        <text x="24" y="216" font-size="11" fill="#8b93a7">Ceph CSI: persistent storage</text>
        <text x="24" y="242" font-size="11.5" font-weight="700" fill="#00ff88">NODE STATUS: HEALTHY</text>
      </g>
    </g>

    <!-- ==================== ZONE 3: SRE EVENT LOG STREAM ==================== -->
    <g transform="translate(1120 145)">
      <rect width="420" height="275" rx="18" fill="#07090f" stroke="#fff" stroke-opacity=".08"/>
      <g class="mono">
        <!-- Terminal Header -->
        <circle cx="20" cy="24" r="4.5" fill="#ff5f57"/>
        <circle cx="34" cy="24" r="4.5" fill="#febc2e"/>
        <circle cx="48" cy="24" r="4.5" fill="#28c840"/>
        <text x="64" y="28" font-size="12" fill="#8b93a7">k8s-reconcile-stream.log</text>
        <rect x="354" y="14" width="52" height="20" rx="10" fill="#0e2416" stroke="#00ff88" stroke-opacity=".4"/>
        <text x="380" y="28" text-anchor="middle" font-size="10" font-weight="700" fill="#00ff88">LIVE</text>

        <!-- Terminal Log Entries -->
        <g font-size="11.5">
          <text class="ll-1" x="18" y="66" fill="#7cc0ff">[11:58:01] cilium-ebpf  : mTLS route 14.8k rps OK</text>
          <text class="ll-2" x="18" y="92" fill="#ff7b72">[11:58:04] kubelet-1b   : liveness probe timeout &gt; 500ms</text>
          <text class="ll-3" x="18" y="118" fill="#ff7b72">[11:58:05] controller   : OOMKilled payment-svc (exit 137)</text>
          <text class="ll-4" x="18" y="144" fill="#ffd166">[11:58:06] sched-k8s    : evicting dead container</text>
          <text class="ll-5" x="18" y="170" fill="#ffd166">[11:58:07] replica-set  : scheduling pod-6e3d on node-02</text>
          <text class="ll-6" x="18" y="196" fill="#8ff0a4">[11:58:08] readiness    : HTTP /healthz 200 OK (passed)</text>
          <text class="ll-7" x="18" y="222" fill="#00ff88">[11:58:09] argocd-sync  : desired == actual state (Synced ✓)</text>
        </g>

        <!-- Terminal Command Prompt -->
        <line x1="12" y1="236" x2="408" y2="236" stroke="#fff" stroke-opacity=".06"/>
        <text x="18" y="258" font-size="12" fill="#8b93a7"><tspan fill="#00ff88">$</tspan> kubectl get pods -A --watch<tspan class="cur" fill="#00ff88"> ▍</tspan></text>
      </g>
    </g>

    <!-- ==================== BOTTOM FOOTER TELEMETRY STRIP ==================== -->
    <rect x="60" y="432" width="1480" height="34" rx="17" fill="#0d1320" stroke="#fff" stroke-opacity=".06"/>
    <text class="mono" x="800" y="454" text-anchor="middle" font-size="12" letter-spacing="1.5" fill="#8b93a7">
      SLO SLA: <tspan fill="#00ff88" font-weight="700">99.999%</tspan> · AUTONOMIC RECOVERY: <tspan fill="#00ff88">ACTIVE</tspan> · GITOPS RECONCILER: <tspan fill="#7cc0ff">ARGO-CD v2.12</tspan> · <tspan fill="#00ff88">0 MANUAL INTERVENTIONS</tspan>
    </text>

    <!-- Outer Card Stroke -->
    <rect x="1" y="1" width="1598" height="478" rx="36" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "pets.svg"), content);
  writeFileSync(join(OUT, "fleet.svg"), content);
  console.log("Generated: pets.svg and fleet.svg (1600x480 Kubernetes Fleet Auto-Healing Mesh animation)");
}

/* ==========================================================================
   6. TECHNOLOGY MATRIX (1600x900)
   ========================================================================== */
export function buildStack() {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="Technology matrix: cloud, containers, IaC and systems observability">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    .sans { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
    @keyframes rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
    @keyframes fill { from { width: 0; } }
    @keyframes pulse { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
    @keyframes sweep { from { transform: translateX(-1600px); } to { transform: translateX(1600px); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    .c1 { animation: rise .8s ease-out .2s both; }
    .c2 { animation: rise .8s ease-out .45s both; }
    .c3 { animation: rise .8s ease-out .7s both; }
    .c4 { animation: rise .8s ease-out .95s both; }
    .bar { animation: fill 1.8s cubic-bezier(.2,.7,.2,1) 1.2s both; }
    .live { animation: pulse 1.6s ease-in-out infinite; }
    .sweep { animation: sweep 6s linear infinite; }
    .f1 { animation: float 5s ease-in-out infinite; }
    .f2 { animation: float 5s ease-in-out 1.2s infinite; }
    .f3 { animation: float 5s ease-in-out 2.4s infinite; }
    .f4 { animation: float 5s ease-in-out 3.6s infinite; }
  </style>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07090f"/><stop offset="1" stop-color="#0d1320"/>
    </linearGradient>
    <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#00ff88"/><stop offset="1" stop-color="#b9ffc7"/></linearGradient>
    <linearGradient id="b" x1="0" x2="1"><stop offset="0" stop-color="#1E90FF"/><stop offset="1" stop-color="#7cc0ff"/></linearGradient>
    <linearGradient id="sw" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#fff" fill-opacity=".07"/></pattern>
    <clipPath id="frame"><rect width="1600" height="900" rx="36"/></clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="1600" height="900" fill="url(#bg)"/>
    <rect width="1600" height="900" fill="url(#dots)"/>
    <rect class="sweep" width="500" height="900" fill="url(#sw)"/>

    <g class="sans">
      <text class="mono c1" x="80" y="110" font-size="20" fill="#00ff88" letter-spacing="6">// 02 — CLOUD &amp; DEVOPS ARSENAL</text>
      <text class="c1" x="78" y="180" font-size="60" font-weight="800" fill="#fff" letter-spacing="-1.5">The tools I build and automate with</text>
      <g class="c1 mono" font-size="17" fill="#8b93a7">
        <circle cx="1268" cy="104" r="6" fill="#28c840" class="live"/>
        <text x="1520" y="110" text-anchor="end">ASPIRING DEVOPS &amp; CLOUD</text>
      </g>
    </g>

    <!-- Card 1: Cloud Platforms & Linux -->
    <g class="c1"><g class="f1">
      <rect x="80" y="240" width="700" height="290" rx="24" fill="#0b0f18" stroke="#00ff88" stroke-opacity=".35"/>
      <text class="mono" x="116" y="292" font-size="16" fill="#00ff88" letter-spacing="4">01 · CLOUD PLATFORMS &amp; LINUX</text>
      <text class="sans" x="116" y="340" font-size="34" font-weight="700" fill="#fff">Reliable cloud foundations</text>
      <g class="mono" font-size="18" fill="#e6e9f0">
        <text x="116" y="398">Linux (Arch, Debian, systemd)</text><rect x="460" y="386" width="280" height="10" rx="5" fill="#fff" fill-opacity=".07"/><rect class="bar" x="460" y="386" width="267" height="10" rx="5" fill="url(#g)"/>
        <text x="116" y="440">AWS (EKS, S3, EC2, IAM)</text><rect x="460" y="428" width="280" height="10" rx="5" fill="#fff" fill-opacity=".07"/><rect class="bar" x="460" y="428" width="252" height="10" rx="5" fill="url(#g)"/>
        <text x="116" y="482">GCP &amp; Cloud Networking</text><rect x="460" y="470" width="280" height="10" rx="5" fill="#fff" fill-opacity=".07"/><rect class="bar" x="460" y="470" width="224" height="10" rx="5" fill="url(#g)"/>
      </g>
    </g></g>

    <!-- Card 2: Containers & Orchestration -->
    <g class="c2"><g class="f2">
      <rect x="820" y="240" width="700" height="290" rx="24" fill="#0b0f18" stroke="#1E90FF" stroke-opacity=".35"/>
      <text class="mono" x="856" y="292" font-size="16" fill="#7cc0ff" letter-spacing="4">02 · CONTAINERS &amp; POD MESH</text>
      <text class="sans" x="856" y="340" font-size="34" font-weight="700" fill="#fff">Orchestrating at scale</text>
      <g class="mono" font-size="18" fill="#e6e9f0">
        <text x="856" y="398">Kubernetes (Deployments, Mesh)</text><rect x="1200" y="386" width="280" height="10" rx="5" fill="#fff" fill-opacity=".07"/><rect class="bar" x="1200" y="386" width="258" height="10" rx="5" fill="url(#b)"/>
        <text x="856" y="440">Docker &amp; Distroless Minimal</text><rect x="1200" y="428" width="280" height="10" rx="5" fill="#fff" fill-opacity=".07"/><rect class="bar" x="1200" y="428" width="270" height="10" rx="5" fill="url(#b)"/>
        <text x="856" y="482">Helm Charts &amp; K3s Local</text><rect x="1200" y="470" width="280" height="10" rx="5" fill="#fff" fill-opacity=".07"/><rect class="bar" x="1200" y="470" width="238" height="10" rx="5" fill="url(#b)"/>
      </g>
    </g></g>

    <!-- Card 3: IaC & GitOps -->
    <g class="c3"><g class="f3">
      <rect x="80" y="560" width="700" height="290" rx="24" fill="#0b0f18" stroke="#1E90FF" stroke-opacity=".35"/>
      <text class="mono" x="116" y="612" font-size="16" fill="#7cc0ff" letter-spacing="4">03 · INFRASTRUCTURE AS CODE &amp; CI/CD</text>
      <text class="sans" x="116" y="660" font-size="34" font-weight="700" fill="#fff">Declarative cloud automation</text>
      <g class="mono" font-size="17">
        <rect x="116" y="696" width="130" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="181" y="724" text-anchor="middle" fill="#7cc0ff">Terraform</text>
        <rect x="258" y="696" width="170" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="343" y="724" text-anchor="middle" fill="#7cc0ff">GitHub Actions</text>
        <rect x="440" y="696" width="120" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="500" y="724" text-anchor="middle" fill="#7cc0ff">Ansible</text>
        <rect x="572" y="696" width="120" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="632" y="724" text-anchor="middle" fill="#7cc0ff">GitOps</text>
        <rect x="116" y="756" width="110" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="171" y="784" text-anchor="middle" fill="#7cc0ff">CI / CD</text>
        <rect x="238" y="756" width="160" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="318" y="784" text-anchor="middle" fill="#7cc0ff">AWS CloudForm</text>
        <rect x="410" y="756" width="150" height="44" rx="12" fill="#1E90FF" fill-opacity=".14"/><text x="485" y="784" text-anchor="middle" fill="#7cc0ff">State Locking</text>
      </g>
    </g></g>

    <!-- Card 4: Systems & Observability -->
    <g class="c4"><g class="f4">
      <rect x="820" y="560" width="700" height="290" rx="24" fill="#0b0f18" stroke="#00ff88" stroke-opacity=".35"/>
      <text class="mono" x="856" y="612" font-size="16" fill="#00ff88" letter-spacing="4">04 · SYSTEMS PROGRAMMING &amp; SRE</text>
      <text class="sans" x="856" y="660" font-size="34" font-weight="700" fill="#fff">Low-latency telemetry &amp; tools</text>
      <g class="mono" font-size="17">
        <rect x="856" y="696" width="80" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="896" y="724" text-anchor="middle" fill="#00ff88">Go</text>
        <rect x="948" y="696" width="110" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="1003" y="724" text-anchor="middle" fill="#00ff88">Python</text>
        <rect x="1070" y="696" width="90" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="1115" y="724" text-anchor="middle" fill="#00ff88">Rust</text>
        <rect x="1172" y="696" width="90" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="1217" y="724" text-anchor="middle" fill="#00ff88">Bash</text>
        <rect x="856" y="756" width="150" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="931" y="784" text-anchor="middle" fill="#00ff88">Prometheus</text>
        <rect x="1018" y="756" width="130" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="1083" y="784" text-anchor="middle" fill="#00ff88">Grafana</text>
        <rect x="1160" y="756" width="130" height="44" rx="12" fill="#00ff88" fill-opacity=".14"/><text x="1225" y="784" text-anchor="middle" fill="#00ff88">Trivy SRE</text>
      </g>
    </g></g>

    <rect x="1" y="1" width="1598" height="898" rx="36" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "stack.svg"), content);
  console.log("Generated: stack.svg (1600x900 Technology Matrix)");
}

/* ==========================================================================
   7. CONNECT TERMINAL BANNER (1600x500)
   ========================================================================== */
export function buildConnect() {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="500" viewBox="0 0 1600 500" role="img" aria-label="Let's build and scale cloud systems together — omindu.dev">
  <style>
    .mono { font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace; }
    .sans { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; }
    @keyframes rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
    @keyframes shine { from { transform: translateX(-700px); } to { transform: translateX(1700px); } }
    @keyframes wave { 0%,100% { transform: translateY(0); } 50% { transform: translateY(14px); } }
    @keyframes blink { 50% { opacity: 0; } }
    .a1 { animation: rise .8s ease-out .2s both; }
    .a2 { animation: rise .8s ease-out .5s both; }
    .a3 { animation: rise .8s ease-out .8s both; }
    .shine { animation: shine 5s ease-in-out infinite; }
    .w1 { animation: wave 7s ease-in-out infinite; }
    .w2 { animation: wave 9s ease-in-out 1s infinite; }
    .cursor { animation: blink 1s step-end infinite; }
  </style>
  <defs>
    <linearGradient id="bg" x1="0" x2="1">
      <stop offset="0" stop-color="#0b1220"/><stop offset=".5" stop-color="#101a2c"/><stop offset="1" stop-color="#08140c"/>
    </linearGradient>
    <linearGradient id="title" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#00ff88"/></linearGradient>
    <linearGradient id="sh" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="frame"><rect width="1600" height="500" rx="36"/></clipPath>
  </defs>
  <g clip-path="url(#frame)">
    <rect width="1600" height="500" fill="url(#bg)"/>
    <path class="w1" d="M0 400 C300 340 500 460 800 400 S1300 340 1600 400 V520 H0Z" fill="#1E90FF" fill-opacity=".14"/>
    <path class="w2" d="M0 430 C260 470 560 370 860 430 S1360 470 1600 420 V520 H0Z" fill="#00ff88" fill-opacity=".14"/>
    <rect class="shine" x="0" y="0" width="600" height="500" fill="url(#sh)"/>

    <text class="mono a1" x="800" y="120" text-anchor="middle" font-size="20" fill="#00ff88" letter-spacing="6">// 10 — INGRESS &amp; COLLABORATE</text>
    <text class="sans a2" x="800" y="215" text-anchor="middle" font-size="76" font-weight="800" fill="url(#title)" letter-spacing="-2">Let's build &amp; scale cloud systems together.</text>
    <text class="mono a3" x="800" y="290" text-anchor="middle" font-size="26" fill="#e6e9f0">$ curl -s https://omindu.dev/connect | sh<tspan class="cursor" fill="#00ff88"> ▍</tspan></text>
    <text class="sans a3" x="800" y="340" text-anchor="middle" font-size="20" fill="#8b93a7">Aspiring DevOps &amp; Cloud Engineer · Kubernetes · Terraform · CI/CD — Colombo, Sri Lanka</text>

    <rect x="1" y="1" width="1598" height="498" rx="36" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "connect.svg"), content);
  console.log("Generated: connect.svg (1600x500 unified widescreen)");
}

/* ==========================================================================
   8. FOOTER BANNER (1600x480)
   ========================================================================== */
export function buildFooter() {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="480" viewBox="0 0 1600 480" role="img" aria-label="Omindu D. Gunathilaka — Aspiring DevOps and Cloud Engineer">
  <style>
    .sans { font-family: 'Segoe UI', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif; }
    .spot { animation: spot 11s ease-in-out infinite alternate both; }
    @keyframes spot { from { transform: translateX(-550px); } to { transform: translateX(550px); } }
  </style>
  <defs>
    <linearGradient id="fill-footer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#151C25"/>
      <stop offset=".75" stop-color="#0B0E13"/>
    </linearGradient>
    <linearGradient id="fadeG-footer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset=".8" stop-color="#fff" stop-opacity=".9"/>
      <stop offset="1" stop-color="#fff" stop-opacity=".45"/>
    </linearGradient>
    <mask id="fade-footer" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="480">
      <rect width="1600" height="480" fill="url(#fadeG-footer)"/>
    </mask>
    <radialGradient id="sp-footer">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="spot-footer" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="480">
      <circle class="spot" cx="800" cy="285" r="500" fill="url(#sp-footer)"/>
    </mask>
    <clipPath id="frame"><rect width="1600" height="480" rx="26"/></clipPath>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="1600" height="480" fill="#07090f"/>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".03"/></pattern>
    <rect width="1600" height="480" fill="url(#grid)"/>

    <g mask="url(#fade-footer)">
      <text class="sans" x="805.5" y="250" text-anchor="middle" font-size="265" font-weight="900" letter-spacing="0" fill="url(#fill-footer)" stroke="#1E2630" stroke-width="1.4">OMINDU D.</text>
      <text class="sans" x="800" y="440" text-anchor="middle" font-size="192" font-weight="900" letter-spacing="0" fill="url(#fill-footer)" stroke="#1E2630" stroke-width="1.4">GUNATHILAKA</text>
      <g mask="url(#spot-footer)">
        <text class="sans" x="805.5" y="250" text-anchor="middle" font-size="265" font-weight="900" letter-spacing="0" fill="#00ff88" fill-opacity=".18" stroke="#00ff88" stroke-width="2.2">OMINDU D.</text>
        <text class="sans" x="800" y="440" text-anchor="middle" font-size="192" font-weight="900" letter-spacing="0" fill="#00ff88" fill-opacity=".18" stroke="#00ff88" stroke-width="2.2">GUNATHILAKA</text>
      </g>
    </g>

    <rect x="1" y="1" width="1598" height="478" rx="26" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  </g>
</svg>`;

  writeFileSync(join(OUT, "footer.svg"), content);
  console.log("Generated: footer.svg (1600x480 full-width typography with spotlight)");
}

/* ==========================================================================
   MAIN EXECUTOR
   ========================================================================= */
export function buildExtraAssets() {
  buildButtons();
  buildHero();
  buildPipelines();
  buildAnimatedPipeline();
  buildOctocat();
  buildStack();
  buildServices();
  buildPets();
  buildConnect();
  buildFooter();
}

if (process.argv[1]?.endsWith("build-extra-assets.mjs")) {
  buildExtraAssets();
}
