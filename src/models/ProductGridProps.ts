import { Tool } from './Tool';

export interface ProductGridProps {
  tools: Tool[] | null | undefined;
  selectedTool?: string;
  onSelect: (tool: Tool) => void;
}
