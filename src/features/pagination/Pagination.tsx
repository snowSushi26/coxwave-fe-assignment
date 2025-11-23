'use client';

import React from 'react';
import { Button } from '@/shared/ui';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className='flex items-center justify-between w-full'>
      <Button
        variant='outline'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
      >
        Previous
      </Button>

      <div className='text-sm text-gray-700'>
        <span className='font-medium'>
          {startItem}-{endItem}
        </span>{' '}
        / {totalItems}
      </div>

      <Button variant='outline' onClick={() => onPageChange(currentPage + 1)} disabled={!canGoNext}>
        Next
      </Button>
    </div>
  );
};
