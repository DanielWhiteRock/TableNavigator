export = {
	extends: './cli',
	plugins: ['sort-class-members'],
	rules: {
		'sort-class-members/sort-class-members': [
			'error',
			{
				order: [
					'constructor',
					'[static-properties]',
					'[static-methods]',
					'[properties]',
					'[conventional-private-properties]',
					'[methods]',
					'[conventional-private-methods]',
				],
				groups: {
					'static-methods': [{ type: 'method', static: true, sort: 'alphabetical' }],
					methods: [{ type: 'method', static: false, sort: 'alphabetical' }],
				},
				accessorPairPositioning: 'getThenSet',
			},
		],
	},
}
