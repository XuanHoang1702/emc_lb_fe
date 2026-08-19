/** @type {import('eslint').Linter.FlatConfig[]} */
const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/.next/**',
      // Generated build artifacts committed to the repo
      '**/vite.config.js',
      '**/vite.config.d.ts',
      '**/vite.config.d.ts.map',
      '**/*.tsbuildinfo',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript
      ...tseslint.configs['flat/recommended'].reduce(
        (acc, config) => ({ ...acc, ...config.rules }),
        {},
      ),
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'error',

      // General code quality
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      curly: ['error', 'all'],
      'no-throw-literal': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-multi-spaces': 'error',
      'no-unreachable': 'error',
      'no-useless-return': 'error',
      'no-self-compare': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],

      // React
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-key': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['**/src/{shared,widgets,features,entities,pages,processes}/**/*.{ts,tsx}'],
    rules: {
      // Import boundaries (FSD enforcement)
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*'],
              message: 'Do not import from app layer. Only app can import other layers.',
            },
          ],
        },
      ],
    },
  },
  // CommonJS config files (eslint.config.js, lighthouserc.js, vite.config.js, ...)
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // ESM scripts (scripts/*.mjs)
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  prettier,
];
