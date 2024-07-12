import { AbstractDB } from "./abstract";

export class Oracle extends AbstractDB {
    client = 'oracle';
    name = 'Oracle Database';

    async info() {
        try {
            const { BANNER_FULL: version } = await this.knex.select('BANNER_FULL').fromRaw('v$version').first();
            const { NAME: database } = await this.knex.select('NAME').fromRaw('v$database').first();
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