import { useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

import { useTable } from "../useSimpleTable";
import { defaultData } from "../data/tableDefaultData";

const schema = z.object({
  meta: z.string(),
  ids: z.record(z.number(), z.string()),
});

type Schema = z.infer<typeof schema>;

export function SimpleTable() {
  const {
    control,
    watch,
    getValues: formGetValues,
    setValue: formSetValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      meta: "test",
      ids: {},
    },
  });

  const allIds = defaultData.map((data) => data.id);

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

  const ids = watch("ids");

  const show = () => {
    console.log("form values:", formGetValues());
  };

  const handleDeselect = () => {
    formSetValue("ids", {});
  };

  return (
    <div>
      <div>number of choices: {Object.keys(ids).length}</div>
      <button onClick={handleDeselect}>deselect</button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>
                <Controller
                  name="ids"
                  control={control}
                  render={(data) => (
                    <>
                      <input
                        type="checkbox"
                        // checked={allIds.length === Object.keys(formGetValues("ids")).length}
                        checked={allIds.length === Object.keys(data.field.value).length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formSetValue("ids", { ...allIds });
                          } else {
                            formSetValue("ids", {});
                          }
                        }}
                      ></input>
                    </>
                  )}
                />
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
                <Controller
                  // TODO: check!!
                  name={"ids"} // ok
                  // name={`ids.${row.index}`} -> ng
                  control={control}
                  render={(data) => (
                    <>
                      <input
                        type="checkbox"
                        // checked={!!formGetValues("ids")[row.index]}
                        checked={!!data.field.value[row.index]}
                        onChange={(e) => {
                          // const values = formGetValues("ids");
                          const userId = row.getValue<string>("id");
                          if (e.target.checked) {
                            formSetValue("ids", { ...data.field.value, [row.index]: userId });
                          } else {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            const { [row.index]: _, ...rest } = data.field.value;
                            formSetValue("ids", rest);
                          }
                        }}
                      ></input>
                    </>
                  )}
                />
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={show}>Show on console</button>
    </div>
  );
}
