import type { Placement } from '@floating-ui/core';
import { Component, splitProps, mergeProps } from 'solid-js';
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
  const [local, others] = splitProps(p, ['animation', 'arrow', 'children', 'className', 'content', 'placement', 'style', 'theme', 'trigger']);
  const mergedProps = mergeProps({
    animation: 'duration-300',
    arrow: true,
    placement: 'top',
    style: 'dark',
    theme: {},
    trigger: 'hover'
  }, local);
  const theme = mergeDeep(getTheme().tooltip, mergedProps.theme);


  return (
    <Floating
      animation={animation}
      arrow={arrow}
      content={content}
      placement={placement}
      style={style}
      theme={theme}
      trigger={trigger}
      class={className}
      {...p}
    >
      {children}
    </Floating>
  );
};

Tooltip.displayName = 'Tooltip';
