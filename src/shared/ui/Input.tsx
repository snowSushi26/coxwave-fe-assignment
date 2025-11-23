import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';

const inputVariants = cva(
  'w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-outline focus:ring-primary',
        error: 'border-red-500 focus:ring-red-500',
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  },
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  variant,
  inputSize,
  className,
  label,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
      <input className={cn(inputVariants({ variant, inputSize }), className)} {...props} />
    </div>
  );
};

