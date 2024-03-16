'use client';

import { Component, mergeProps, splitProps, Show } from "solid-js";
import { HiMoon, HiSun } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { useThemeMode } from '../../hooks/use-theme-mode';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';

export interface FlowbiteDarkThemeToggleTheme {
  root: FlowbiteDarkThemeToggleRootTheme;
}

export interface FlowbiteDarkThemeToggleRootTheme {
  base: string;
  icon: string;
}

export interface DarkThemeToggleProps extends ComponentProps<'button'> {
  iconDark?: string;
  iconLight?: string;
  theme?: DeepPartial<FlowbiteDarkThemeToggleTheme>;
}

export const DarkThemeToggle: FC<DarkThemeToggleProps> = ({
}) => {
  const props = mergeProps({ class: '', theme: {}, iconDark: HiSun, iconLight: HiMoon }, props);
  const [local, others] = splitProps(props, ['class', 'theme', 'iconDark', 'iconLight']);
  const { class: className, theme: customTheme, iconDark: IconDark, iconLight: IconLight } = local;
  const { computedMode, toggleMode } = useThemeMode();

  const theme = mergeDeep(getTheme().darkThemeToggle, customTheme);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      data-testid="dark-theme-toggle"
      class={twMerge(theme.root.base, className)}
      onClick={toggleMode}
      {...others}
    >
      <IconDark
        aria-label="Currently dark mode"
        data-active={computedMode === 'dark'}
        class={twMerge(theme.root.icon, 'hidden dark:block')}
      />
      <IconLight
        aria-label="Currently light mode"
        data-active={computedMode === 'light'}
        class={twMerge(theme.root.icon, 'dark:hidden')}
      />
    </button>
  );
};

DarkThemeToggle.displayName = 'DarkThemeToggle';
