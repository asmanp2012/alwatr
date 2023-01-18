import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/storage', getFormStorage);

async function getFormStorage(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getFormStorage');
  connection.requireToken(config.nanoServer.accessToken);
  return await storageClient.getStorage();
}