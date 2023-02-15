import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/customer-order-management.js';

nanoServer.route('PATCH', '/product-list/', async (connection) => {
  logger.logMethod('patch-product-list');
  connection.requireToken(config.nanoServer.adminToken);
  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  const bodyJson = await connection.requireJsonBody<{data: Array<Product>}>();

  for (const price of bodyJson.data) {
    await storageClient.set(price, config.productStoragePrefix + params.name);
  }

  return {
    ok: true,
    data: {},
  };
});