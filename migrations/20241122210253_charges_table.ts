import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('charges', (table) => {
    table.string('id').primary();
    table.string('tool_type').unique().notNullable();
    table.decimal('daily_charge', 10, 2).notNullable();
    table.boolean('weekday_charge').notNullable().defaultTo(true);
    table.boolean('weekend_charge').notNullable().defaultTo(true);
    table.boolean('holiday_charge').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('charges');
}
