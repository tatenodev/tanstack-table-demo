import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

// import { IndeterminateCheckbox } from "./components/IndeterminateCheckbox";

export type PersonRow = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export function useTable() {
  const columnHelper = createColumnHelper<PersonRow>();

  const columns = useMemo(
    () => [
      // columnHelper.display({
      //   id: "select",
      //   header: ({ table }) => (
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler(),
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <IndeterminateCheckbox
      //       {...{
      //         checked: row.getIsSelected(),
      //         disabled: !row.getCanSelect(),
      //         indeterminate: row.getIsSomeSelected(),
      //         onChange: row.getToggleSelectedHandler(),
      //       }}
      //     />
      //   ),
      // }),
      // columnHelper.accessor("id", {
      //   header: () => <></>,
      //   cell: () => <></>,
      // }),
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lastName", {
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Last Nam222e</span>,
      }),
      columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.renderValue(),
      }),
    ],
    [columnHelper]
  );

  return {
    columns,
  };
}
