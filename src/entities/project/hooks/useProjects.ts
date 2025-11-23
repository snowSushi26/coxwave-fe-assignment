import { useState, useEffect } from 'react';
import { fetchProjects } from '@/shared/api';
import type { Project } from '@/shared/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectList = await fetchProjects();
        setProjects(projectList);
      } catch {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
}
