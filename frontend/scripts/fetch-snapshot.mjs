/**
 * Bakes the live API payload into the bundle at build time.
 *
 * This is the primary defence against Render's free-tier cold start: the
 * deployed site paints real content at t=0 with no network dependency at all,
 * then quietly revalidates against the API once it wakes.
 *
 * Failure is not fatal — the committed snapshot is kept and the build proceeds,
 * so a sleeping API can never break a deploy.
 *
 * Usage: node scripts/fetch-snapshot.mjs
 * Configure with SNAPSHOT_API_URL (defaults to the production API).
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_URL =
    process.env.SNAPSHOT_API_URL ?? "https://project-api-y3d4.onrender.com/api/content";
const OUTPUT_PATH = resolve(__dirname, "../src/data/snapshot.json");

/** A cold instance needs time; a build can afford to wait for it. */
const TIMEOUT_MS = 70_000;
const ATTEMPTS = 3;
const RETRY_DELAY_MS = 5_000;

const wait = (ms) => new Promise((done) => setTimeout(done, ms));

const log = (message) => console.log(`[snapshot] ${message}`);

const fetchOnce = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(timer);
    }
};

const isUsable = (payload) => {
    if (!payload || typeof payload !== "object") return false;
    const projects = Object.values(payload.projects ?? {});
    const hasProjects = projects.some((list) => Array.isArray(list) && list.length > 0);
    const hasStack = Array.isArray(payload.stack) && payload.stack.length > 0;
    return hasProjects || hasStack;
};

const main = async () => {
    log(`fetching ${API_URL}`);

    for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
        try {
            const payload = await fetchOnce();

            if (!isUsable(payload)) {
                throw new Error("payload contained no projects or stack entries");
            }

            const snapshot = {
                generatedAt: payload.generatedAt ?? new Date().toISOString(),
                projects: payload.projects ?? {},
                stack: payload.stack ?? [],
            };

            await writeFile(OUTPUT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
            log(`written — ${snapshot.stack.length} stack groups, generated ${snapshot.generatedAt}`);
            return;
        } catch (error) {
            log(`attempt ${attempt}/${ATTEMPTS} failed: ${error.message}`);
            if (attempt < ATTEMPTS) await wait(RETRY_DELAY_MS);
        }
    }

    try {
        const existing = JSON.parse(await readFile(OUTPUT_PATH, "utf8"));
        log(
            `keeping committed snapshot (generated ${existing.generatedAt ?? "n/a"}). ` +
                "The site will still paint instantly and revalidate at runtime.",
        );
    } catch {
        log("WARNING: no snapshot available. The site will rely on the runtime fetch.");
    }
};

await main();
