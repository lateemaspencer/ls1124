import { useQuery } from '@tanstack/react-query';
import { getToolsWithCharge } from '@/app/actions/tool';

export function useTools() {
  return useQuery({
    queryKey: ['tools'],
    queryFn: getToolsWithCharge,
  });
}
