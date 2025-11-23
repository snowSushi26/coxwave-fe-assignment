import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

const selectVariants = cva(
  'w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-outline focus:ring-primary',
        error: 'border-red-500 focus:ring-red-500',
      },
      selectSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      selectSize: 'md',
    },
  },
);

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options: Array<{ value: string; label: string }>;
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  variant,
  selectSize,
  className,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
      <select className={cn(selectVariants({ variant, selectSize }), className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
