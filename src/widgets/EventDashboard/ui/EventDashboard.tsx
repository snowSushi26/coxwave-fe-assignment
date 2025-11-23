'use client';

import React from 'react';
import { useDashboardState } from '../hooks/useDashboardState';
import { DashboardHeader } from './DashboardHeader';
import { DashboardFilters } from './DashboardFilters';
import { DashboardContent } from './DashboardContent';
import type { Project } from '@/shared/types';

interface EventDashboardProps {
  initialProjects: Project[];
}

export const EventDashboard: React.FC<EventDashboardProps> = ({ initialProjects }) => {
  const {
    projects,
    actualSelectedProjectId,
    selectedPeriod,
    dateRange,
    timezone,
    allEvents,
    paginatedEvents,
    currentPage,
    eventsLoading,
    eventsError,
    handleProjectChange,
    handlePeriodChange,
    handleCustomDateChange,
    handlePageChange,
    ITEMS_PER_PAGE,
  } = useDashboardState({ initialProjects });

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-background rounded-lg shadow-sm p-6'>
          <DashboardHeader error={eventsError} />

          <DashboardFilters
            projects={projects}
            selectedProjectId={actualSelectedProjectId}
            selectedPeriod={selectedPeriod}
            defaultDateRange={dateRange}
            onProjectChange={handleProjectChange}
            onPeriodChange={handlePeriodChange}
            onCustomDateChange={handleCustomDateChange}
          />

          <DashboardContent
            events={paginatedEvents}
            timezone={timezone}
            isLoading={eventsLoading}
            currentPage={currentPage}
            totalItems={allEvents.length}
            itemsPerPage={ITEMS_PER_PAGE}
            eventsCount={allEvents.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
