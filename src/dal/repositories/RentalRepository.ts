import db from '@/lib/db';
import { RentalAgreement } from '@/models';
import { IRentalRepository } from '@/dal';
import { format } from 'date-fns';

export class RentalRepository implements IRentalRepository {
  async create(rental: RentalAgreement): Promise<RentalAgreement> {
    try {
      const tool = await db.tool.findUnique({
        where: { code: rental.toolCode },
        include: { charge: true },
      });

      if (!tool || !tool.charge) {
        throw new Error('Tool or charge information not found');
      }

      const created = await db.rental.create({
        data: {
          toolCode: rental.toolCode,
          checkoutDate: new Date(rental.checkoutDate),
          returnDate: new Date(rental.returnDate),
          discountPercent: rental.discountPercent,
          chargeableDays: rental.chargeableDays,
          prediscountAmount: rental.prediscountAmount,
          discountAmount: rental.discountAmount,
          finalAmount: rental.finalAmount,
        },
        include: {
          tool: {
            include: {
              charge: true,
            },
          },
        },
      });

      return {
        toolCode: created.toolCode,
        toolType: created.tool.type,
        checkoutDate: format(created.checkoutDate, 'yyyy-MM-dd'),
        returnDate: format(created.returnDate, 'yyyy-MM-dd'),
        discountPercent: created.discountPercent,
        chargeableDays: created.chargeableDays,
        dailyCharge: created.tool.charge.dailyCharge,
        prediscountAmount:
          created.chargeableDays * created.tool.charge.dailyCharge,
        discountAmount:
          (created.chargeableDays *
            created.tool.charge.dailyCharge *
            created.discountPercent) /
          100,
        finalAmount: created.finalAmount,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to create rental agreement in server', error);
      }
      throw error;
    }
  }
}
