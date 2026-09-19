/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    // ============================================================
    // Monorepo boundary — apps must stay isolated from each other
    // ============================================================
    {
      name: 'no-cross-app-import',
      comment: 'Apps in a monorepo must never import another app. Shared code belongs in packages/',
      severity: 'error',
      from: {},
      to: { path: '@emc/(storefront|seller-portal)(/|$)' },
    },
    {
      name: 'no-cross-app-path',
      comment:
        'Apps must not reach into another app via relative paths. depgraph runs from inside each app, so own sources appear as src/ and never match.',
      severity: 'error',
      from: {},
      to: { path: '(^|/)apps/' },
    },
    {
      name: 'no-direct-package-internals',
      comment:
        'Import packages only through their public entry (@emc/ui, @emc/contracts, ...). Never import an internal file from packages/<name>/src/',
      severity: 'error',
      from: {},
      to: {
        path: '(^|/)packages/[^/]+/src/.+',
        pathNot: '(^|/)packages/[^/]+/src/index(\\.(ts|tsx))?$',
      },
    },

    // ============================================================
    // FSD layer direction — a lower layer must never import a higher layer
    // Hierarchy: app > processes > pages > widgets > features > entities > shared
    // ============================================================
    {
      name: 'fsd-shared-imports-higher-layers',
      comment: 'shared/ must not import entities, features, widgets, pages, processes or app',
      severity: 'error',
      from: { path: '(^|/)src/shared/' },
      to: { path: '(^|/)src/(app|processes|pages|widgets|features|entities)/' },
    },
    {
      name: 'fsd-entities-imports-higher-layers',
      comment: 'entities/ must not import features, widgets, pages, processes or app',
      severity: 'error',
      from: { path: '(^|/)src/entities/' },
      to: { path: '(^|/)src/(app|processes|pages|widgets|features)/' },
    },
    {
      name: 'fsd-features-imports-higher-layers',
      comment: 'features/ must not import widgets, pages, processes or app',
      severity: 'error',
      from: { path: '(^|/)src/features/' },
      to: { path: '(^|/)src/(app|processes|pages|widgets)/' },
    },
    {
      name: 'fsd-widgets-imports-higher-layers',
      comment: 'widgets/ must not import pages, processes or app',
      severity: 'error',
      from: { path: '(^|/)src/widgets/' },
      to: { path: '(^|/)src/(app|processes|pages)/' },
    },
    {
      name: 'fsd-pages-imports-higher-layers',
      comment: 'pages/ and processes/ must not import app',
      severity: 'error',
      from: { path: '(^|/)src/(pages|processes)/' },
      to: { path: '(^|/)src/app/' },
    },

    // ============================================================
    // FSD slice isolation — a feature/entity must not import a sibling slice
    // (widget→widget composition via public API is intentionally allowed)
    // ============================================================
    {
      name: 'fsd-features-cross-import',
      comment: 'A feature must not import another feature. Extract shared logic to entities/shared',
      severity: 'error',
      from: { path: '^src/features/([^/]+)' },
      to: {
        path: '^src/features/([^/]+)',
        pathNot: '^src/features/$1',
      },
    },
    {
      name: 'fsd-entities-cross-import',
      comment: 'An entity must not import another entity',
      severity: 'error',
      from: { path: '^src/entities/([^/]+)' },
      to: {
        path: '^src/entities/([^/]+)',
        pathNot: '^src/entities/$1',
      },
    },

    // ============================================================
    // Public API only — no deep imports into another slice's internals.
    // e.g. ❌ @/features/cart/model/internal-helper  ✅ @/features/cart
    // ============================================================
    {
      name: 'fsd-deep-import-features',
      comment: 'Import a feature slice only through its public index.ts',
      severity: 'error',
      from: { pathNot: '(^|/)src/features/[^/]+/' },
      to: {
        path: '(^|/)src/features/[^/]+/',
        pathNot: '(^|/)src/features/[^/]+/index(\\.(ts|tsx))?$',
      },
    },
    {
      name: 'fsd-deep-import-entities',
      comment: 'Import an entity slice only through its public index.ts',
      severity: 'error',
      from: { pathNot: '(^|/)src/entities/[^/]+/' },
      to: {
        path: '(^|/)src/entities/[^/]+/',
        pathNot: '(^|/)src/entities/[^/]+/index(\\.(ts|tsx))?$',
      },
    },
    {
      name: 'fsd-deep-import-widgets',
      comment: 'Import a widget slice only through its public index.ts',
      severity: 'error',
      from: { pathNot: '(^|/)src/widgets/[^/]+/' },
      to: {
        path: '(^|/)src/widgets/[^/]+/',
        pathNot: '(^|/)src/widgets/[^/]+/index(\\.(ts|tsx))?$',
      },
    },
    {
      name: 'fsd-deep-import-pages',
      comment: 'Import a page slice only through its public index.ts',
      severity: 'error',
      from: { pathNot: '(^|/)src/pages/[^/]+/' },
      to: {
        path: '(^|/)src/pages/[^/]+/',
        pathNot: '(^|/)src/pages/[^/]+/index(\\.(ts|tsx))?$',
      },
    },
    {
      name: 'fsd-deep-import-processes',
      comment: 'Import a process slice only through its public index.ts',
      severity: 'error',
      from: { pathNot: '(^|/)src/processes/[^/]+/' },
      to: {
        path: '(^|/)src/processes/[^/]+/',
        pathNot: '(^|/)src/processes/[^/]+/index(\\.(ts|tsx))?$',
      },
    },
  ],
  options: {
    doNotFollow: {
      // Treat node_modules and workspace packages as leaf externals: we never
      // traverse inside them, so package-internal edges are not evaluated.
      path: '(node_modules|packages)',
    },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'types'],
    },
    reporterOptions: {
      text: {
        highlightFocused: true,
      },
    },
  },
};
