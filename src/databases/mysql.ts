import { AbstractDB } from "./abstract";

export class MySql extends AbstractDB {
    client = 'mysql';
    name = 'MySQL';

    async info() {
        try {
            const { v: version, d: database } = await this.knex
                .select(this.knex.raw(`VERSION() as v, DATABASE() as d`))
                .first();
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