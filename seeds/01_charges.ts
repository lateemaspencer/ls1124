import { Knex } from 'knex';
import { v4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('charges').del();

  const entries = [
    {
      id: v4(),
      tool_type: 'ladder',
      daily_charge: 1.99,
      weekday_charge: true,
      weekend_charge: true,
      holiday_charge: false,
    },
    {
      id: v4(),
      tool_type: 'chainsaw',
      daily_charge: 1.49,
      weekday_charge: true,
      weekend_charge: false,
      holiday_charge: true,
    },
    {
      id: v4(),
      tool_type: 'jackhammer',
      daily_charge: 2.99,
      weekday_charge: true,
      weekend_charge: false,
      holiday_charge: false,
    },
  ];
  // Insert tool charges
  return knex('charges').insert(entries);
}
