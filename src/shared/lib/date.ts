import { startOfDay, startOfWeek, subDays } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import type { PeriodType, DateRange } from '@/shared/types';

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
        return {
          startDate: startOfDay(now),
          endDate: now,
        };
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

/**
 * DateRange를 ConnectRPC 필터 문자열로 변환
 * 형식: create_time >= "2012-03-04T05:06:07Z" AND create_time < "2012-03-05T05:06:07Z"
 */
export function createEventFilter(dateRange: DateRange): string {
  const startUTC = formatInTimeZone(dateRange.startDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const endUTC = formatInTimeZone(dateRange.endDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");

  return `create_time >= "${startUTC}" AND create_time < "${endUTC}"`;
}
