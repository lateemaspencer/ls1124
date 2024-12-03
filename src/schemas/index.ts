import { z } from 'zod';

export const RentalFormSchema = z
  .object({
    toolCode: z
      .string({
        required_error: 'Please select a tool',
      })
      .min(1, 'Tool code is required'),
    checkoutDate: z
      .string({
        required_error: 'Checkout date is required',
      })
      .min(1, 'Checkout date is required')
      .refine(
        (date) => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime());
        },
        {
          message: 'Invalid checkout date',
        }
      ),
    returnDate: z
      .string({
        required_error: 'Return date is required',
      })
      .min(1, 'Return date is required')
      .refine(
        (date) => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime());
        },
        {
          message: 'Invalid return date',
        }
      ),
    discountPercent: z
      .number()
      .min(0, 'Discount percent is not in the range 0-100')
      .max(100, 'Discount percent is not in the range 0-100'),
  })
  .refine(
    (data) => {
      if (!data.returnDate || !data.checkoutDate) return true;
      return new Date(data.checkoutDate) < new Date(data.returnDate);
    },
    {
      message: 'Checkout date must be before (but not equal to) return date',
      path: ['checkoutDate'],
    }
  );
