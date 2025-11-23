import { useState, useMemo } from 'react';
import { getPeriodDateRange } from '@/shared/lib';
import { paginateEvents, useEvents } from '@/entities/event';
import type { PeriodType, DateRange, Project } from '@/shared/types';

const ITEMS_PER_PAGE = 15;

interface UseDashboardStateProps {
  initialProjects: Project[];
}

export function useDashboardState({ initialProjects }: UseDashboardStateProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('custom');
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>({
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-01-01'),
  });
  const [currentPage, setCurrentPage] = useState(1);

  const projects = initialProjects;

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
  };
}
