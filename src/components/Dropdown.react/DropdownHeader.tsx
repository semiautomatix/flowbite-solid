import { twMerge } from "tailwind-merge";
import type { DeepPartial } from "../../types";
import { useDropdownContext } from "./DropdownContext";
import { DropdownDivider } from "./DropdownDivider";
import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";

export interface FlowbiteDropdownHeaderTheme {
  header: string;
}

export interface DropdownHeaderProps extends ComponentProps<"div"> {
  theme?: DeepPartial<FlowbiteDropdownHeaderTheme>;
}

export const DropdownHeader: Component<DropdownHeaderProps> = (
  p: DropdownHeaderProps
) => {
  const merged = mergeProps(
    {
      theme: {} as DeepPartial<FlowbiteDropdownHeaderTheme>,
    },
    p
  );
  const [local, props] = splitProps(merged, ["class", "theme", "children"]);

  const { theme: rootTheme } = useDropdownContext();

  const theme = local.theme.header ?? rootTheme.floating.header;

  return (
    <>
      <div class={twMerge(theme, local.class)} {...props}>
        {local.children}
      </div>
      <DropdownDivider />
    </>
  );
};
