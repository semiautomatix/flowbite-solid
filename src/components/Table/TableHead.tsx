import { ComponentProps, Component, splitProps, mergeProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { useTableContext } from "./TableContext";
import type { FlowbiteTableHeadCellTheme } from "./TableHeadCell";
import { TableHeadContext } from "./TableHeadContext";

export interface FlowbiteTableHeadTheme {
  base: string;
  cell: FlowbiteTableHeadCellTheme;
}

export interface TableHeadProps extends ComponentProps<"thead"> {
  theme?: DeepPartial<FlowbiteTableHeadTheme>;
}

export const TableHead: Component<TableHeadProps> = (p) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, ["children", "class", "theme"]);
  try {
    const { theme: rootTheme } = useTableContext();

    const theme = mergeDeep(rootTheme.head, local.theme);

    return (
      <TableHeadContext.Provider value={{ theme }}>
        <thead class={twMerge(theme.base, local.class)} {...props}>
          <tr>{local.children}</tr>
        </thead>
      </TableHeadContext.Provider>
    );
  } catch (e) {
    console.log(e);
  }
};
