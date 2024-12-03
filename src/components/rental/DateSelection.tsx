import { useEffect } from 'react';
import { z } from 'zod';
import { RentalFormSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { format, startOfDay, isBefore } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Control, useFormContext } from 'react-hook-form';

type RentalFormValues = z.infer<typeof RentalFormSchema>;

interface DateSelectionProps {
  control: Control<RentalFormValues>;
}

export function DateSelection({ control }: DateSelectionProps) {
  const form = useFormContext<RentalFormValues>();

  // Watch checkout date changes to reset return date
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'checkoutDate') {
        form.setValue('returnDate', '');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormField
        control={control}
        name="checkoutDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel aria-hidden="true">Checkout Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    aria-label="Checkout Date"
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), 'MM/dd/yy')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString() ?? '')}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="returnDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel aria-hidden="true">Return Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    aria-label="Return Date"
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), 'MM/dd/yy')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString())}
                  disabled={(date) => {
                    const checkoutDate = form.getValues('checkoutDate');
                    return !checkoutDate || date <= new Date(checkoutDate);
                  }}
                  defaultMonth={
                    form.getValues('checkoutDate')
                      ? new Date(form.getValues('checkoutDate'))
                      : undefined
                  }
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
