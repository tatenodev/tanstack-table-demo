import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PersonRow, useTable } from "../useSimpleTable";

export function SimpleTable() {
  const { columns } = useTable();

  const tableData: PersonRow[] = [
    {
      id: "AAA",
      firstName: "tanner",
      lastName: "linsley",
      age: 24,
    },
    {
      id: "BBB",
      firstName: "tandy",
      lastName: "miller",
      age: 40,
    },
    {
      id: "CCC",
      firstName: "joe",
      lastName: "dirte",
      age: 45,
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // enableRowSelection: true,
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    debugTable: true,
  });

  return (
    <div>
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
