declare const _default: {
    extends: string;
    rules: {
        'import/prefer-default-export': string;
        'no-useless-constructor': string;
        'no-unused-vars': string;
        '@typescript-eslint/no-unused-vars': (string | {
            argsIgnorePattern: string;
        })[];
        '@typescript-eslint/explicit-function-return-type': string[];
        '@typescript-eslint/no-useless-constructor': string[];
        'no-empty-function': string;
        'no-shadow': string;
        '@typescript-eslint/no-shadow': string[];
        '@typescript-eslint/no-empty-function': string[];
        camelcase: string[];
        'jest/no-disabled-tests': string;
        'jest/no-focused-tests': string;
        'jest/no-identical-title': string;
        'jest/prefer-to-have-length': string;
        'jest/valid-expect': string;
        'no-console': string;
        'no-underscore-dangle': (string | {
            allow: string[];
        })[];
        '@typescript-eslint/naming-convention': (string | {
            selector: string;
            format: string[];
            leadingUnderscore: string;
        })[];
        'prettier/prettier': (string | {
            prettierLast?: undefined;
        } | {
            prettierLast: boolean;
        })[];
        'import/extensions': (string | {
            js: string;
            jsx: string;
            ts: string;
            tsx: string;
        })[];
    };
    overrides: {
        files: string[];
        rules: {
            'no-await-in-loop': string[];
        };
    }[];
};
export = _default;
//# sourceMappingURL=service.d.ts.map