"use client";

import { setThemeMode } from "..";
// import { useThemeMode, type ThemeMode } from '../../hooks/use-theme-mode';
import { type ThemeMode } from "../../hooks/use-theme-mode";

interface Props {
  mode?: ThemeMode;
}

export function ThemeModeInit({ mode }: Props) {
  if (mode) setThemeMode(mode);

  // TODO
  // useThemeMode();

  return null;
}
