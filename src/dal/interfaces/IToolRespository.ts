import { Tool } from '@/models';

export interface IToolRepository {
  findByCode(code: string): Promise<Tool | null>;
  findAll(): Promise<Tool[] | null>;
  findWithCharge(id: string): Promise<Tool | null>;
}
