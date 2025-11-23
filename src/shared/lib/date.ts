import { format, startOfDay, startOfWeek, subDays } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import type { PeriodType, DateRange } from '../types';

export function getPeriodDateRange(
  periodType: PeriodType,
  timezone: string,
  customRange?: DateRange,
): DateRange {
  const now = toZonedTime(new Date(), timezone);

  switch (periodType) {
    case 'today':
      return {
        startDate: startOfDay(now),
        endDate: now,
      };

    case 'yesterday':
      const yesterday = subDays(now, 1);
      return {
        startDate: startOfDay(yesterday),
        endDate: startOfDay(now),
      };

    case 'this-week':
      return {
        startDate: startOfWeek(now, { weekStartsOn: 1 }),
        endDate: now,
      };

    case 'last-30-days':
      return {
        startDate: startOfDay(subDays(now, 29)),
        endDate: now,
      };

    case 'custom':
      if (!customRange) {
        throw new Error('Custom range required for custom period type');
      }
      return {
        startDate: startOfDay(customRange.startDate),
        endDate: startOfDay(subDays(customRange.endDate, -1)),
      };

    default:
      return {
        startDate: startOfDay(now),
        endDate: now,
      };
  }
}

export function formatDateInTimezone(
  date: Date | string,
  timezone: string,
  formatString: string = 'MMM d, yyyy, h:mm a',
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatInTimeZone(dateObj, timezone, formatString);
}
