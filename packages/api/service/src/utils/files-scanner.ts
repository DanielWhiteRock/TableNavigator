import readdir, { EntryInfo } from 'readdirp'
import fs from 'fs'
import { Table } from '@daniel/common-types'
import path from 'path'

export function loadTableJson(packageJsonPath: string): Table {
	return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
}

export function loadTables(entries: string[]): Table[] {
	return entries.map((entry) => loadTableJson(entry)).flat()
}

export async function recursiveGetJSONFiles(rootPath: string, fileName?: string): Promise<string[]> {
	const directoryFilter = ['!.git', '!node_modules']
	let files = ['*.json']
	if (fileName) files = [`${fileName}.json`]
	const entries: EntryInfo[] = await readdir.promise(rootPath, { directoryFilter, fileFilter: files })
	return entries.map((entry) => entry.fullPath)
}

export function normalizeName(name: string): string {
	return path.parse(name.substring(name.lastIndexOf('/') + 1)).name
}
