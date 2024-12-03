'use client';

import { useState, useTransition } from 'react';
import { useTools } from '@/hooks/useTools';
import { ProductGrid } from '@/components/ProductGrid';
import { RentalForm } from '@/components/rental/RentalForm';
import { calculateRentalAgreement } from '@/utils';
import { toast } from 'sonner';
import { Tool } from '@/models';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { ToolSkeleton } from '@/components/ToolSkeleton';
import { RentalFormValues } from '@/types/rental';
import { createRental } from './actions/rental';
import { format } from 'date-fns';
import { RentalAgreement } from '@/models';
import { RentalFormSchema } from '@/schemas'; // Import the Zod schema

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [agreement, setAgreement] = useState<RentalAgreement | null>(null);
  const { data: tools, isLoading, error } = useTools();
  const [, setFormError] = useState<string | null>(null);
  const [, setSuccess] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  if (isLoading) return <ToolSkeleton />;
  if (error) return <div className="text-red-500">Error loading tools</div>;

  const calculateAgreement = (
    data: RentalFormValues
  ): RentalAgreement | null => {
    if (!selectedTool?.charge) {
      toast.error('Tool information is incomplete');
      return null;
    }

    // Validate the form data using Zod schema
    const validationResult = RentalFormSchema.safeParse(data);
    if (!validationResult.success) {
      // If validation fails, don't calculate agreement
      return null;
    }

    try {
      return calculateRentalAgreement(
        {
          toolCode: selectedTool.code,
          checkoutDate: format(new Date(data.checkoutDate), 'yyyy-MM-dd'),
          returnDate: format(new Date(data.returnDate), 'yyyy-MM-dd'),
          discountPercent: data.discountPercent || 0,
        },
        selectedTool,
        selectedTool.charge
      );
    } catch (error) {
      toast.error('Failed to calculate rental agreement');
      return null;
    }
  };

  const handleSubmit = async (data: RentalFormValues) => {
    const calculatedAgreement = calculateAgreement(data);
    if (!calculatedAgreement) return;

    startTransition(() => {
      createRental(calculatedAgreement)
        .then(() => {
          toast.success('Rental agreement created successfully');
          setSuccess('Rental agreement created successfully');
          setFormError(null);
        })
        .catch((error) => {
          const message =
            error instanceof Error
              ? error.message
              : 'Failed to create rental agreement';
          toast.error(message);
          setFormError(message);
          setSuccess(null);
        });
    });
  };

  const handleFormChange = (data: RentalFormValues) => {
    const newAgreement = calculateAgreement(data);
    setAgreement(newAgreement);
  };

  return (
    <div className="container py-6 space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Select a Tool</h2>
        <ProductGrid
          tools={tools}
          selectedTool={selectedTool?.code}
          onSelect={setSelectedTool}
        />
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        {selectedTool ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Rental Form for {selectedTool.brand} -{' '}
              {capitalizeFirstLetter(selectedTool.type)}
            </h2>
            <RentalForm
              selectedTool={selectedTool}
              onSubmit={handleSubmit}
              onFormChange={handleFormChange}
              agreement={agreement}
            />
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <h2 className="text-2xl font-semibold mb-6">Rental Form</h2>
            <p>Please select a tool to continue</p>
          </div>
        )}
      </div>
    </div>
  );
}
