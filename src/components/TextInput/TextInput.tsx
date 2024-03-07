import { Component, ComponentProps, JSX, Show, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type {
  FlowbiteBoolean,
  FlowbiteColors,
  FlowbiteSizes,
} from "../Flowbite";
import { HelperText } from "../HelperText";

export interface FlowbiteTextInputTheme {
  base: string;
  addon: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    rightIcon: {
      base: string;
      svg: string;
    };
    input: {
      base: string;
      sizes: FlowbiteTextInputSizes;
      colors: FlowbiteTextInputColors;
      withIcon: FlowbiteBoolean;
      withRightIcon: FlowbiteBoolean;
      withAddon: FlowbiteBoolean;
      withShadow: FlowbiteBoolean;
    };
  };
}

export interface FlowbiteTextInputColors
  extends Pick<
    FlowbiteColors,
    "gray" | "info" | "failure" | "warning" | "success"
  > {
  [key: string]: string;
}

export interface FlowbiteTextInputSizes
  extends Pick<FlowbiteSizes, "sm" | "md" | "lg"> {
  [key: string]: string;
}

export interface TextInputProps extends Omit<ComponentProps<"input">, "color"> {
  addon?: JSX.Element;
  color?: keyof FlowbiteTextInputColors;
  helperText?: JSX.Element;
  icon?: Component<ComponentProps<"svg">>;
  rightIcon?: Component<ComponentProps<"svg">>;
  shadow?: boolean;
  sizing?: keyof FlowbiteTextInputSizes;
  theme?: DeepPartial<FlowbiteTextInputTheme>;
}

export const TextInput: Component<TextInputProps> = (p: TextInputProps) => {
  const [local, props] = splitProps(p, [
    "addon",
    "class",
    "color",
    "helperText",
    "icon",
    "rightIcon",
    "shadow",
    "sizing",
    "theme",
  ]);
  const {
    addon,
    class: className,
    color = "gray",
    helperText,
    icon: Icon,
    rightIcon: RightIcon,
    shadow,
    sizing = "md",
    theme: customTheme = {},
  } = local;
  const theme = mergeDeep(getTheme().textInput, customTheme);
  return (
    <>
      <div class={twMerge(theme.base, className)}>
        <Show when={addon}>
          <span class={theme.addon}>{addon}</span>
        </Show>
        <div class={theme.field.base}>
          <Show when={Icon} keyed>
            {(Icon) => (
              <div class={theme.field.icon.base}>
                <Icon class={theme.field.icon.svg} />
              </div>
            )}
          </Show>
          <Show when={RightIcon} keyed>
            {(RightIcon) => (
              <div data-testid="right-icon" class={theme.field.rightIcon.base}>
                <RightIcon class={theme.field.rightIcon.svg} />
              </div>
            )}
          </Show>
          <input
            class={twMerge(
              theme.field.input.base,
              theme.field.input.colors[color],
              theme.field.input.sizes[sizing],
              theme.field.input.withIcon[Icon ? "on" : "off"],
              theme.field.input.withRightIcon[RightIcon ? "on" : "off"],
              theme.field.input.withAddon[addon ? "on" : "off"],
              theme.field.input.withShadow[shadow ? "on" : "off"]
            )}
            // includes ref
            {...props}
          />
        </div>
      </div>
      <Show when={helperText}>
        <HelperText color={color}>abc</HelperText>
      </Show>
    </>
  );
};

// TextInput.displayName = 'TextInput';
