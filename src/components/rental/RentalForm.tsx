'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RentalFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DateSelection } from './DateSelection';
import { DiscountInput } from './DiscountInput';
import { RentalPreview } from './RentalPreview';
import { RentalFormProps } from '@/models';

type RentalFormValues = z.infer<typeof RentalFormSchema>;

export function RentalForm({
  selectedTool,
  agreement,
  onSubmit,
  onFormChange,
}: RentalFormProps) {
  const form = useForm<RentalFormValues>({
    resolver: zodResolver(RentalFormSchema),
    mode: 'onChange',
    defaultValues: {
      toolCode: selectedTool?.code,
      discountPercent: 0,
    },
  });

  // Reset form when tool changes
  useEffect(() => {
    form.reset({
      toolCode: selectedTool?.code,
      discountPercent: 0,
      checkoutDate: undefined,
      returnDate: undefined,
    });
  }, [selectedTool]);

  // Notify parent of form changes
  useEffect(() => {
    const subscription = form.watch((data) =>
      onFormChange(data as RentalFormValues)
    );
    return () => subscription.unsubscribe();
  }, [form, onFormChange]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DateSelection control={form.control} />
        <DiscountInput control={form.control} />
        {agreement && <RentalPreview agreement={agreement} />}
        <Button
          type="submit"
          className="w-full"
          disabled={
            !agreement || !form.formState.isValid || form.formState.isSubmitting
          }
        >
          Generate Rental Agreement
        </Button>
      </form>
    </Form>
  );
}
