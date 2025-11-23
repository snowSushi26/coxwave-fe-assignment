'use client';

import React from 'react';
import { Select } from '@/shared/ui';
import type { Project } from '@/shared/types';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProjectId,
  onProjectChange,
}) => {
  const options = projects.map((project) => ({
    value: project.id,
    label: project.displayName,
  }));

  return (
    <div className='w-48'>
      <Select
        options={options}
        value={selectedProjectId}
        onChange={(e) => onProjectChange(e.target.value)}
      />
    </div>
  );
};
