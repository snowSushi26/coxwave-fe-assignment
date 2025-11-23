import { useState, useEffect } from 'react';
import { fetchEvents } from '@/shared/api';
import { createEventFilter } from '@/shared/lib/date';
import type { Event, DateRange } from '@/shared/types';

interface UseEventsParams {
  projectId: string;
  dateRange: DateRange;
  pageSize?: number;
}

export function useEvents({ projectId, dateRange, pageSize = 1000 }: UseEventsParams) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const filter = createEventFilter(dateRange);
        const eventsData = await fetchEvents(projectId, filter, pageSize);
        setEvents(eventsData);
      } catch (err) {
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [projectId, dateRange, pageSize]);

  return { events, loading, error };
}
