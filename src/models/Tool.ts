import { Charge } from './Charge';

export interface Tool {
  code: string;
  type: string;
  brand: string;
  charge?: Charge;
}
