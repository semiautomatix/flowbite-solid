import { Component, mergeProps, splitProps } from "solid-js";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';

export interface FlowbiteRadioTheme {
  root: FlowbiteRadioRootTheme;
}

export interface FlowbiteRadioRootTheme {
  base: string;
}

export interface RadioProps extends Omit<ComponentProps<'input'>, 'ref' | 'type'> {
  theme?: DeepPartial<FlowbiteRadioTheme>;
}

export const Radio: Component<RadioProps> = (props) => {
  const merged = mergeProps({ theme: {} }, props);
  const [local, others] = splitProps(merged, ["class", "theme"]);
  const theme = mergeDeep(getTheme().radio, local.theme);

  return (
    <input
      type="radio"
      class={twMerge(theme.root.base, local.class)}
      {...others}
    />
  );
};


