import { twMerge } from "tailwind-merge";
import type { DeepPartial } from "../../types";
import { useDropdownContext } from "./DropdownContext";
import { ComponentProps, Component, mergeProps, splitProps } from "solid-js";

export interface FlowbiteDropdownDividerTheme {
  divider: string;
}

export type DropdownDividerProps = {
  theme?: DeepPartial<FlowbiteDropdownDividerTheme>;
} & ComponentProps<"div">;

export const DropdownDivider: Component<DropdownDividerProps> = (
  p: DropdownDividerProps
) => {
  const merged = mergeProps(
    {
      theme: {} as DeepPartial<FlowbiteDropdownDividerTheme>,
    },
    p
  );
  const [local, props] = splitProps(merged, ["class", "theme"]);

  const { theme: rootTheme } = useDropdownContext();

  const theme = local.theme.divider ?? rootTheme.floating.divider;

  return <div class={twMerge(theme, local.class)} {...props} />;
};
