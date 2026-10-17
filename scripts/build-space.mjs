import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import https from "node:https";
import { C, Doc, svg, chrome, corners, esc } from "./lib.mjs";

const OUT = "/home/omindu/Documents/OminduD/assets";
const CACHE_FILE = "/home/omindu/Documents/OminduD/scripts/contributions-cache.json";
const USERNAME = "OminduD";

// Fetch contribution data from public API or cache fallback
async function fetchContributions() {
  return new Promise((resolve) => {
    const url = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;
    const req = https.get(url, { headers: { "User-Agent": "OminduD-Profile-Builder" } }, (res) => {
      if (res.statusCode !== 200) {
        console.warn(`API returned status ${res.statusCode}, falling back to cache if available.`);
        return resolve(readCache());
      }
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        try {
          const data = JSON.parse(raw);
          writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
          resolve(data);
        } catch (e) {
          console.warn("Error parsing API response:", e);
          resolve(readCache());
        }
      });
    });
    req.on("error", (e) => {
      console.warn("Network error fetching contributions:", e.message);
      resolve(readCache());
    });
    req.setTimeout(8000, () => {
      req.destroy();
      console.warn("Request timed out, falling back to cache.");
      resolve(readCache());
    });
  });
}

function readCache() {
  if (existsSync(CACHE_FILE)) {
    try {
      return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
    } catch (e) {
      console.error("Failed reading cache:", e);
    }
  }
  return null;
}

