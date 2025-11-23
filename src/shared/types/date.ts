export type PeriodType = 'today' | 'yesterday' | 'this-week' | 'last-30-days' | 'custom';

export interface PeriodOption {
  value: PeriodType;
  label: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
