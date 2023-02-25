/**
 * This jest setup is intended to prevent vscode auto tests to run only TS tests
 * In order to run tests the test should be someone under packages directory
 * It should end with .spec.ts and its package.json scripts.test must contain ""
 */

const recursive = require('recursive-readdir')
const path = require('path')
const fs = require('fs')



function isPackageTestedWithJest(pkgJsonPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath))
  return pkg.scripts?.test?.includes('jest')
}

async function generateProjectDefinitionToPackages() {
  const files = await recursive('.', [])

  const pkgJson = files.filter((f) => isPackageTestedWithJest(f)).map((p) => `<rootDir>/${path.dirname(p)}`)
  return pkgJson
}

module.exports = async () => {
  return {
    preset: 'ts-jest',
    verbose: true,
    testMatch: ['<rootDir>/**/test/**/*.spec.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    projects: await generateProjectDefinitionToPackages(),
  }
}
