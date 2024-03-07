import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type {
  FlowbiteBoolean,
  FlowbiteColors,
  FlowbiteGradientColors,
  FlowbiteGradientDuoToneColors,
  FlowbiteSizes,
} from "../Flowbite";
import { Spinner } from "../Spinner";
import { ButtonBase, type ButtonBaseProps } from "./ButtonBase";
import type { PositionInButtonGroup } from "./ButtonGroup";
import { ButtonGroup } from "./ButtonGroup";
import { ComponentProps, JSX, Show, splitProps } from "solid-js";
import { ElementType } from "../../helpers/types";

export interface FlowbiteButtonTheme {
  base: string;
  fullSized: string;
  color: FlowbiteColors;
  disabled: string;
  isProcessing: string;
  spinnerSlot: string;
  spinnerLeftPosition: ButtonSizes;
  gradient: ButtonGradientColors;
  gradientDuoTone: ButtonGradientDuoToneColors;
  inner: FlowbiteButtonInnerTheme;
  label: string;
  outline: FlowbiteButtonOutlineTheme;
  pill: FlowbiteBoolean;
  size: ButtonSizes;
}

export interface FlowbiteButtonInnerTheme {
  base: string;
  position: PositionInButtonGroup;
  outline: string;
  isProcessingPadding: ButtonSizes;
}

export interface FlowbiteButtonOutlineTheme extends FlowbiteBoolean {
  color: ButtonOutlineColors;
  pill: FlowbiteBoolean;
}

export interface ButtonColors
  extends Pick<
    FlowbiteColors,
    | "dark"
    | "failure"
    | "gray"
    | "info"
    | "light"
    | "purple"
    | "success"
    | "warning"
  > {
  [key: string]: string;
}

export interface ButtonGradientColors extends FlowbiteGradientColors {
  [key: string]: string;
}

export interface ButtonGradientDuoToneColors
  extends FlowbiteGradientDuoToneColors {
  [key: string]: string;
}

export interface ButtonOutlineColors extends Pick<FlowbiteColors, "gray"> {
  [key: string]: string;
}

export interface ButtonSizes
  extends Pick<FlowbiteSizes, "xs" | "sm" | "lg" | "xl"> {
  [key: string]: string;
}

export type ButtonProps<T extends ElementType = "button"> =
  ComponentProps<"button"> & {
    as?: T | null;
    href?: string;
    color?: keyof FlowbiteColors;
    fullSized?: boolean;
    gradientDuoTone?: keyof ButtonGradientDuoToneColors;
    gradientMonochrome?: keyof ButtonGradientColors;
    target?: string;
    isProcessing?: boolean;
    processingLabel?: string;
    processingSpinner?: JSX.Element;
    label?: JSX.Element;
    outline?: boolean;
    pill?: boolean;
    positionInGroup?: keyof PositionInButtonGroup;
    size?: keyof ButtonSizes;
    theme?: DeepPartial<FlowbiteButtonTheme>;
  };

const ButtonComponentFn = <T extends ElementType = "button">(
  p: ButtonProps<T>
) => {
  const [local, props] = splitProps(p, [
    "children",
    "class",
    "outline",
    "pill",
    "theme",
    "color",
    "disabled",
    "fullSized",
    "isProcessing",
    "processingLabel",
    "processingSpinner",
    "gradientDuoTone",
    "gradientMonochrome",
    "label",
    "positionInGroup",
    "size",
    "ref",
  ]);
  const {
    class: className,
    color = "info",
    disabled,
    fullSized,
    isProcessing = false,
    gradientDuoTone,
    gradientMonochrome,
    outline = false,
    pill = false,
    positionInGroup = "none",
    size = "md",
    theme: customTheme = {},
    ref,
  } = local;
  const { buttonGroup: groupTheme, button: buttonTheme } = getTheme();
  const theme = mergeDeep(buttonTheme, customTheme);

  const theirProps = props as ButtonBaseProps<T>;
  return (
    <ButtonBase
      ref={ref}
      disabled={disabled}
      class={twMerge(
        theme.base,
        disabled && theme.disabled,
        !gradientDuoTone && !gradientMonochrome && theme.color[color],
        gradientDuoTone &&
          !gradientMonochrome &&
          theme.gradientDuoTone[gradientDuoTone],
        !gradientDuoTone &&
          gradientMonochrome &&
          theme.gradient[gradientMonochrome],
        outline && (theme.outline.color[color] ?? theme.outline.color.default),
        theme.pill[pill ? "on" : "off"],
        fullSized && theme.fullSized,
        groupTheme.position[positionInGroup],
        className
      )}
      {...theirProps}
    >
      <span
        class={twMerge(
          theme.inner.base,
          theme.outline[outline ? "on" : "off"],
          theme.outline.pill[outline && pill ? "on" : "off"],
          theme.size[size],
          outline && !theme.outline.color[color] && theme.inner.outline,
          isProcessing && theme.isProcessing,
          isProcessing && theme.inner.isProcessingPadding[size],
          theme.inner.position[positionInGroup]
        )}
      >
        <Show when={local.isProcessing}>
          <span
            class={twMerge(theme.spinnerSlot, theme.spinnerLeftPosition[size])}
          >
            {local.processingSpinner || <Spinner size={size} />}
          </span>
        </Show>
        <Show
          when={typeof local.children !== "undefined"}
          fallback={
            <span
              data-testid="flowbite-button-label"
              class={twMerge(theme.label)}
            >
              <Show when={local.isProcessing} fallback={local.label}>
                {local.processingLabel ?? "Loading..."}
              </Show>
            </span>
          }
        >
          {local.children}
        </Show>
      </span>
    </ButtonBase>
  );
};

ButtonComponentFn.displayName = "Button";

// const ButtonComponent = genericForwardRef(ButtonComponentFn);
const ButtonComponent = ButtonComponentFn;

export const Button = Object.assign(ButtonComponent, {
  Group: ButtonGroup,
});
