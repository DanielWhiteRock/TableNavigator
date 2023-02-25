"use strict";
module.exports = {
    extends: './service',
    rules: {
        '@typescript-eslint/naming-convention': [
            'error',
            {
                format: ['PascalCase', 'camelCase'],
                selector: 'property',
            },
        ],
        'no-underscore-dangle': [
            'error',
            {
                allow: [],
                allowAfterSuper: false,
                allowAfterThis: false,
                allowAfterThisConstructor: false,
                allowFunctionParams: true,
                enforceInClassFields: false,
                enforceInMethodNames: true,
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'lines-between-class-members': [
            'off',
            'always',
            {
                exceptAfterSingleLine: false,
            },
        ],
        'class-methods-use-this': [
            'off',
            {
                enforceForClassFields: true,
                exceptMethods: [],
            },
        ],
        'no-promise-executor-return': ['off'],
        'no-console': ['off'],
        'no-await-in-loop': ['off'],
    },
};
//# sourceMappingURL=asset-mapping.js.map