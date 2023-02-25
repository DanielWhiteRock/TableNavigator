declare const _default: {
    extends: string;
    plugins: string[];
    rules: {
        'sort-class-members/sort-class-members': (string | {
            order: string[];
            groups: {
                'static-methods': {
                    type: string;
                    static: boolean;
                    sort: string;
                }[];
                methods: {
                    type: string;
                    static: boolean;
                    sort: string;
                }[];
            };
            accessorPairPositioning: string;
        })[];
    };
};
export = _default;
//# sourceMappingURL=service-with-members-sort.d.ts.map