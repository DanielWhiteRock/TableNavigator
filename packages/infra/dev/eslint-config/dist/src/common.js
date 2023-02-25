"use strict";
module.exports = {
    env: {
        node: true,
        es2021: true,
        es6: true,
        'jest/globals': true,
    },
    extends: ['airbnb-base', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript', 'plugin:prettier/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        NodeJS: 'readonly',
    },
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.spec.ts', 'test/**/*.ts', 'dangerfile.ts', '**/dangerfile.ts'] }],
        'no-return-await': 'off',
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        _project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    },
    ignorePatterns: ['**/dist/*.js', '**/generated/*.ts'],
    plugins: ['@typescript-eslint', 'jest'],
};
//# sourceMappingURL=common.js.map