import { useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useTable } from "../useSimpleTable";
import { defaultData } from "../data/tableDefaultData";

export function SimpleTable() {
  /**
   * TableにわたすデータはuseState,useMemoで管理されたデータを渡す必要がある
   * @see {@link https://tanstack.com/table/v8/docs/guide/data#give-data-a-stable-reference}
   */
  const [data] = useState(defaultData);
  const { columns } = useTable();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  const foo = () => {
    console.log(table.getRow("1").getAllCells()[0].row);
  };

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>
                <input type="checkbox" />
              </th>
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
              <td>
                <input type="checkbox" />
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={foo}>foo</button>
    </div>
  );
}
