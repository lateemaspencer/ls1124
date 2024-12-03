export interface RentalAgreement {
  toolCode: string;
  toolType: string;
  toolBrand?: string;
  checkoutDate: string;
  returnDate: string;
  dailyCharge: number;
  chargeableDays: number;
  prediscountAmount: number;
  discountPercent: number;
  discountAmount: number;
  finalAmount: number;
}
