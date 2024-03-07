import { ComponentProps, Component, splitProps, mergeProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { useTableHeadContext } from "./TableHeadContext";

export interface FlowbiteTableHeadCellTheme {
  base: string;
}

export interface TableHeadCellProps extends ComponentProps<"th"> {
  theme?: DeepPartial<FlowbiteTableHeadCellTheme>;
}

export const TableHeadCell: Component<TableHeadCellProps> = (p) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, ["children", "class", "theme"]);

  const { theme: headTheme } = useTableHeadContext();

  const theme = mergeDeep(headTheme.cell, local.theme);

  return (
    <th class={twMerge(theme.base, local.class)} {...props}>
      {local.children}
    </th>
  );
};
