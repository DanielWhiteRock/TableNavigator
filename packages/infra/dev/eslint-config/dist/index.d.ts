declare const _default: {
    service: {
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
    assetMapping: {
        extends: string;
        rules: {
            '@typescript-eslint/naming-convention': (string | {
                format: string[];
                selector: string;
            })[];
            'no-underscore-dangle': (string | {
                allow: never[];
                allowAfterSuper: boolean;
                allowAfterThis: boolean;
                allowAfterThisConstructor: boolean;
                allowFunctionParams: boolean;
                enforceInClassFields: boolean;
                enforceInMethodNames: boolean;
            })[];
            '@typescript-eslint/explicit-function-return-type': string;
            'lines-between-class-members': (string | {
                exceptAfterSingleLine: boolean;
            })[];
            'class-methods-use-this': (string | {
                enforceForClassFields: boolean;
                exceptMethods: never[];
            })[];
            'no-promise-executor-return': string[];
            'no-console': string[];
            'no-await-in-loop': string[];
        };
    };
    cli: {
        extends: string;
        rules: {
            'no-console': string[];
            'no-param-reassign': string[];
            'no-await-in-loop': string[];
        };
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map