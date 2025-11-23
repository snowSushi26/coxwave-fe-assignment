import React from 'react';
import { EventList } from '@/widgets/EventList';
import { Pagination } from '@/features/pagination';
import type { Event } from '@/shared/types';

interface DashboardContentProps {
  events: Event[];
  timezone: string;
  isLoading: boolean;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  events,
  timezone,
  isLoading,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  return (
    <>
      <div className='mb-6'>
        {isLoading ? (
          <div className='text-center py-8 text-gray-500'>Loading events...</div>
        ) : (
          <EventList events={events} timezone={timezone} />
        )}
      </div>

      {!isLoading && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
