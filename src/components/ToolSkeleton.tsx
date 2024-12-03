import { Skeleton } from '@/components/ui/skeleton';

export function ToolSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
          <div className="relative w-full h-32 mb-3 bg-muted rounded-md" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
