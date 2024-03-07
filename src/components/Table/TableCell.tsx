import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { useTableBodyContext } from "./TableBodyContext";
import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";

export interface FlowbiteTableCellTheme {
  base: string;
}

export interface TableCellProps extends ComponentProps<"td"> {
  theme?: DeepPartial<FlowbiteTableCellTheme>;
}

export const TableCell: Component<TableCellProps> = (p) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, ["children", "class", "theme"]);

  const { theme: bodyTheme } = useTableBodyContext();

  const theme = mergeDeep(bodyTheme.cell, local.theme);

  return (
    <td class={twMerge(theme.base, local.class)} {...props}>
      {local.children}
    </td>
  );
};
