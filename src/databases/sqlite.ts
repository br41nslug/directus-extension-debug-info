import { AbstractDB } from "./abstract";

export class SQLite extends AbstractDB {
    client = 'sqlite';
    name = 'SQLite';
    
    async info() {
        try {
            const { version } = await this.knex.select(this.knex.raw('sqlite_version() as version')).first();
            const database = (await this.knex.raw('PRAGMA database_list'))[0]['file'];
            return {
                version, database,
                client: this.client,
                name: this.name,
            };
        } catch (e) {
            console.error('[debug info]', e);
        }
        
        throw new Error('not found');
    }
}