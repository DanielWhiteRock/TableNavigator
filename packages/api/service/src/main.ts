/* eslint-disable no-console */
import { HttpServer } from './api/HttpServer'
import { SERVER_BIND_ADDRESS, SERVER_PORT } from './consts'
import { FilesController } from './controllers/FilesController'

export async function startMain(): Promise<void> {
	const filesController = new FilesController('/Users/daniel/Projects/copy/packages/api/service/tablesFiles')
	const server = new HttpServer(SERVER_PORT, SERVER_BIND_ADDRESS, filesController)
	return server.start()
}

startMain()
	.then()
	.catch((e: Error) => {
		console.info('In Main')
		console.error({
			eventName: 'Main failed',
			errorMessage: e.message,
			stack: e.stack,
		})
		process.exit(1)
	})
