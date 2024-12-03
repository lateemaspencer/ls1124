import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tools', (table) => {
    table.string('id').primary();
    table.string('code').unique().notNullable();
    table.string('type').notNullable();
    table.string('brand').notNullable();
    table
      .foreign('type')
      .references('charges.tool_type')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tools');
}
