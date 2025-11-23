import type { Event, DateRange } from '@/shared/types';

export function filterEventsByDateRange(events: Event[], dateRange: DateRange): Event[] {
  const startTime = dateRange.startDate.getTime();
  const endTime = dateRange.endDate.getTime();

  return events.filter((event) => {
    const eventTime = new Date(event.createTime).getTime();
    return eventTime >= startTime && eventTime <= endTime;
  });
}

export function paginateEvents(events: Event[], page: number, itemsPerPage: number): Event[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return events.slice(startIndex, endIndex);
}

