import { AbstractDB } from "./abstract";

export class Postgres extends AbstractDB {
    client = 'postgres';
    name = 'PostgreSQL';

    async info() {
        try {
            const { version, current_database } = await this.knex
                .select(this.knex.raw('version(), current_database()'))
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
