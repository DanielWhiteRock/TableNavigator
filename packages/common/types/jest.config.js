module.exports = {
	preset: 'ts-jest',
	verbose: true,
	collectCoverageFrom: ['**/*.ts', '!test/**'],
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
