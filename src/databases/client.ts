import type { Knex } from 'knex';

import { MySql } from './mysql';
import { Postgres } from './postgres';
import { Cockroach } from './cockroach';
import { SQLite } from './sqlite';
import { Oracle } from './oracle';
import { MsSql } from './mssql';

export const DatabaseClients = ['mysql', 'postgres', 'cockroachdb', 'sqlite', 'oracle', 'mssql'/*, 'redshift'*/] as const;
export type DatabaseClient = (typeof DatabaseClients)[number];

export function getDatabaseClient(database: Knex): DatabaseClient {
	switch (database.client.constructor.name) {
		case 'Client_MySQL':
			return 'mysql';
		case 'Client_PG':
			return 'postgres';
		case 'Client_CockroachDB':
			return 'cockroachdb';
		case 'Client_SQLite3':
			return 'sqlite';
		case 'Client_Oracledb':
		case 'Client_Oracle':
			return 'oracle';
		case 'Client_MSSQL':
			return 'mssql';
		// case 'Client_Redshift':
		// 	return 'redshift';
	}

	throw new Error(`Couldn't extract database client`);
}

export function getDatabase(client: DatabaseClient, knex: Knex) {
    switch (client) {
        case 'mysql': return new MySql(knex);
        case 'postgres': return new Postgres(knex);
        case 'cockroachdb': return new Cockroach(knex);
        case 'sqlite': return new SQLite(knex);
        case 'oracle': return new Oracle(knex);
        case 'mssql': return new MsSql(knex);
    }
}
