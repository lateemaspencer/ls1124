import { Charge, Tool, RentalAgreement } from '@/models';
import { isWeekend, format, addDays, parseISO } from 'date-fns';
import { isHoliday } from './dateUtils';

export function calculateChargeableDays(
  checkoutDate: string,
  returnDate: string,
  charge: Charge
): number {
  let days = 0;
  let currentDate = parseISO(checkoutDate);
  const endDate = parseISO(returnDate);

  const { weekendCharge, holidayCharge, weekdayCharge } = charge;

  while (currentDate < endDate) {
    const currentDateString = currentDate.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
    const isWeekendDay = isWeekend(currentDate);
    const isHolidayDay = isHoliday(currentDateString);

    // Check if it's a holiday first
    if (isHolidayDay) {
      // If it's a holiday, count it only if holidayCharge is true
      days += holidayCharge ? 1 : 0;
    } else if (isWeekendDay) {
      // If it's a weekend (and not a holiday), count it only if weekendCharge is true
      days += weekendCharge ? 1 : 0;
    } else {
      // If it's a weekday (and not a holiday), count it only if weekdayCharge is true
      days += weekdayCharge ? 1 : 0;
    }

    currentDate = addDays(currentDate, 1);
  }

  return days;
}

export function calculateRentalAmounts(
  chargeableDays: number,
  dailyCharge: number,
  discountPercent: number
) {
  const prediscountAmount =
    Math.round(chargeableDays * dailyCharge * 100) / 100;
  const discountAmount =
    Math.round(prediscountAmount * (discountPercent / 100) * 100) / 100;
  const finalAmount =
    Math.round((prediscountAmount - discountAmount) * 100) / 100;

  return {
    prediscountAmount,
    discountAmount: discountAmount,
    finalAmount,
  };
}

interface RentalCalculationInput {
  toolCode: string;
  checkoutDate: string;
  returnDate: string;
  discountPercent: number;
}

export function calculateRentalAgreement(
  input: RentalCalculationInput,
  tool: Tool,
  charge: Charge
): RentalAgreement {
  const checkoutDate = input.checkoutDate;
  const returnDate = input.returnDate;

  const chargeableDays = calculateChargeableDays(
    checkoutDate,
    returnDate,
    charge
  );

  const { prediscountAmount, discountAmount, finalAmount } =
    calculateRentalAmounts(
      chargeableDays,
      charge.dailyCharge,
      input.discountPercent
    );

  return {
    toolBrand: tool.brand,
    toolType: tool.type,
    toolCode: tool.code,
    checkoutDate: checkoutDate,
    returnDate: returnDate,
    discountPercent: input.discountPercent,
    chargeableDays,
    dailyCharge: charge.dailyCharge,
    prediscountAmount,
    discountAmount,
    finalAmount,
  };
}
