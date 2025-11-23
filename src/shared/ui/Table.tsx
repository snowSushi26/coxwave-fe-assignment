import React from 'react';
import { cn } from '@/shared/lib';

export interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  getRowKey: (item: T) => string | number;
}

export function Table<T>({
  columns,
  data,
  emptyMessage = 'No data available',
  className,
  getRowKey,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-100 border-b border-gray-200'>
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  'px-6 py-3 text-left text-sm font-semibold text-gray-700',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='px-6 py-8 text-center text-gray-600'>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={getRowKey(item)}
                className='border-b border-gray-200 hover:bg-gray-50 transition-colors'
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn('px-6 py-4 text-sm text-gray-900', column.className)}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
