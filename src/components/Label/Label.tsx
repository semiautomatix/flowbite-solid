import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type { FlowbiteStateColors } from "../Flowbite";
import { ComponentProps, ParentComponent, splitProps } from "solid-js";

export interface FlowbiteLabelTheme {
  root: FlowbiteLabelRootTheme;
}

export interface FlowbiteLabelRootTheme {
  base: string;
  colors: LabelColors;
  disabled: string;
}

export interface LabelColors extends FlowbiteStateColors {
  [key: string]: string;
  default: string;
}

export interface LabelProps extends Omit<ComponentProps<"label">, "color"> {
  color?: keyof LabelColors;
  disabled?: boolean;
  theme?: DeepPartial<FlowbiteLabelTheme>;
  value?: string;
}

export const Label: ParentComponent<LabelProps> = (p: LabelProps) => {
  const [local, props] = splitProps(p, [
    "children",
    "class",
    "color",
    "disabled",
    "theme",
    "value",
  ]);

  const {
    children,
    class: className,
    color = "default",
    disabled = false,
    theme: customTheme = {},
    value,
  } = local;

  const theme = mergeDeep(getTheme().label, customTheme);

  return (
    <label
      class={twMerge(
        theme.root.base,
        theme.root.colors[color],
        disabled && theme.root.disabled,
        className
      )}
      data-testid="flowbite-label"
      {...props}
    >
      {value ?? children ?? ""}
    </label>
  );
};

// Label.displayName = 'Label';

// import {JSX, mergeProps, splitProps} from "solid-js";
// import classNames from "./classnames";
// import {useBootstrapPrefix} from "./ThemeProvider";
// import {BsPrefixProps, BsPrefixRefForwardingComponent} from "./helpers";
// import {Dynamic} from "solid-js/web";

// export interface FormTextProps extends BsPrefixProps, JSX.HTMLAttributes<HTMLElement> {
//   muted?: boolean;
// }

// const defaultProps = {
//   as: "small",
// };

// const FormText: BsPrefixRefForwardingComponent<"small", FormTextProps> = (p: FormTextProps) => {
//   const [local, props] = splitProps(mergeProps(defaultProps, p), [
//     "as",
//     "bsPrefix",
//     "class",
//     "muted",
//   ]);
//   const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-text");

//   return (
//     <Dynamic
//       component={local.as}
//       {...props}
//       class={classNames(local.class, bsPrefix, local.muted && "text-muted")}
//     />
//   );
// };

// export default FormText;
