import React from 'react';

interface DashboardHeaderProps {
  error?: string | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ error }) => {
  return (
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>Event Dashboard</h1>
      {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}
    </div>
  );
};
