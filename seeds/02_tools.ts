import { Knex } from 'knex';
import { v4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('tools').del();

  const entries = [
    {
      id: v4(),
      type: 'chainsaw',
      code: 'CHNS',
      brand: 'Stihl',
    },
    {
      id: v4(),
      type: 'ladder',
      code: 'LADW',
      brand: 'Werner',
    },
    {
      id: v4(),
      type: 'jackhammer',
      code: 'JAKD',
      brand: 'DeWalt',
    },
    {
      id: v4(),
      type: 'jackhammer',
      code: 'JAKR',
      brand: 'Ridgid',
    },
  ];

  // Inserts seed entries
  return knex('tools').insert(entries);
}
