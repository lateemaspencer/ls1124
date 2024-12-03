'use server';
import { ToolRepository } from '@/dal';
import { Tool } from '@/models';

export async function getTools(): Promise<Tool[]> {
  const toolRepository = new ToolRepository();
  return await toolRepository.findAll();
}

export async function getToolsWithCharge(): Promise<Tool[] | null> {
  const toolRepository = new ToolRepository();
  const tools = await toolRepository.findAllWithCharge();
  return tools;
}
