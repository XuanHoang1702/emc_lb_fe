module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3,
      startServerCommand: 'npx next start apps/storefront -p 3000',
      startServerReadyPattern: 'Ready',
    },
    assert: {
      assertions: {
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.8 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-report',
    },
  },
};
