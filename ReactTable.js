import React from 'react';
import { flexRender } from '@tanstack/react-table';
const ReactTableTbody = ({ table }) => (React.createElement("tbody", null, table.getRowModel().rows.map((row) => (React.createElement("tr", { key: row.id }, row.getVisibleCells().map((cell) => (React.createElement("td", { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext())))))))));
const ReactTable = ({ table, headers }) => {
    return (React.createElement("table", null,
        React.createElement("thead", null,
            React.createElement("tr", null, headers.map(header => React.createElement("th", null, header)))),
        React.createElement(ReactTableTbody, { table: table })));
};
export { ReactTable };
