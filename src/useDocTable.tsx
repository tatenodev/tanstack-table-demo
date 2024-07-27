import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./components/IndeterminateCheckbox";
import { Person } from "./makeData";
import { useMemo } from "react";

export function useDocTable() {
  const columnHelper = createColumnHelper<Person>();
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      }),
      columnHelper.group({
        header: "Name",
        columns: [
          columnHelper.accessor("firstName", {
            cell: (info) => info.getValue(),
          }),
          columnHelper.accessor("lastName", {
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
          }),
        ],
      }),
      // {
      //   header: "Name",
      //   columns: [
      //     {
      //       accessorKey: "firstName",
      //       cell: (info) => info.getValue(),
      //     },
      //     {
      //       accessorFn: (row) => row.lastName,
      //       id: "lastName",
      //       cell: (info) => info.getValue(),
      //       header: () => <span>Last Name</span>,
      //     },
      //   ],
      // },
      columnHelper.group({
        header: "Info",
        columns: [
          columnHelper.accessor("age", {
            header: "Age",
          }),
          columnHelper.group({
            header: "More Info",
            columns: [
              columnHelper.accessor("visits", {
                header: () => <span>Visits</span>,
              }),
              columnHelper.accessor("status", {
                header: "Status",
              }),
              columnHelper.accessor("progress", {
                header: "Profile Progress",
              }),
            ],
          }),
        ],
      }),
      // {
      //   header: "Info",
      //   columns: [
      //     {
      //       accessorKey: "age",
      //       header: () => "Age",
      //     },
      //     {
      //       header: "More Info",
      //       columns: [
      //         {
      //           accessorKey: "visits",
      //           header: () => <span>Visits</span>,
      //         },
      //         {
      //           accessorKey: "status",
      //           header: "Status",
      //         },
      //         {
      //           accessorKey: "progress",
      //           header: "Profile Progress",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
    [columnHelper]
  );

  return { columns };
}
