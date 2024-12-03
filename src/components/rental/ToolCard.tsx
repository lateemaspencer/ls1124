import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ToolCardProps {
  code: string;
  type: string;
  brand: string;
  selected: boolean;
  onSelect: (code: string) => void;
}

export function ToolCard({
  code,
  type,
  brand,
  selected,
  onSelect,
}: ToolCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:scale-105',
        selected && 'ring-2 ring-primary'
      )}
      onClick={() => onSelect(code)}
    >
      <CardContent className="p-4">
        <div className="relative w-full h-32 mb-3">
          <Image
            src={`/tools/${code.toLowerCase()}.jpg`}
            alt={`${brand} ${type}`}
            className="object-cover rounded-md"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            priority
          />
        </div>
        <h3 className="font-semibold">{brand}</h3>
        <p className="text-sm text-muted-foreground capitalize">{type}</p>
      </CardContent>
    </Card>
  );
}
