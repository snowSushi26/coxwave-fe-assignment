import React from 'react';
import ReactDatePicker, { type DatePickerProps as ReactDatePickerProps } from 'react-datepicker';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

const datePickerVariants = cva(
  'w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-outline focus:ring-primary',
        error: 'border-red-500 focus:ring-red-500',
      },
      datePickerSize: {
        sm: 'h-8 text-xs',
        md: 'h-9 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      datePickerSize: 'md',
    },
  },
);

type DatePickerProps = ReactDatePickerProps &
  VariantProps<typeof datePickerVariants> & {
    label?: string;
  };

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  variant,
  datePickerSize,
  className,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-1.5 relative'>
      {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
      <ReactDatePicker
        className={cn(datePickerVariants({ variant, datePickerSize }), className)}
        dateFormat='yyyy-MM-dd'
        {...props}
      />
    </div>
  );
};
