import { ComponentProps, Component, splitProps, mergeProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { useTableContext } from "./TableContext";

export interface FlowbiteTableRowTheme {
  base: string;
  hovered: string;
  striped: string;
}

export interface TableRowProps extends ComponentProps<"tr"> {
  theme?: DeepPartial<FlowbiteTableRowTheme>;
}

export const TableRow: Component<TableRowProps> = (p) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, ["children", "class", "theme"]);

  const { theme: rootTheme, hoverable, striped } = useTableContext();

  const theme = mergeDeep(rootTheme.row, local.theme);

  return (
    <tr
      data-testid="table-row-element"
      class={twMerge(
        theme.base,
        striped && theme.striped,
        hoverable && theme.hovered,
        local.class
      )}
      {...props}
    >
      {local.children}
    </tr>
  );
};
