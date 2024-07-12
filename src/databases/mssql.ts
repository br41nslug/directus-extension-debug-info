import { AbstractDB } from "./abstract";

export class MsSql extends AbstractDB {
    client = 'mssql';
    name = 'SQL Server';

    async info() {
        try {
            const { version, current_database } = await this.knex
                .select(this.knex.raw('@@VERSION as version, DB_NAME() as current_database'))
                .first();
            return { 
                version,
                database: current_database,
                client: this.client,
                name: this.name,
            };
        } catch (e) {
            console.error('[debug info]', e);
        }
        
        throw new Error('not found');
    }
}