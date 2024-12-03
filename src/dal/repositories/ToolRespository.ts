import db from '@/lib/db';
import { Tool } from '@/models';
import { IToolRepository } from '@/dal';

export class ToolRepository implements IToolRepository {
  async findByCode(id: string): Promise<Tool | null> {
    const tool = await db.tool.findUnique({
      where: { id },
    });

    if (!tool) {
      return null;
    }
    return tool;
  }

  async findAll(): Promise<Tool[]> {
    const tools = await db.tool.findMany();
    return tools;
  }

  async findWithCharge(id: string): Promise<Tool | null> {
    const tool = await db.tool.findUnique({
      where: { id },
      include: {
        charge: {
          select: {
            dailyCharge: true,
            weekdayCharge: true,
            weekendCharge: true,
            holidayCharge: true,
          },
        },
      },
    });

    if (!tool) {
      return null;
    }
    return tool;
  }

  async findAllWithCharge(): Promise<Tool[] | null> {
    const tool = await db.tool.findMany({
      include: {
        charge: {
          select: {
            dailyCharge: true,
            weekdayCharge: true,
            weekendCharge: true,
            holidayCharge: true,
          },
        },
      },
    });

    if (!tool) {
      return null;
    }
    return tool;
  }
}
