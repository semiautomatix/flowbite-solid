import type { Placement } from "@floating-ui/core";
// import { autoUpdate, useFocus } from "@floating-ui/react";
// import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
// import {
//   useBaseFLoating,
//   useFloatingInteractions,
// } from "../../hooks/use-floating";
import { getArrowPlacement } from "./helpers";
import {
  ComponentProps,
  Component,
  mergeProps,
  splitProps,
  Show,
  createSignal,
} from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

export interface FlowbiteFloatingTheme {
  arrow: FlowbiteFloatingArrowTheme;
  animation: string;
  base: string;
  content: string;
  hidden: string;
  style: {
    auto: string;
    dark: string;
    light: string;
  };
  target: string;
}

export interface FlowbiteFloatingArrowTheme {
  base: string;
  placement: string;
  style: {
    dark: string;
    light: string;
    auto: string;
  };
}

export type FloatingStyle = "dark" | "light" | "auto";

export interface FloatingProps
  extends Omit<ComponentProps<"div">, "content" | "style"> {
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  content: JSX.Element;
  placement?: "auto" | Placement;
  style?: FloatingStyle;
  theme: FlowbiteFloatingTheme;
  trigger?: "hover" | "click";
  minWidth?: number;
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Floating: Component<FloatingProps> = (p: FloatingProps) => {
  const merged = mergeProps(
    {
      animation: "duration-300",
      arrow: true,
      placement: "top",
      style: "dark",
      trigger: "hover",
    },
    p
  );

  const [local, props] = splitProps(merged, [
    "animation",
    "arrow",
    "children",
    "class",
    "content",
    "placement",
    "style",
    "theme",
    "trigger",
    "minWidth",
  ]);

  const arrowRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = createSignal(false);

  const floatingProperties = useBaseFLoating({
    open,
    placement: local.placement,
    arrowRef,
    setOpen,
  });

  const {
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    refs,
    strategy,
    update,
    x,
    y,
  } = floatingProperties;

  const focus = useFocus(context);
  const { getFloatingProps, getReferenceProps } = useFloatingInteractions({
    context,
    role: "tooltip",
    trigger: local.trigger,
    interactions: [focus],
  });

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open()) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, refs.floating, refs.reference, update]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={local.theme.target}
        data-testid="flowbite-tooltip-target"
        {...getReferenceProps()}
      >
        {local.children}
      </div>
      <div
        ref={refs.setFloating}
        data-testid="flowbite-tooltip"
        {...getFloatingProps({
          class: twMerge(
            local.theme.base,
            local.animation && `${local.theme.animation} ${local.animation}`,
            !open && local.theme.hidden,
            local.theme.style[local.style],
            local.class
          ),
          style: {
            position: strategy,
            top: y ?? " ",
            left: x ?? " ",
            minWidth: local.minWidth,
          },
          ...props,
        })}
      >
        <div class={local.theme.content}>{local.content}</div>
        <Show when={local.arrow}>
          <div
            class={twMerge(
              local.theme.arrow.base,
              local.style === "dark" && local.theme.arrow.style.dark,
              local.style === "light" && local.theme.arrow.style.light,
              local.style === "auto" && local.theme.arrow.style.auto
            )}
            data-testid="flowbite-tooltip-arrow"
            ref={arrowRef}
            style={{
              top: arrowY ?? " ",
              left: arrowX ?? " ",
              right: " ",
              bottom: " ",
              [getArrowPlacement({ placement: floatingProperties.placement })]:
                local.theme.arrow.placement,
            }}
          >
            &nbsp;
          </div>
        </Show>
      </div>
    </>
  );
};
