import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import { Component, ComponentProps, JSX } from "solid-js";

export interface FlowbitePaginationButtonTheme {
  base: string;
  active: string;
  disabled: string;
}

export interface PaginationButtonProps extends ComponentProps<"button"> {
  active?: boolean;
  children?: JSX.Element;
  class?: string;
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  theme?: DeepPartial<FlowbitePaginationButtonTheme>;
}

export interface PaginationPrevButtonProps
  extends Omit<PaginationButtonProps, "active"> {
  disabled?: boolean;
}

export const PaginationButton: Component<PaginationButtonProps> = ({
  active,
  children,
  class: className,
  onClick,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().pagination, customTheme);

  return (
    <button
      type="button"
      class={twMerge(active && theme.pages.selector.active, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// PaginationButton.displayName = "Pagination.Button";

export const PaginationNavigation: Component<PaginationPrevButtonProps> = ({
  children,
  class: className,
  onClick,
  theme: customTheme = {},
  disabled = false,
  ...props
}) => {
  const theme = mergeDeep(getTheme().pagination, customTheme);

  return (
    <button
      type="button"
      class={twMerge(disabled && theme.pages.selector.disabled, className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// PaginationNavigation.displayName = "Pagination.Navigation";
