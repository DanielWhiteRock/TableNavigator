/* eslint-disable no-console */
import { File, Tables } from '@daniel/common-types'
import Fastify from 'fastify'
import qs from 'qs'
import cors from '@fastify/cors'
import { FilesController } from '../controllers/FilesController'

export class HttpServer {
	constructor(private listenPort: number, private listenAddress: string, private fileController: FilesController) {}

	private fastify = Fastify({
		logger: true,
		querystringParser: (str) => qs.parse(str),
	})

	public async start(): Promise<void> {
		await this.fastify.register(cors, {
			origin: ['http://localhost:4200'],
		})

		this.fastify.get('/health', async () => {
			return 'I am healthy'
		})

		this.fastify.get<{}, File[]>('/api/tables', async () => {
			return this.fileController.getFiles()
		})

		this.fastify.get<{ Params: { name: string } }, Tables>('/api/tables/:name', async (request) => {
			const { name } = request.params
			return this.fileController.getTables(name)
		})

		try {
			await this.fastify.listen(this.listenPort, this.listenAddress)
			console.info(`Started on ${this.listenAddress}:${this.listenPort}`)
		} catch (err) {
			console.error(err)
			throw err
		}
	}
}
