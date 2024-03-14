import type { ComponentProps, FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean, FlowbiteColors, FlowbiteSizes } from '../Flowbite';

export interface FlowbiteBadgeTheme {
  root: FlowbiteBadgeRootTheme;
  icon: FlowbiteBadgeIconTheme;
}

export interface FlowbiteBadgeRootTheme {
  base: string;
  color: FlowbiteColors;
  href: string;
  size: BadgeSizes;
}

export interface FlowbiteBadgeIconTheme extends FlowbiteBoolean {
  size: BadgeSizes;
}

export interface BadgeSizes extends Pick<FlowbiteSizes, 'xs' | 'sm'> {
  [key: string]: string;
}

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'color'> {
  color?: keyof FlowbiteColors;
  href?: string;
  icon?: FC<ComponentProps<'svg'>>;
  size?: keyof BadgeSizes;
  theme?: DeepPartial<FlowbiteBadgeTheme>;
}

export const Badge: FC<BadgeProps> = ({
  children,
  color = 'info',
  href,
  icon: Icon,
  size = 'xs',
  class,
  theme: customTheme = {},
  ...props
}) => {
  const merged = mergeProps({ color: 'info', size: 'xs', theme: {} }, props);
  const [local, others] = splitProps(merged, ['class', 'color', 'size', 'theme']);
  const theme = mergeDeep(getTheme().badge, local.theme);

  const Content: FC = () => (
    <span
      class={twMerge(
        theme.root.base,
        theme.root.color[local.color],
        theme.root.size[local.size],
        theme.icon[Icon ? 'on' : 'off'],
        local.class
      )}
      data-testid="flowbite-badge"
      {...others}
    >
      {Icon && <Icon aria-hidden class={theme.icon.size[local.size]} data-testid="flowbite-badge-icon" />}
      {children && <span>{children}</span>}
    </span>
  );

  return (
    <Show when={local.href} fallback={<Content />}>{() => (
      <a class={theme.root.href} href={local.href}><Content /></a>
    )}</Show>
  );
};


