import { defineEndpoint } from '@directus/extensions-sdk';
import { RouteNotFoundError } from '@directus/errors';
import { RequestHandler } from 'express';
import { getDatabase, getDatabaseClient } from './databases';
import { getSystemInfo } from './system';
import { debugPage, debugTldrPage } from './page';

export default defineEndpoint({
	id: 'debug',
	handler: (router, { database, env }) => {
		const dbClient = getDatabaseClient(database);
		const db = getDatabase(dbClient, database);

		router.get('', AdminOnly(async (_, res) => res.send(await debugPage(db, getSystemInfo(), env))));
		router.get('/tldr', AdminOnly(async (_, res) => res.send(await debugTldrPage(db))));
		router.get('/database', AdminOnly(async (_, res) => res.json(await db.info())));
		router.get('/system', AdminOnly((_, res) => res.json(getSystemInfo())));
		router.get('/env', AdminOnly((_, res) => res.json(env)));
	}
});

function AdminOnly(callback: RequestHandler): RequestHandler {
	return (req, res, next) => req.accountability?.admin !== true
		? next(new RouteNotFoundError({ path: '/debug'+req.path }))
		: callback(req, res, next);
}
