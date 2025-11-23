'use client';

import React, { useMemo } from 'react';
import { Table, type Column } from '@/shared/ui';
import type { Event } from '@/shared/types';
import { formatDateInTimezone } from '@/shared/lib';

interface EventListProps {
  events: Event[];
  timezone: string;
}

export const EventList: React.FC<EventListProps> = ({ events, timezone }) => {
  const columns: Column<Event>[] = useMemo(
    () => [
      {
        header: 'ID',
        key: 'id',
      },
      {
        header: 'Type',
        key: 'type',
        render: (event) => event.type || '-',
      },
      {
        header: 'CreateTime',
        key: 'createTime',
        render: (event) => formatDateInTimezone(event.createTime, timezone),
      },
    ],
    [timezone],
  );

  return (
    <Table
      columns={columns}
      data={events}
      getRowKey={(event) => event.id}
      emptyMessage='No events found for the selected period'
    />
  );
};
