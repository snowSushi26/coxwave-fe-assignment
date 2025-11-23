import type { Project, Event } from '@/shared/types';
import { callService } from './apiClient';
import type {
  ListProjectsResponse,
  GetProjectResponse,
  ListEventsResponse,
} from '@buf/alignai_frontend-challenge-datetz.bufbuild_es/event/v1/event_pb';

export async function fetchProjects(): Promise<Project[]> {
  try {
    const data = await callService<Record<string, never>, ListProjectsResponse>(
      'EventService',
      'ListProjects',
      {},
    );

    if (!data.projects || data.projects.length === 0) {
      throw new Error('No projects available');
    }

    return data.projects.map((p) => ({
      id: p.id,
      displayName: p.displayName,
      timeZone: p.timeZone?.id || 'UTC',
    }));
  } catch (error) {
    throw error;
  }
}

export async function fetchProject(projectId: string): Promise<Project> {
  try {
    const data = await callService<{ id: string }, GetProjectResponse>(
      'EventService',
      'GetProject',
      { id: projectId },
    );

    if (!data.project) {
      throw new Error('Project not found');
    }

    const p = data.project;
    return {
      id: p.id,
      displayName: p.displayName,
      timeZone: p.timeZone?.id || 'UTC',
    };
  } catch (error) {
    throw error;
  }
}

export async function fetchEvents(
  projectId: string,
  filter: string,
  pageSize: number = 15,
): Promise<Event[]> {
  try {
    const data = await callService<
      { project_id: string; filter: string; page_size: number },
      ListEventsResponse
    >('EventService', 'ListEvents', {
      project_id: projectId,
      filter,
      page_size: pageSize,
    });

    if (!data.events || data.events.length === 0) {
      return [];
    }

    return data.events.map((e) => {
      // JSON 응답에서 createTime은 ISO string으로 온다
      let createTimeStr = '';
      if (typeof e.createTime === 'string') {
        createTimeStr = e.createTime;
      } else if (e.createTime && typeof e.createTime === 'object' && 'toJSON' in e.createTime) {
        createTimeStr = (e.createTime as { toJSON: () => string }).toJSON();
      }

      return {
        id: e.id,
        type: e.type,
        createTime: createTimeStr,
      };
    });
  } catch (error) {
    throw error;
  }
}
