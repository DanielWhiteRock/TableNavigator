"use strict";
module.exports = {
    extends: './common',
    rules: {
        'import/prefer-default-export': 'off',
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-useless-constructor': ['error'],
        'no-empty-function': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-empty-function': ['error'],
        camelcase: ['error'],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'no-console': 'error',
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        '@typescript-eslint/naming-convention': ['error', { selector: 'default', format: ['PascalCase', 'camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow' }],
        'prettier/prettier': [
            'error',
            {},
            {
                prettierLast: true,
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    overrides: [
        {
            files: ['src/**/*pagin*.ts', 'src/**/*page*.ts', 'test/**/*.ts'],
            rules: {
                'no-await-in-loop': ['off'],
            },
        },
    ],
};
//# sourceMappingURL=service.js.map