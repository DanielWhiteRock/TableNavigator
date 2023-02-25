import { File, Table, Tables } from '@daniel/common-types'
import { loadTables, normalizeName, recursiveGetJSONFiles } from '../utils/files-scanner'

export class FilesController {
	constructor(private pathToFolder: string) {}

	async getFiles(): Promise<File[]> {
		const files: string[] = await recursiveGetJSONFiles(this.pathToFolder)
		return files.map((item) => {
			return { name: normalizeName(item) }
		})
	}

	async getTables(name: string): Promise<Tables> {
		const files: string[] = await recursiveGetJSONFiles(this.pathToFolder, name)
		const tables: Table[] = await loadTables(files)
		return { tables }
	}
}
