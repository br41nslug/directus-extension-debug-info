import { AbstractDB } from "./abstract";

export class Cockroach extends AbstractDB {
    client = 'cockroachdb';
    name = 'CockroachDB';

    async info() {
        return {
            version: 'unknown',
            database: 'unknown',
            client: this.client,
            name: this.name,
        };
    }
}