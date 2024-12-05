require('dotenv').config({ path: '.env.development' });

import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
  },
};

export default config;
