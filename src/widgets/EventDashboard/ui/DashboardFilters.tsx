import React from 'react';
import { ProjectSelector } from '@/widgets/ProjectSelector';
import { PeriodSelector } from '@/widgets/PeriodSelector';
import type { Project, PeriodType } from '@/shared/types';

interface DashboardFiltersProps {
  projects: Project[];
  selectedProjectId: string;
  selectedPeriod: PeriodType;
  onProjectChange: (projectId: string) => void;
  onPeriodChange: (period: PeriodType) => void;
  onCustomDateChange: (startDate: Date, endDate: Date) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  projects,
  selectedProjectId,
  selectedPeriod,
  onProjectChange,
  onPeriodChange,
  onCustomDateChange,
}) => {
  return (
    <div className='mb-6 space-y-6'>
      <ProjectSelector
        projects={projects}
        selectedProjectId={selectedProjectId}
        onProjectChange={onProjectChange}
      />

      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        onCustomDateChange={onCustomDateChange}
      />
    </div>
  );
};
