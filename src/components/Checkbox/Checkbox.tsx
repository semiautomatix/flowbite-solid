import { mergeProps, Component } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteColors } from '../Flowbite';

export interface FlowbiteCheckboxTheme {
  root: FlowbiteCheckboxRootTheme;
}
export interface FlowbiteCheckboxRootTheme {
  base: string;
  color: FlowbiteColors;
}

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type' | 'ref' | 'color'> {
  theme?: DeepPartial<FlowbiteCheckboxTheme>;
  color?: keyof FlowbiteColors;
}

export const Checkbox: Component<CheckboxProps> = (p: CheckboxProps) => {
  const mergedProps = mergeProps({ color: 'default', theme: {} }, p);
  const [local, props] = splitProps(mergedProps, ["theme"]);
  const theme = mergeDeep(getTheme().checkbox, local.theme);
  const theme = mergeDeep(getTheme().checkbox, customTheme);
  return (
    <input
      type="checkbox"
      class={twMerge(theme.root.base, theme.root.color[color], className)}
      {...restProps}
    />
  );
};
