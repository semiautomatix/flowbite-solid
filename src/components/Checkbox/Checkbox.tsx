import { mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js';
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

export const Checkbox: Component<CheckboxProps> = (props) => {
  const merged = mergeProps({ color: 'default', theme: {} }, props);
  const [local, others] = splitProps(merged, ['className', 'color', 'theme']);
  const theme = mergeDeep(getTheme().checkbox, local.theme);

  return (
    <input
      type="checkbox"
      class={twMerge(theme.root.base, theme.root.color[local.color], local.className)}
      {...others}
    />
  );
};

// Checkbox.displayName = 'Checkbox';
