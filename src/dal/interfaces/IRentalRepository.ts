import { RentalAgreement } from '@/models';

export interface IRentalRepository {
  create(rental: RentalAgreement): Promise<RentalAgreement>;
}
