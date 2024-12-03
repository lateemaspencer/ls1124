import { Tool } from './Tool';
import { RentalAgreement } from './RentalAgreement';
import { RentalFormValues } from '@/types/rental';

export interface RentalFormProps {
  selectedTool?: Tool;
  agreement: RentalAgreement | null;
  onSubmit: (data: RentalFormValues) => void;
  onFormChange: (data: RentalFormValues) => void;
}
