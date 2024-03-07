import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type { FlowbiteColors } from "../Flowbite";
import {
  ComponentProps,
  Component,
  Show,
  mergeProps,
  splitProps,
} from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { HiX } from "../Icons";

export interface FlowbiteAlertTheme {
  base: string;
  borderAccent: string;
  closeButton: FlowbiteAlertCloseButtonTheme;
  color: FlowbiteColors;
  icon: string;
  rounded: string;
  wrapper: string;
}

export interface FlowbiteAlertCloseButtonTheme {
  base: string;
  color: FlowbiteColors;
  icon: string;
}

export interface AlertProps extends Omit<ComponentProps<"div">, "color"> {
  additionalContent?: JSX.Element;
  color?: keyof FlowbiteColors;
  icon?: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
  theme?: DeepPartial<FlowbiteAlertTheme>;
  withBorderAccent?: boolean;
}

export const Alert: Component<AlertProps> = (p: AlertProps) => {
  const merged = mergeProps(
    {
      color: "info",
      rounded: true,
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, [
    "additionalContent",
    "children",
    "class",
    "color",
    "icon",
    "onDismiss",
    "rounded",
    "theme",
    "withBorderAccent",
  ]);
  const theme = mergeDeep(getTheme().alert, local.theme);
  const { icon: Icon } = local;

  return (
    <div
      class={twMerge(
        theme.base,
        theme.color[local.color],
        local.rounded && theme.rounded,
        local.withBorderAccent && theme.borderAccent,
        local.class
      )}
      role="alert"
      {...props}
    >
      <div class={theme.wrapper} data-testid="flowbite-alert-wrapper">
        <Show when={Icon} keyed={true}>
          {(Icon) => (
            <Icon class={theme.icon} data-testid="flowbite-alert-icon" />
          )}
        </Show>
        <div>{local.children}</div>
        {typeof local.onDismiss === "function" && (
          <button
            aria-label="Dismiss"
            class={twMerge(
              theme.closeButton.base,
              theme.closeButton.color[local.color]
            )}
            onClick={local.onDismiss}
            type="button"
          >
            <HiX class={theme.closeButton.icon} />
          </button>
        )}
      </div>
      <Show when={local.additionalContent}>
        <div>{local.additionalContent}</div>
      </Show>
    </div>
  );
};

// Alert.displayName = 'Alert';
