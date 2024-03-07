// import { useListItem } from '@floating-ui/react';
// import type { ComponentProps, ComponentPropsWithoutRef, ElementType, FC, RefCallback } from 'react';
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import type { DeepPartial } from "../../types";
import { ButtonBase, type ButtonBaseProps } from "../Button/ButtonBase";
import { useDropdownContext } from "./DropdownContext";
import { ElementType } from "../../helpers/types";
import {
  Component,
  ComponentProps,
  mergeProps,
  splitProps,
  children,
  Show,
} from "solid-js";

export interface FlowbiteDropdownItemTheme {
  container: string;
  base: string;
  icon: string;
}

export type DropdownItemProps<T extends ElementType = "button"> = {
  // TODO: make it work with `Link` from Next.js
  as?: T;
  href?: string;
  icon?: Component<ComponentProps<"svg">>;
  onClick?: () => void;
  theme?: DeepPartial<FlowbiteDropdownItemTheme>;
} & ComponentPropsWithoutRef<T>;

export const DropdownItem = <T extends ElementType = "button">(
  p: DropdownItemProps<T>
) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, [
    "children",
    "class",
    "icon",
    "onClick",
    "theme",
  ]);

  const { ref, index } = useListItem({
    label: typeof children === "string" ? children : undefined,
  });
  const {
    theme: rootTheme,
    activeIndex,
    dismissOnClick,
    getItemProps,
    handleSelect,
  } = useDropdownContext();
  const isActive = activeIndex === index;
  const theme = mergeDeep(rootTheme.floating.item, local.theme);

  const theirProps = props as ButtonBaseProps<T>;

  return (
    <li role="menuitem" class={theme.container}>
      <ButtonBase
        ref={ref as RefCallback<T>}
        class={twMerge(theme.base, local.class)}
        {...theirProps}
        {...getItemProps({
          onClick: () => {
            local.onClick && local.onClick();
            dismissOnClick && handleSelect(null);
          },
        })}
        tabIndex={isActive ? 0 : -1}
      >
        <Show when={local.icon}>
          <local.icon class={theme.icon} />
        </Show>
        {children}
      </ButtonBase>
    </li>
  );
};
