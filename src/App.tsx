import "./index.css";

import { makeData, Person } from "./makeData";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./components/IndeterminateCheckbox";
import { useMemo, useState } from "react";

export default function App() {
  const columnHelper = createColumnHelper<Person>();
  // const columns = useMemo<ColumnDef<Person>[]>(
  const columns = useMemo(
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
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
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

  const [data] = useState(() => makeData(20));

  const table = useReactTable({
    data,
    columns,
    // enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
