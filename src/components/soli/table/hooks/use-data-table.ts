import { useSearchQueryParams } from '@/lib/soli/hooks/ui/use-search-query-params';
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type TableState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_TABLE_SEARCH_PARAMS_SCHEMA } from '../consts/default-table-search-params-schema';
import { SortDirection } from '../models/sort-direction.enum';

interface UseDataTableProps<TData, TValue> {
  /**
   * The data for the table.
   * @default []
   * @type TData[]
   */
  data: TData[];

  /**
   * The columns of the table.
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * The number of pages in the table.
   * @type number
   */
  pageCount: number;

  /**
   * The initial state of the table.
   * Can be used to set the initial pagination, sorting, column visibility, row selection, column grouping, column pinning, and column filters.
   * @default {}
   */
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: {
      id: Extract<keyof TData, string>;
      desc: boolean;
    }[];
  };
}

export function useDataTable<TData, TValue>({
  data: defaultData,
  columns,
  pageCount = -1,
  initialState,
}: UseDataTableProps<TData, TValue>) {
  const [data, setData] = useState(() => [...defaultData]);
  const searchParams = useSearchParams();
  const { set: setSearchQueryParams } = useSearchQueryParams(searchParams, {
    deleteFalseValues: true,
  });

  // Search params
  const validatedParams = DEFAULT_TABLE_SEARCH_PARAMS_SCHEMA.safeParse(
    Object.fromEntries(searchParams)
  );

  if (!validatedParams.success) {
    throw new Error(
      validatedParams.error.errors.map((error) => error.message).toString()
    );
  }

  const { page, per_page, direction, sortBy } = validatedParams.data;
  // const [column, order] = sort?.split('.') ?? [];

  // Table states
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>(
    initialState?.pagination ?? {
      pageIndex: page - 1,
      pageSize: per_page ?? 10,
    }
  );

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  // Handle server-side sorting
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.sorting ?? [
      {
        id: sortBy ?? '',
        desc: direction === SortDirection.DESC,
      },
    ]
  );

  useEffect(() => {
    setSearchQueryParams({
      page: pageIndex + 1,
      per_page: pageSize,
      sortBy: sorting[0]?.id,
      direction: sorting[0]?.id
        ? sorting[0]?.desc
          ? SortDirection.DESC
          : SortDirection.ASC
        : null,
      // sort: sorting[0]?.id
      //   ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}`
      //   : null,
    });

    // }, [pageIndex, pageSize, sorting]);
    // }, [pageIndex, pageSize, sorting[0].id, sorting[0].desc]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sorting]);

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      ...initialState,
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    meta: {
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: TData[]) =>
          old.filter((_row: TData, index: number) => index !== rowIndex);
        setData(setFilterFunc);
      },
    },
  });

  return { table };
}
