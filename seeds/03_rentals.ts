import { Knex } from 'knex';
import { v4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('rentals').del();

  const now = new Date();

  const entries = [
    {
      id: v4(),
      tool_code: 'LADW',
      checkout_date: '2020-07-02',
      return_date: '2020-07-04',
      discount_percent: 10,
      chargeable_days: 2,
      prediscount_amount: 3.98,
      discount_amount: 0.4,
      final_amount: 3.58,
      created_at: new Date(now.getTime() + 1 * 60 * 60 * 1000), // 1 hour later
    },
    {
      id: v4(),
      tool_code: 'CHNS',
      checkout_date: '2015-07-02',
      return_date: '2015-07-07',
      discount_percent: 25,
      chargeable_days: 3,
      prediscount_amount: 4.47,
      discount_amount: 1.12,
      final_amount: 3.35,
      created_at: new Date(now.getTime() + 1 * 60 * 60 * 1000), // 1 hour later
    },
    {
      id: v4(),
      tool_code: 'JAKR',
      checkout_date: '2020-07-02',
      return_date: '2020-07-06',
      discount_percent: 50,
      chargeable_days: 2,
      prediscount_amount: 5.98,
      discount_amount: 2.99,
      final_amount: 2.99,
      created_at: new Date(now.getTime() + 1 * 60 * 60 * 1000), // 1 hour later
    },
  ];

  return knex('rentals').insert(entries);
}
