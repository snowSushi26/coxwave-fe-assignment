import type { Project } from '@/shared/types';

export function getProjectById(projects: Project[], id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectTimezone(project: Project): string {
  return project.timeZone;
}
