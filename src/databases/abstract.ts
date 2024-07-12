import type { Knex } from 'knex';

export type DbInfo = {
    version: string;
    database: string;
    client: string;
    name: string;
};

export abstract class AbstractDB {
    abstract readonly client: string;
    abstract readonly name: string;
    protected knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    abstract info(): Promise<DbInfo>;
}