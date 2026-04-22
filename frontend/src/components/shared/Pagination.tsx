'use client';

import { Button } from '@/components/primitives/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationMetadata } from '@/lib/types';

interface PaginationProps {
  metadata: PaginationMetadata;
  onPageChange: (page: number) => void;
}

export function Pagination({ metadata, onPageChange }: PaginationProps) {
  const { page, totalPage, totalItems, perPage } = metadata;
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
      <span>
        {totalItems === 0 ? '0 itens' : `${start}–${end} de ${totalItems}`}
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft />
        </Button>
        <span className="px-2">
          {page} / {totalPage}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPage}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
