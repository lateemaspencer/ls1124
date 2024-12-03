'use server';
import { RentalRepository } from '@/dal';
import { RentalAgreement } from '@/models';

export async function createRental(
  rentalAgreement: RentalAgreement
): Promise<RentalAgreement> {
  const rentalRepository = new RentalRepository();
  return rentalRepository.create(rentalAgreement);
}
