import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { TableBodyContext } from "./TableBodyContext";
import type { FlowbiteTableCellTheme } from "./TableCell";
import { useTableContext } from "./TableContext";
import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";

export interface FlowbiteTableBodyTheme {
  base: string;
  cell: FlowbiteTableCellTheme;
}

export interface TableBodyProps extends ComponentProps<"tbody"> {
  theme?: DeepPartial<FlowbiteTableBodyTheme>;
}

export const TableBody: Component<TableBodyProps> = (p) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, ["children", "class", "theme"]);

  const { theme: rootTheme } = useTableContext();

  const theme = mergeDeep(rootTheme.body, local.theme);

  return (
    <TableBodyContext.Provider value={{ theme }}>
      <tbody class={twMerge(theme.base, local.class)} {...props}>
        {local.children}
      </tbody>
    </TableBodyContext.Provider>
  );
};
