import React from 'react';

import { Table, RowData, flexRender } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    stickyFilters?: boolean;
  }
}

type ReactTableTbodyProps<T> = {
  table: Table<T>;
};

const ReactTableTbody = <T,>({ table }: ReactTableTbodyProps<T>) => (
  <tbody>
    {table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

type ReactTableType<T> = {
  table: Table<T>;
  headers: string[];
};

const ReactTable = <T,>({ table, headers }: ReactTableType<T>) => (
  <table>
    <thead>
      <tr>
        {headers.map(header => <th>{header}</th>)}
      </tr>
    </thead>
    {<ReactTableTbody table={table} />}
  </table>
);


export { ReactTable };
