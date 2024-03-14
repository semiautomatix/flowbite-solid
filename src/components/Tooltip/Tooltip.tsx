import type { Placement } from '@floating-ui/core';
import { Component, createSignal, createEffect } from 'solid-js';
import { For, Show } from 'solid-js/web';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import { Floating, type FlowbiteFloatingTheme } from '../Floating';

export type FlowbiteTooltipTheme = FlowbiteFloatingTheme;

export interface TooltipProps extends Omit<ComponentProps<'div'>, 'content' | 'style'> {
  animation?: false | `duration-${number}`;
  arrow?: boolean;
  content: ReactNode;
  placement?: 'auto' | Placement;
  style?: 'dark' | 'light' | 'auto';
  theme?: DeepPartial<FlowbiteTooltipTheme>;
  trigger?: 'hover' | 'click';
}

/**
 * @see https://floating-ui.com/docs/react-dom-interactions
 */
export const Tooltip: Component<TooltipProps> = (props) => {
  const [getProps, setProps] = createSignal(props);
  createEffect(() => {
    setProps(props);
  });
  const { children, animation = 'duration-300', arrow = true, className, content, placement = 'top', style = 'dark', theme: customTheme = {}, trigger = 'hover' } = props;
  const theme = createEffect(() => mergeDeep(getTheme().tooltip, getProps().theme));

  return (
    <Floating
      animation={animation}
      arrow={arrow}
      content={content}
      placement={placement}
      style={style}
      theme={theme}
      trigger={trigger}
      classList={{ [className]: true }}
      {...props}
    >
      {children}
    </Floating>
  );
};

Tooltip.displayName = 'Tooltip';
