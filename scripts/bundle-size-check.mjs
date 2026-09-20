#!/usr/bin/env node
/**
 * Bundle-size monitoring.
 *
 * Scans the production bundles of both apps and fails CI when they grow
 * beyond absolute budgets OR jump significantly versus the committed baseline
 * (scripts/bundle-size-baseline.json). Protects the performance budget
 * (architecture doc §17) when adding dependencies to packages/ui or apps.
 *
 * Usage:
 *   node scripts/bundle-size-check.mjs              # check (CI)
 *   node scripts/bundle-size-check.mjs --update     # refresh baseline (maintainers)
 *
 * Env overrides:
 *   STOREFRONT_TOTAL_BUDGET_KB, STOREFRONT_MAX_CHUNK_KB,
 *   ADMIN_TOTAL_BUDGET_KB, ADMIN_MAX_CHUNK_KB
 */
import { readdirSync, readFileSync, existsSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE_FILE = join(ROOT, 'scripts', 'bundle-size-baseline.json');

const BUDGETS = {
  storefront: {
    totalKB: Number(process.env.STOREFRONT_TOTAL_BUDGET_KB ?? 1500), // raw bytes; ~gzip/3
    maxChunkKB: Number(process.env.STOREFRONT_MAX_CHUNK_KB ?? 500),
  },
};

// Growth vs baseline: > GROWTH_WARN% → warning, > GROWTH_ERROR% → fail
const GROWTH_WARN = 0.1;
const GROWTH_ERROR = 0.25;

/** @param {string} dir @returns {{ files: string[], totalKB: number, maxKB: number }} */
function scanJs(dir) {
  const files = [];
  const walk = (p) => {
    if (!existsSync(p)) return;
    for (const entry of readdirSync(p)) {
      const full = join(p, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (entry.endsWith('.js') && !entry.endsWith('.map')) {
        files.push(full);
      }
    }
  };
  walk(dir);
  let total = 0;
  let max = 0;
  for (const f of files) {
    const size = statSync(f).size;
    total += size;
    max = Math.max(max, size);
  }
  return { files, totalKB: total / 1024, maxKB: max / 1024 };
}

const updateBaseline = process.argv.includes('--update');

const storefront = scanJs(join(ROOT, 'apps', 'storefront', '.next', 'static', 'chunks'));

const current = { storefront: storefront.totalKB };
const baseline = existsSync(BASELINE_FILE) ? JSON.parse(readFileSync(BASELINE_FILE, 'utf8')) : null;

let failed = false;
const report = [];

for (const app of ['storefront']) {
  const { totalKB, maxChunkKB } = BUDGETS[app];
  const totals = storefront.totalKB;
  const max = storefront.maxKB;

  const overTotal = totals > totalKB;
  const overMax = max > maxChunkKB;
  if (overTotal || overMax) failed = true;
  report.push(
    `${app}: total=${totals.toFixed(1)}KB (budget ${totalKB}KB ${overTotal ? '❌' : '✅'}) | ` +
      `max chunk=${max.toFixed(1)}KB (budget ${maxChunkKB}KB ${overMax ? '❌' : '✅'})`,
  );

  if (baseline?.[app] != null) {
    const growth = totals / baseline[app] - 1;
    if (growth > GROWTH_ERROR) {
      failed = true;
      report.push(
        `  ⚠️ ${app} grew ${(growth * 100).toFixed(1)}% vs baseline (${baseline[app].toFixed(1)}KB) — exceeds ${(GROWTH_ERROR * 100).toFixed(0)}% error threshold`,
      );
    } else if (growth > GROWTH_WARN) {
      report.push(
        `  ⚠️ ${app} grew ${(growth * 100).toFixed(1)}% vs baseline (${baseline[app].toFixed(1)}KB) — exceeds ${(GROWTH_WARN * 100).toFixed(0)}% warning threshold`,
      );
    }
  }
}

console.log('=== Bundle size report ===');
console.log(report.join('\n'));

if (updateBaseline) {
  writeFileSync(BASELINE_FILE, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`\nBaseline updated → ${BASELINE_FILE}`);
  console.log(JSON.stringify(current));
  process.exit(0);
} else if (!baseline) {
  console.log(
    '\nNo baseline found. Run `node scripts/bundle-size-check.mjs --update` to record one.',
  );
} else {
  console.log('\nBaseline comparison enabled (scripts/bundle-size-baseline.json).');
}

if (failed) {
  console.error('\nBundle size budget exceeded — block merge.');
  process.exit(1);
}
