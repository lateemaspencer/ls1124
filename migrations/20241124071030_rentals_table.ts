import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('rentals', (table) => {
    table.string('id').primary();
    table.string('tool_code').notNullable();
    table.date('checkout_date').notNullable();
    table.date('return_date').notNullable();
    table.decimal('discount_percent', 5, 2).notNullable();
    table.integer('chargeable_days').notNullable();
    table.decimal('prediscount_amount', 10, 2).notNullable();
    table.decimal('discount_amount', 10, 2).notNullable();
    table.decimal('final_amount', 10, 2).notNullable();
    table.timestamps(true, true);
    table.foreign('tool_code').references('tools.code').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('rentals');
}
