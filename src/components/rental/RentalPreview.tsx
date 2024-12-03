import { RentalAgreement } from '@/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

interface RentalPreviewProps {
  agreement: RentalAgreement;
}

export function RentalPreview({ agreement }: RentalPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rental Agreement Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tool Code:</span>
            <span className="text-sm">{agreement?.toolCode || '-'}</span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tool Type:</span>
            <span className="text-sm">
              {capitalizeFirstLetter(agreement?.toolType) || '-'}
            </span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tool Brand:</span>
            <span className="text-sm">{agreement?.toolBrand || '-'}</span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Checkout Date:</span>
            <span className="text-sm">{agreement?.checkoutDate || '-'}</span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Return Date:</span>
            <span className="text-sm">{agreement?.returnDate || '-'}</span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Daily Rental Charge:</span>
            <span className="text-sm">
              ${agreement?.dailyCharge.toFixed(2) || '-'}
            </span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Chargeable Days:</span>
            <span className="text-sm">{agreement?.chargeableDays || '-'}</span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Pre-discount Amount:</span>
            <span className="text-sm">
              ${agreement?.prediscountAmount.toFixed(2) || '-'}
            </span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Discount Percent:</span>
            <span className="text-sm">{agreement?.discountPercent}%</span>
          </div>
          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Discount Amount:</span>
            <span className="text-sm">
              ${agreement?.discountAmount.toFixed(2) || '-'}
            </span>
          </div>
          <Separator />

          <div className="flex justify-between items-center font-semibold">
            <span className="text-sm">Final Amount:</span>
            <span className="text-sm">
              ${agreement?.finalAmount.toFixed(2) || '-'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