export async function buildSpace(contribData = null) {
  if (!contribData) {
    contribData = await fetchContributions();
  }

  const d = new Doc(), W = 840, H = 340;
  const out = [];

  const totalCommits = contribData?.total?.lastYear ?? 1946;
  const rawDays = contribData?.contributions ?? [];

  // Group into weeks (each week has 7 days, 0=Sun to 6=Sat)
  const weeks = [];
  if (rawDays.length > 0) {
    const firstDate = new Date(rawDays[0].date);
    let curWeek = [];
    for (let i = 0; i < firstDate.getUTCDay(); i++) curWeek.push(null);
    for (const day of rawDays) {
      curWeek.push(day);
      if (curWeek.length === 7) {
        weeks.push(curWeek);
        curWeek = [];
      }
    }
    if (curWeek.length > 0) {
      while (curWeek.length < 7) curWeek.push(null);
      weeks.push(curWeek);
    }
  }

  // Slice the last 52 weeks
  const displayWeeks = weeks.slice(-52);
  while (displayWeeks.length < 52) {
    displayWeeks.unshift(Array(7).fill(null));
  }

  // Keyframe animations
  d.rule(`.scan{animation:scan 8s linear infinite}@keyframes scan{from{transform:translateY(0)}to{transform:translateY(${H}px)}}
@keyframes blink{50%{opacity:0}}
.cur{animation:blink 1s steps(1) infinite}
.pulse-dot{transform-box:fill-box;transform-origin:center;animation:ring 2.2s ease-out infinite}@keyframes ring{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.8)}}

/* Starfield twinkles */
@keyframes tw1{0%,100%{opacity:.2}50%{opacity:.85}}
@keyframes tw2{0%,100%{opacity:.7}50%{opacity:.15}}
.t1{animation:tw1 3.2s ease-in-out infinite}
.t2{animation:tw2 2.6s ease-in-out infinite}

/* Player Spaceship horizontal patrol / strafe around center (420px) */
@keyframes shipStrafe{
  0%,100% { transform: translateX(0); }
  25% { transform: translateX(-160px); }
  50% { transform: translateX(140px); }
  75% { transform: translateX(-70px); }
}
.player-ship{animation:shipStrafe 12s ease-in-out infinite}

/* Player thruster plasma burn */
@keyframes plasma{0%,100%{transform:scaleY(1);opacity:.75}50%{transform:scaleY(1.55);opacity:1}}
.thruster{transform-box:fill-box;transform-origin:50% 0;animation:plasma .22s ease-in-out infinite}

/* Continuous dual laser cannons firing upwards */
@keyframes laserFlight1{
  0%{transform:translate(0, 0);opacity:1}
  50%{transform:translate(0, -140px);opacity:0}
  100%{transform:translate(0, -140px);opacity:0}
}
@keyframes laserFlight2{
  0%{transform:translate(-160px, 0);opacity:0}
  20%{transform:translate(-160px, 0);opacity:1}
  70%{transform:translate(-160px, -140px);opacity:0}
  100%{transform:translate(-160px, -140px);opacity:0}
}
@keyframes laserFlight3{
  0%{transform:translate(140px, 0);opacity:0}
  45%{transform:translate(140px, 0);opacity:1}
  95%{transform:translate(140px, -140px);opacity:0}
  100%{transform:translate(140px, -140px);opacity:0}
}
.laser-beam{stroke:#00ff88;stroke-width:2.2;stroke-linecap:round;filter:drop-shadow(0 0 4px #00ff88)}
.l1{animation:laserFlight1 2.4s ease-out infinite}
.l2{animation:laserFlight2 2.4s ease-out .8s infinite}
.l3{animation:laserFlight3 2.4s ease-out 1.6s infinite}

/* Chaos Monkey Alien Invader Drone */
@keyframes droneFlight{
  0%,100%{transform:translate(510px, 115px)}
  35%{transform:translate(560px, 140px)}
  70%{transform:translate(450px, 125px)}
}
.chaos-drone{animation:droneFlight 9s ease-in-out infinite}

/* Hit explosion bursts */
@keyframes burst{
  0%,40%{opacity:0;transform:scale(0)}
  45%{opacity:1;transform:scale(1.3)}
  55%{opacity:0;transform:scale(2.2)}
  100%{opacity:0;transform:scale(0)}
}
.hit-burst{transform-box:fill-box;transform-origin:center;animation:burst 2.4s ease-out infinite}`);

  out.push(`<defs>
<clipPath id="win-space"><rect x="1" y="37" width="${W - 2}" height="${H - 38}" rx="5"/></clipPath>
<linearGradient id="sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ff88" stop-opacity="0"/><stop offset=".5" stop-color="#00ff88" stop-opacity=".03"/><stop offset="1" stop-color="#00ff88" stop-opacity="0"/></linearGradient>
<linearGradient id="starsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#06090e"/><stop offset="1" stop-color="#0a0f18"/></linearGradient>
<filter id="glow-l4" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#00ff88" flood-opacity="0.8"/></filter>
</defs>
<g clip-path="url(#win-space)">
<rect x="1" y="37" width="${W - 2}" height="${H - 38}" fill="url(#starsky)"/>
<rect class="scan" x="0" y="-24" width="${W}" height="60" fill="url(#sl)"/>
</g>`);

  out.push(corners(1, 1, W - 2, H - 2, "#00ff88", 6));

  // Starfield
  const stars = [
    [45, 65, 1, "t1"], [92, 145, 1.2, "t2"], [138, 92, 0.8, "t1"], [180, 220, 1.5, "t2"],
    [225, 78, 1, "t2"], [270, 190, 0.8, "t1"], [315, 130, 1.4, "t1"], [360, 260, 0.9, "t2"],
    [405, 85, 1.2, "t1"], [450, 240, 1.5, "t2"], [495, 70, 0.8, "t1"], [540, 185, 1.1, "t2"],
    [585, 275, 1.4, "t1"], [630, 95, 0.9, "t2"], [675, 160, 1.2, "t1"], [720, 80, 1.5, "t2"],
    [765, 230, 1, "t1"], [800, 110, 0.8, "t2"], [60, 260, 1.3, "t2"], [110, 285, 1, "t1"],
    [710, 270, 1.2, "t1"], [750, 175, 0.8, "t2"], [340, 80, 1.1, "t2"], [520, 280, 1, "t1"]
  ];
  stars.forEach(([sx, sy, sr, scls]) => {
    out.push(`<circle class="${scls}" cx="${sx}" cy="${sy}" r="${sr}" fill="#E6EDF3"/>`);
  });

  // Top HUD Bar
  out.push(`<path d="M24 72H${W - 24}" stroke="${C.line2}"/>`);
  out.push(`<circle class="pulse-dot" cx="38" cy="56" r="3" fill="none" stroke="#00ff88"/><circle cx="38" cy="56" r="3" fill="#00ff88"/>`);
  out.push(`<text class="m up" x="48" y="60" font-size="10.5" font-weight="700" letter-spacing="1.1" fill="#00ff88">CHAOS DRILL // FAULT INJECTION ACTIVE</text>`);
  out.push(`<text class="m" x="${W / 2}" y="60" text-anchor="middle" font-size="11" fill="${C.dim}">SCORE: <tspan font-weight="700" fill="${C.text}">${totalCommits.toLocaleString()}</tspan> · WAVE: <tspan font-weight="700" fill="#00ff88">07</tspan></text>`);
  out.push(`<text class="m" x="${W - 38}" y="60" text-anchor="end" font-size="10.5" fill="${C.cyan}">POD_KILLER: random</text>`);

  // REAL COMMIT CALENDAR MATRIX
  // 52 columns x 7 rows
  const bw = 10.5, bh = 10.5, br = 2, gapX = 3.2, gapY = 3.2;
  const startX = 76, startY = 96;

  // Day labels on left (Mon, Wed, Fri)
  const daysLabels = [{ r: 1, text: "Mon" }, { r: 3, text: "Wed" }, { r: 5, text: "Fri" }];
  daysLabels.forEach((d) => {
    const ly = startY + d.r * (bh + gapY) + 8.5;
    out.push(`<text class="m" x="${startX - 10}" y="${ly}" text-anchor="end" font-size="9" fill="${C.dim}">${d.text}</text>`);
  });

  // Month labels above
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = -1;
  displayWeeks.forEach((week, wIdx) => {
    const firstDay = week.find((d) => d && d.date);
    if (firstDay) {
      const mIdx = new Date(firstDay.date).getUTCMonth();
      if (mIdx !== lastMonth && wIdx < 50) {
        lastMonth = mIdx;
        const mx = startX + wIdx * (bw + gapX);
        out.push(`<text class="m" x="${mx}" y="${startY - 8}" font-size="9" fill="${C.muted}">${months[mIdx]}</text>`);
      }
    }
  });

  // Level color palette matching GitHub dark mode + cyber glow
  const levelStyles = {
    0: { fill: "#161b22", opacity: "0.55", stroke: "#21262d", strokeWidth: "0.5" },
    1: { fill: "#0e4429", opacity: "0.95" },
    2: { fill: "#006d32", opacity: "1" },
    3: { fill: "#26a641", opacity: "1" },
    4: { fill: "#00ff88", opacity: "1", filter: 'filter="url(#glow-l4)"' }
  };

  // Draw 52 columns of 7 rows
  for (let w = 0; w < 52; w++) {
    const week = displayWeeks[w] || [];
    const bx = startX + w * (bw + gapX);
    for (let r = 0; r < 7; r++) {
      const day = week[r];
      const by = startY + r * (bh + gapY);
      const lvl = day ? day.level : 0;
      const s = levelStyles[lvl] || levelStyles[0];
      const strokeAttr = s.stroke ? ` stroke="${s.stroke}" stroke-width="${s.strokeWidth}"` : "";
      const filterAttr = s.filter ? ` ${s.filter}` : "";
      out.push(`<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw}" height="${bh}" rx="${br}" fill="${s.fill}" fill-opacity="${s.opacity}"${strokeAttr}${filterAttr}/>`);
    }
  }

  // Hit burst sparks at high commit locations
  out.push(`<g transform="translate(420, 114)" class="hit-burst">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#00ff88" stroke-width="1.8"/>
    <path d="M-10 0h20M0 -10v20M-7 -7l14 14M-7 7l14 -14" stroke="#00ff88" stroke-width="1.2"/>
  </g>`);
  out.push(`<g transform="translate(340, 138)" class="hit-burst" style="animation-delay: 0.8s">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#38BDF8" stroke-width="1.8"/>
    <path d="M-10 0h20M0 -10v20M-7 -7l14 14M-7 7l14 -14" stroke="#38BDF8" stroke-width="1.2"/>
  </g>`);
  out.push(`<g transform="translate(560, 102)" class="hit-burst" style="animation-delay: 1.6s">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#FFB020" stroke-width="1.8"/>
    <path d="M-10 0h20M0 -10v20M-7 -7l14 14M-7 7l14 -14" stroke="#FFB020" stroke-width="1.2"/>
  </g>`);

  // Chaos Monkey Alien Invader Drone
  out.push(`<g class="chaos-drone" transform="translate(510, 115)">
    <path d="M-14 -6 L0 16 L14 -6 L7 -2 L0 4 L-7 -2 Z" fill="#F59E0B" filter="drop-shadow(0 0 6px #F59E0B)"/>
    <polygon points="-8,-4 0,-14 8,-4 0,-1" fill="#FEBC2E"/>
    <circle cx="0" cy="0" r="3" fill="#DC2626"/>
    <line x1="0" y1="16" x2="0" y2="46" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 3"/>
  </g>`);

  // Dual Laser Cannons firing up from ship base (413 & 427, y=228)
  out.push(`<g class="l1"><line class="laser-beam" x1="413" y1="228" x2="413" y2="210"/><line class="laser-beam" x1="427" y1="228" x2="427" y2="210"/></g>`);
  out.push(`<g class="l2"><line class="laser-beam" x1="413" y1="228" x2="413" y2="210"/><line class="laser-beam" x1="427" y1="228" x2="427" y2="210"/></g>`);
  out.push(`<g class="l3"><line class="laser-beam" x1="413" y1="228" x2="413" y2="210"/><line class="laser-beam" x1="427" y1="228" x2="427" y2="210"/></g>`);

  // Player SRE Spaceship positioned centrally at x=420, y=242
  out.push(`<g transform="translate(420, 242)">
    <g class="player-ship">
      <g class="thruster">
        <polygon points="-6,16 0,26 6,16" fill="#00ff88" filter="drop-shadow(0 0 4px #00ff88)"/>
        <polygon points="-3,16 0,22 3,16" fill="#38BDF8"/>
      </g>
      <path d="M0 -14 L15 14 L7 11 L0 14 L-7 11 L-15 14 Z" fill="#1C242E" stroke="#00ff88" stroke-width="1.8"/>
      <polygon points="0,-12 12,12 5,10" fill="#0e4429"/>
      <polygon points="0,-12 -12,12 -5,10" fill="#0e4429"/>
      <ellipse cx="0" cy="-2" rx="3.5" ry="7" fill="#00ff88" filter="drop-shadow(0 0 5px #00ff88)"/>
      <ellipse cx="0" cy="-2" rx="1.8" ry="4" fill="#FFFFFF"/>
      <rect x="-15" y="4" width="2" height="7" rx="1" fill="#38BDF8"/>
      <rect x="13" y="4" width="2" height="7" rx="1" fill="#38BDF8"/>
    </g>
  </g>`);

  // Bottom HUD Bar with Legend
  out.push(`<path d="M24 292H${W - 24}" stroke="${C.line2}"/>`);
  out.push(`<text class="m" x="38" y="316" font-size="10.5" fill="${C.dim}">CLUSTER: <tspan fill="#00ff88">HEALTHY (5/5 PODS)</tspan></text>`);
  out.push(`<text class="m" x="${W / 2 + 10}" y="316" text-anchor="middle" font-size="10.5" fill="${C.dim}">ANNUAL SCORE: <tspan fill="#00ff88" font-weight="700">${totalCommits.toLocaleString()} COMMITS</tspan> · 365 DAYS</text>`);

  // Contribution legend on bottom right
  const legX = W - 150, legY = 307;
  out.push(`<text class="m" x="${legX - 8}" y="${legY + 9}" text-anchor="end" font-size="9" fill="${C.dim}">Less</text>`);
  [0, 1, 2, 3, 4].forEach((lvl, idx) => {
    const s = levelStyles[lvl];
    const lx = legX + idx * 13;
    const strokeAttr = s.stroke ? ` stroke="${s.stroke}" stroke-width="${s.strokeWidth}"` : "";
    out.push(`<rect x="${lx}" y="${legY}" width="9" height="9" rx="1.5" fill="${s.fill}" fill-opacity="${s.opacity}"${strokeAttr}/>`);
  });
  out.push(`<text class="m" x="${legX + 5 * 13 + 4}" y="${legY + 9}" font-size="9" fill="${C.dim}">More</text>`);

  const body = chrome(W, H, "omindud@workstation: ~ (chaos-drill)", "chaos-monkey inject --cluster") + "\n" + out.join("\n");
  writeFileSync(
    join(OUT, "space.svg"),
    svg({
      w: W, h: H, doc: d, fonts: ["jbm-400", "jbm-700", "sg-500", "sg-700"],
      title: "Omindu D. Gunathilaka (@OminduD) — Chaos Monkey Drill (Live GitHub Commit Calendar)",
      desc: "Chaos Monkey Resiliency Drill: Live GitHub contribution calendar defense simulation with space shooter defense system for Omindu D. Gunathilaka (@OminduD)",
      body
    })
  );
  console.log("Successfully generated: assets/space.svg with real live GitHub contribution calendar!");
}

// Run directly when executed
if (process.argv[1]?.endsWith("build-space.mjs")) {
  buildSpace();
}
