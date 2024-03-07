// import type { ExtendedRefs } from '@floating-ui/react';
// import { FloatingFocusManager, FloatingList, useListNavigation, useTypeahead } from '@floating-ui/react';
// import type {
//   ComponentProps,
//   Dispatch,
//   FC,
//   HTMLProps,
//   MutableRefObject,
//   ReactElement,
//   ReactNode,
//   RefCallback,
//   SetStateAction,
// } from 'react';
// import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronUp } from 'react-icons/hi';
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import {
  useBaseFLoating,
  useFloatingInteractions,
} from "../../hooks/use-floating";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import { Button, type ButtonProps } from "../Button";
import type { FloatingProps, FlowbiteFloatingTheme } from "../Floating.react";
import { DropdownContext } from "./DropdownContext";
import {
  DropdownDivider,
  type FlowbiteDropdownDividerTheme,
} from "./DropdownDivider";
import {
  DropdownHeader,
  type FlowbiteDropdownHeaderTheme,
} from "./DropdownHeader";
import { DropdownItem, type FlowbiteDropdownItemTheme } from "./DropdownItem";
import { Icon } from "solid-heroicons";
import { JSX } from "solid-js/jsx-runtime";
import {
  Component,
  ComponentProps,
  Show,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from "solid-js";
import { chevronDown } from "solid-heroicons/solid";

export interface FlowbiteDropdownFloatingTheme
  extends FlowbiteFloatingTheme,
    FlowbiteDropdownDividerTheme,
    FlowbiteDropdownHeaderTheme {
  item: FlowbiteDropdownItemTheme;
}

export interface FlowbiteDropdownTheme {
  floating: FlowbiteDropdownFloatingTheme;
  content: string;
  inlineWrapper: string;
  arrowIcon: string;
}

export interface DropdownProps
  extends Pick<FloatingProps, "placement" | "trigger">,
    Omit<ButtonProps, "theme"> {
  arrowIcon?: boolean;
  dismissOnClick?: boolean;
  floatingArrow?: boolean;
  inline?: boolean;
  label: JSX.Element;
  theme?: DeepPartial<FlowbiteDropdownTheme>;
  renderTrigger?: (theme: FlowbiteDropdownTheme) => JSX.Element;
  "data-testid"?: string;
}

const icons: Record<string, Component<ComponentProps<"svg">>> = {
  top: typeof Icon,
  right: typeof Icon,
  bottom: typeof Icon,
  left: typeof Icon,
};

export interface TriggerProps extends Omit<ButtonProps, "theme"> {
  refs: ExtendedRefs<HTMLElement>;
  inline?: boolean;
  theme: FlowbiteDropdownTheme;
  setButtonWidth?: Dispatch<SetStateAction<number | undefined>>;
  getReferenceProps: (
    userProps?: HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
  renderTrigger?: (theme: FlowbiteDropdownTheme) => JSX.Element;
}

const Trigger = (p: TriggerProps) => {
  const [local, buttonProps] = splitProps(p, [
    "refs",
    "children",
    "inline",
    "theme",
    "disabled",
    "setButtonWidth",
    "getReferenceProps",
    "renderTrigger",
  ]);

  const ref = local.refs.reference as MutableRefObject<HTMLElement>;
  const a11yProps = getReferenceProps();

  useEffect(() => {
    if (ref.current) {
      local.setButtonWidth?.(ref.current.clientWidth);
    }
  }, [ref, local.setButtonWidth]);

  if (local.renderTrigger) {
    const triggerElement = local.renderTrigger(local.theme);
    return cloneElement(triggerElement, {
      ref: local.refs.setReference,
      disabled: local.disabled,
      ...a11yProps,
      ...triggerElement.props,
    });
  }

  return (
    <Show
      when={local.inline}
      fallback={
        <Button
          {...buttonProps}
          disabled={local.disabled}
          type="button"
          ref={local.refs.setReference as RefCallback<"button">}
          {...a11yProps}
        >
          {local.children}
        </Button>
      }
    >
      <button
        type="button"
        ref={local.refs.setReference}
        className={local.theme?.inlineWrapper}
        disabled={local.disabled}
        {...a11yProps}
      >
        {local.children}
      </button>
      )
    </Show>
  );
};

const DropdownComponent: Component<DropdownProps> = (p: DropdownProps) => {
  const merged = mergeProps(
    {
      dismissOnClick: true,
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, [
    "children",
    "class",
    "dismissOnClick",
    "theme",
    "renderTrigger",
  ]);

  const [open, setOpen] = createSignal(false);
  const [activeIndex, setActiveIndex] = createSignal<number | null>(null);
  const [selectedIndex, setSelectedIndex] = createSignal<number | null>(null);
  const [buttonWidth, setButtonWidth] = createSignal<number | undefined>(
    undefined
  );
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const theme = mergeDeep(getTheme().dropdown, local.theme);
  const theirProps = props as Omit<DropdownProps, "theme">;
  const dataTestId = props["data-testid"] || "flowbite-dropdown-target";
  const {
    placement = props.inline ? "bottom-start" : "bottom",
    trigger = "click",
    label,
    inline,
    arrowIcon = true,
    ...buttonProps
  } = theirProps;

  const handleSelect = useCallback((index: number | null) => {
    setSelectedIndex(index);
    setOpen(false);
  }, []);

  const handleTypeaheadMatch = useCallback(
    (index: number | null) => {
      if (open()) {
        setActiveIndex(index);
      } else {
        handleSelect(index);
      }
    },
    [open, handleSelect]
  );

  const { context, floatingStyles, refs } = useBaseFLoating<HTMLButtonElement>({
    open,
    setOpen,
    placement,
  });

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } =
    useFloatingInteractions({
      context,
      role: "menu",
      trigger,
      interactions: [listNav, typeahead],
    });

  const ArrowIcon = createMemo(() => {
    const [p] = placement.split("-");
    return icons[p] ?? <Icon path={chevronDown} />;
  }, [placement]);

  return (
    <DropdownContext.Provider
      value={{ theme, activeIndex, dismissOnClick, getItemProps, handleSelect }}
    >
      <Trigger
        {...buttonProps}
        refs={refs}
        inline={inline}
        theme={theme}
        data-testid={dataTestId}
        class={twMerge(theme.floating.target, buttonProps.class)}
        setButtonWidth={setButtonWidth}
        getReferenceProps={getReferenceProps}
        renderTrigger={renderTrigger}
      >
        {label}
        <Show when={arrowIcon}>
          {/* How to use an accessor here? */}
          <ArrowIcon className={theme.arrowIcon} />
        </Show>
      </Trigger>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, minWidth: buttonWidth }}
            data-testid="flowbite-dropdown"
            aria-expanded={open}
            {...getFloatingProps({
              className: twMerge(
                theme.floating.base,
                theme.floating.animation,
                "duration-100",
                !open && theme.floating.hidden,
                theme.floating.style.auto,
                local.class
              ),
            })}
          >
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              <ul class={theme.content} tabIndex={-1}>
                {local.children}
              </ul>
            </FloatingList>
          </div>
        </FloatingFocusManager>
      )}
    </DropdownContext.Provider>
  );
};

// DropdownComponent.displayName = "Dropdown";
// DropdownHeader.displayName = "Dropdown.Header";
// DropdownDivider.displayName = "Dropdown.Divider";

export const Dropdown = Object.assign(DropdownComponent, {
  Item: DropdownItem,
  Header: DropdownHeader,
  Divider: DropdownDivider,
});
