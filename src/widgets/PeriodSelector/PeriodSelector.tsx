'use client';

import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { DatePicker, Button } from '@/shared/ui';
import type { PeriodType, PeriodOption } from '@/shared/types';

interface PeriodSelectorProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onCustomDateChange?: (startDate: Date, endDate: Date) => void;
}

const periodOptions: PeriodOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'this-week', label: 'This Week' },
  { value: 'last-30-days', label: 'Last 30 Days' },
  { value: 'custom', label: 'Custom' },
];

const periodButtonVariants = cva(
  'px-4 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer',
  {
    variants: {
      selected: {
        true: 'bg-primary text-primary-foreground',
        false: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  onCustomDateChange,
}) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handlePeriodClick = (period: PeriodType) => {
    onPeriodChange(period);
    setShowCustomPicker(period === 'custom');
  };

  const handleCustomDateApply = () => {
    if (startDate && endDate && onCustomDateChange) {
      onCustomDateChange(startDate, endDate);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 flex-wrap'>
        {periodOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handlePeriodClick(option.value)}
            className={periodButtonVariants({ selected: selectedPeriod === option.value })}
          >
            {option.label}
          </button>
        ))}
      </div>

      {showCustomPicker && (
        <div className='flex gap-2 items-end p-4 bg-gray-50 rounded-md relative'>
          <DatePicker
            label='Start Date'
            selected={startDate}
            onChange={setStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate || undefined}
            placeholderText='Select start date'
          />
          <DatePicker
            label='End Date'
            selected={endDate}
            onChange={setEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || undefined}
            placeholderText='Select end date'
          />
          <Button onClick={handleCustomDateApply} disabled={!startDate || !endDate}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
