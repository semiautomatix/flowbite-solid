import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import { TableBody, type FlowbiteTableBodyTheme } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableContext } from "./TableContext";
import { TableHead, type FlowbiteTableHeadTheme } from "./TableHead";
import { TableHeadCell } from "./TableHeadCell";
import { TableRow, type FlowbiteTableRowTheme } from "./TableRow";
import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";

export interface FlowbiteTableTheme {
  root: FlowbiteTableRootTheme;
  head: FlowbiteTableHeadTheme;
  row: FlowbiteTableRowTheme;
  body: FlowbiteTableBodyTheme;
}

export interface FlowbiteTableRootTheme {
  base: string;
  shadow: string;
  wrapper: string;
}

export interface TableProps extends ComponentProps<"table"> {
  striped?: boolean;
  hoverable?: boolean;
  theme?: DeepPartial<FlowbiteTableTheme>;
}

const TableComponent: Component<TableProps> = (p) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, [
    "children",
    "class",
    "striped",
    "hoverable",
    "theme",
  ]);

  const theme = mergeDeep(getTheme().table, local.theme);

  return (
    <div data-testid="table-element" class={twMerge(theme.root.wrapper)}>
      <TableContext.Provider
        value={{ theme, striped: local.striped, hoverable: local.hoverable }}
      >
        <div class={twMerge(theme.root.shadow, local.class)}></div>
        <table class={twMerge(theme.root.base, local.class)} {...props}>
          {local.children}
        </table>
      </TableContext.Provider>
    </div>
  );
};

// TableComponent.displayName = "Table";
// TableHead.displayName = "Table.Head";
// TableBody.displayName = "Table.Body";
// TableRow.displayName = "Table.Row";
// TableCell.displayName = "Table.Cell";
// TableHeadCell.displayName = "Table.HeadCell";

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
});
