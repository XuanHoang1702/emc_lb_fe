#!/usr/bin/env node
/**
 * SEO assertion script
 *
 * Chạy sau khi storefront đã build & serve, kiểm tra trên HTTP:
 *  - Mỗi route chính: HTTP 200, <title>, meta description, canonical, OG tags, JSON-LD
 *  - /robots.txt: có tham chiếu Sitemap
 *  - /sitemap.xml: XML hợp lệ với <loc> tuyệt đối
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 SITE_URL=https://emc.example.com node scripts/seo-check.mjs
 */

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const SITE_URL = (process.env.SITE_URL ?? 'https://emc.example.com').replace(/\/$/, '');
const ROUTES = (process.env.SEO_ROUTES ?? '/')
  .split(',')
  .map((route) => route.trim())
  .filter(Boolean);

const failures = [];
let checks = 0;

function check(condition, label) {
  checks += 1;
  if (!condition) {
    failures.push(label);
  }
}

async function fetchText(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  return { status: response.status, body: await response.text() };
}

const META_RE = (name) =>
  new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["'][^"']*["']`, 'i');

function hasMeta(html, name) {
  return META_RE(name).test(html);
}

async function checkRoute(route) {
  const path = route === '/' ? '/' : route;
  const { status, body } = await fetchText(path);

  check(status === 200, `${path}: HTTP ${status} (expected 200)`);

  const titleMatch = body.match(/<title>\s*([^<]*?)\s*<\/title>/i);
  check(Boolean(titleMatch && titleMatch[1]?.trim()), `${path}: missing <title>`);

  const descriptionMatch = body.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  check(
    Boolean(descriptionMatch && descriptionMatch[1]?.trim()),
    `${path}: missing or empty meta description`,
  );

  const canonicalMatch = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  check(Boolean(canonicalMatch), `${path}: missing canonical link`);
  if (canonicalMatch) {
    const canonicalUrl = canonicalMatch[1];
    // Chấp nhận cả trailing slash lẫn không — Google xem chúng tương đương
    const normalizedExpected = `${SITE_URL}${path}`.replace(/\/$/, '');
    const normalizedActual = canonicalUrl.replace(/\/$/, '');
    check(
      normalizedActual === normalizedExpected,
      `${path}: canonical mismatch (${canonicalUrl} !== ${SITE_URL}${path})`,
    );
  }

  for (const tag of ['og:title', 'og:description', 'og:image', 'og:type']) {
    check(hasMeta(body, tag), `${path}: missing ${tag}`);
  }

  if (path === '/') {
    const jsonLdScripts =
      body.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) ?? [];
    check(
      jsonLdScripts.some((script) => script.includes('"@type":"Organization"')),
      `${path}: missing Organization JSON-LD`,
    );
  }

  console.log(`  ✓ ${path}`);
}

async function main() {
  console.log(`SEO check — BASE_URL=${BASE_URL}, SITE_URL=${SITE_URL}`);
  console.log(`Routes: ${ROUTES.join(', ')}`);
  console.log('');

  for (const route of ROUTES) {
    await checkRoute(route);
  }

  const robots = await fetchText('/robots.txt');
  check(robots.status === 200, '/robots.txt: HTTP ' + robots.status);
  check(
    robots.body.includes(`Sitemap: ${SITE_URL}/sitemap.xml`),
    '/robots.txt: missing Sitemap reference',
  );

  const sitemap = await fetchText('/sitemap.xml');
  check(sitemap.status === 200, '/sitemap.xml: HTTP ' + sitemap.status);
  check(
    /^<\?xml[^>]*\?>/i.test(sitemap.body) && sitemap.body.includes('<urlset'),
    '/sitemap.xml: invalid XML root',
  );
  const homeLoc = `<loc>${SITE_URL.replace(/\/$/, '')}</loc>`;
  const homeLocSlash = `<loc>${SITE_URL.replace(/\/$/, '')}/</loc>`;
  check(
    sitemap.body.includes(homeLoc) || sitemap.body.includes(homeLocSlash),
    `/sitemap.xml: missing absolute <loc> ${SITE_URL}/`,
  );

  console.log('');
  console.log(`Checked ${checks} assertions, ${failures.length} failure(s).`);

  const lines = [
    '# SEO Check Report',
    '',
    `- BASE_URL: \`${BASE_URL}\``,
    `- SITE_URL: \`${SITE_URL}\``,
    `- Assertions checked: ${checks}`,
    `- Failures: ${failures.length}`,
    '',
  ];

  if (failures.length > 0) {
    console.error('');
    console.error('Failures:');
    lines.push('## Failures');
    lines.push('');
    for (const failure of failures) {
      console.error(`  ✗ ${failure}`);
      lines.push(`- ✗ ${failure}`);
    }
    lines.push('');
    process.exitCode = 1;
  } else {
    lines.push('All SEO checks passed.');
    console.log('SEO checks passed.');
  }

  const { mkdir, writeFile } = await import('node:fs/promises');
  await mkdir('seo-report', { recursive: true });
  await writeFile('seo-report/seo-report.md', `${lines.join('\n')}\n`);
}

main().catch((error) => {
  console.error(`SEO check crashed: ${error.message}`);
  process.exit(1);
});
