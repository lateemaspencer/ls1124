'use client';

import * as React from 'react';
import { Tool } from '@/models';
import { ProductGridProps } from '@/models';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function ProductGrid({
  tools,
  selectedTool,
  onSelect,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tools &&
        tools.map((tool) => (
          <Card
            key={tool.code}
            className={`cursor-pointer transition-all hover:scale-105 rounded-none
            ${selectedTool === tool.code ? 'ring-2 ring-primary' : ''}
          `}
            onClick={() => onSelect(tool)}
          >
            <CardContent className="p-0">
              <div className="relative w-full h-72 mb-3">
                <Image
                  src={`/tools/${tool.code.toLowerCase()}.jpg`}
                  alt={`${tool.brand} ${tool.type}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="space-y-1 p-4">
                <h3 className="font-semibold text-foreground">{tool.brand}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {tool.type}
                </p>
                <p className="text-xs text-muted-foreground">
                  Code: {tool.code}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
