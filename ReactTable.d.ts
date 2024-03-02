// Generated by dts-bundle-generator v9.3.1

import { Table } from '@tanstack/react-table';
import React$1 from 'react';

declare module "@tanstack/table-core" {
	interface TableMeta<TData extends RowData> {
		stickyFilters?: boolean;
	}
}
export type ReactTableType<T> = {
	table: Table<T>;
	headers: string[];
};
export declare const ReactTable: <T>({ table, headers }: ReactTableType<T>) => React$1.JSX.Element;

export {};
