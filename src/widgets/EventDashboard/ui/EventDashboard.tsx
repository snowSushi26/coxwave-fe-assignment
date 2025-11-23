import React from 'react';
import { useDashboardState } from '../hooks/useDashboardState';
import { DashboardHeader } from './DashboardHeader';
import { DashboardFilters } from './DashboardFilters';
import { DashboardContent } from './DashboardContent';

export const EventDashboard: React.FC = () => {
  const {
    projects,
    actualSelectedProjectId,
    selectedPeriod,
    timezone,
    allEvents,
    paginatedEvents,
    currentPage,
    projectsLoading,
    eventsLoading,
    projectsError,
    eventsError,
    handleProjectChange,
    handlePeriodChange,
    handleCustomDateChange,
    handlePageChange,
    ITEMS_PER_PAGE,
  } = useDashboardState();

  if (projectsLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-gray-600'>Loading projects...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-background rounded-lg shadow-sm p-6'>
          <DashboardHeader
            eventsCount={allEvents.length}
            isLoading={eventsLoading}
            error={projectsError || eventsError}
          />

          <DashboardFilters
            projects={projects}
            selectedProjectId={actualSelectedProjectId}
            selectedPeriod={selectedPeriod}
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
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
