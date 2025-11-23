import React from 'react';

interface DashboardHeaderProps {
  eventsCount: number;
  isLoading: boolean;
  error?: string | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  eventsCount,
  isLoading,
  error,
}) => {
  return (
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>Event Dashboard</h1>
      <p className='text-gray-600'>{isLoading ? 'Loading...' : `총 ${eventsCount}개의 이벤트`}</p>
      {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}
    </div>
  );
};
