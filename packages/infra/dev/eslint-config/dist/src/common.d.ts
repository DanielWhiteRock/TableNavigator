declare const _default: {
    env: {
        node: boolean;
        es2021: boolean;
        es6: boolean;
        'jest/globals': boolean;
    };
    extends: string[];
    globals: {
        Atomics: string;
        SharedArrayBuffer: string;
        NodeJS: string;
    };
    rules: {
        'no-use-before-define': string;
        '@typescript-eslint/no-use-before-define': string;
        'import/no-extraneous-dependencies': (string | {
            devDependencies: string[];
        })[];
        'no-return-await': string;
        '@typescript-eslint/return-await': string[];
    };
    settings: {
        'import/resolver': {
            typescript: {};
        };
    };
    parser: string;
    parserOptions: {
        ecmaVersion: number;
        sourceType: string;
        project: string[];
        _project: string[];
    };
    ignorePatterns: string[];
    plugins: string[];
};
export = _default;
//# sourceMappingURL=common.d.ts.map