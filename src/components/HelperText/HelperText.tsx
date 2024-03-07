import { ComponentProps, ParentComponent, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type { FlowbiteColors } from "../Flowbite";

export interface FlowbiteHelperTextTheme {
  root: FlowbiteHelperTextRootTheme;
}

export interface FlowbiteHelperTextRootTheme {
  base: string;
  colors: HelperColors;
}

export interface HelperColors
  extends Pick<
    FlowbiteColors,
    "gray" | "info" | "failure" | "warning" | "success"
  > {
  [key: string]: string;
}

export interface HelperTextProps extends Omit<ComponentProps<"p">, "color"> {
  color?: keyof HelperColors;
  theme?: DeepPartial<FlowbiteHelperTextTheme>;
  value?: string;
}

export const HelperText: ParentComponent<HelperTextProps> = (
  p: HelperTextProps
) => {
  const [local, props] = splitProps(p, [
    "children",
    "class",
    "color",
    "theme",
    "value",
  ]);

  const {
    children,
    class: className,
    color = "default",
    theme: customTheme = {},
    value,
  } = local;

  const theme = mergeDeep(getTheme().helperText, customTheme);

  return (
    <p
      class={twMerge(theme.root.base, theme.root.colors[color], className)}
      {...props}
    >
      {value ?? children ?? ""}
    </p>
  );
};

// HelperText.displayName = 'HelperText';
