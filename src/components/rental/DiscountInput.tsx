import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { RentalFormValues } from '@/types/rental';

interface DiscountInputProps {
  control: Control<RentalFormValues>;
}

export function DiscountInput({ control }: DiscountInputProps) {
  return (
    <FormField
      control={control}
      name="discountPercent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Discount Percentage</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              max={100}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
