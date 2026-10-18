import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import https from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GITHUB_DIR = join(ROOT, ".github");
const USERNAME = "OminduD";

mkdirSync(GITHUB_DIR, { recursive: true });

export async function updateProjectsSummary() {
  const token = process.env.GITHUB_TOKEN;
  const headers = {
    "User-Agent": "OminduD-Profile-Builder",
    "Accept": "application/vnd.github.v3+json",
    ...(token ? { "Authorization": `token ${token}` } : {})
  };

  const repos = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=created&direction=asc`;
    const res = await new Promise((resolve) => {
      https.get(url, { headers }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              resolve(JSON.parse(body));
            } catch {
              resolve([]);
            }
          } else {
            console.warn(`GitHub API repos page ${page} returned status ${res.statusCode}`);
            resolve([]);
          }
        });
      }).on("error", (e) => {
        console.warn("Failed to fetch repos:", e.message);
        resolve([]);
      });
    });

    if (!Array.isArray(res) || res.length === 0) break;
    repos.push(...res);
    if (res.length < 100) break;
    page++;
  }

  const publicCount = repos.filter((r) => !r.private).length;
  const privateCount = repos.filter((r) => r.private).length;
  const totalCount = repos.length;

  console.log(`Repository summary: Total: ${totalCount}, Public: ${publicCount}, Private: ${privateCount}`);

  const summary = {
    updated_at: new Date().toISOString(),
    total_repos: totalCount,
    public_repos: publicCount,
    private_repos: privateCount,
    repositories: repos.map((repo) => ({
      name: repo.name,
      private: Boolean(repo.private),
      language: repo.language || null,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      html_url: repo.html_url
    }))
  };

  const summaryPath = join(GITHUB_DIR, "project-summary.json");
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");
  console.log(`Generated: ${summaryPath}`);

  return summary;
}

if (process.argv[1]?.endsWith("update-projects.mjs")) {
  await updateProjectsSummary();
}
