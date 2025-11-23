import { useState, useMemo } from 'react';
import { getPeriodDateRange } from '@/shared/lib';
import { paginateEvents, useEvents } from '@/entities/event';
import { useProjects } from '@/entities/project';
import type { PeriodType, DateRange } from '@/shared/types';

const ITEMS_PER_PAGE = 15;

export function useDashboardState() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('today');
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { projects, loading: projectsLoading, error: projectsError } = useProjects();

  const actualSelectedProjectId = selectedProjectId || projects[0]?.id || '';
  const selectedProject = projects.find((p) => p.id === actualSelectedProjectId);
  const timezone = selectedProject?.timeZone || 'Asia/Seoul';

  const dateRange = useMemo(() => {
    return getPeriodDateRange(selectedPeriod, timezone, customDateRange || undefined);
  }, [selectedPeriod, timezone, customDateRange]);

  const {
    events: allEvents,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents({
    projectId: actualSelectedProjectId,
    dateRange,
  });

  const paginatedEvents = useMemo(() => {
    return paginateEvents(allEvents, currentPage, ITEMS_PER_PAGE);
  }, [allEvents, currentPage]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage(1);
  };

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    setCurrentPage(1);
  };

  const handleCustomDateChange = (startDate: Date, endDate: Date) => {
    setCustomDateRange({ startDate, endDate });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
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
  };
}

