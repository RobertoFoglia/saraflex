import 'sqlite3';
import * as knex from 'knex';

export const Database = knex({
        client: 'sqlite3',
        connection: {
        filename: './db.sqlite'
        },
        useNullAsDefault: true
        });