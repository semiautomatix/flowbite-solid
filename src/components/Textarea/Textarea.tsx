import { createEffect, createSignal, Show, mergeProps, splitProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteColors } from '../Flowbite';

export interface FlowbiteTextareaTheme {
  root: FlowbiteTextareaRootTheme;
}
export interface FlowbiteTextareaRootTheme {
  base: string;
  color: FlowbiteColors;
}

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'ref' | 'color'> {
  theme?: DeepPartial<FlowbiteTextareaTheme>;
  color?: keyof FlowbiteColors;
  class?: string;
}

export const Textarea = (userProps: TextareaProps) => {
  const defaultProps = { color: 'default', theme: {} };
  const props = mergeProps(defaultProps, userProps);
  const [local, others] = splitProps(props, ['class', 'color', 'theme']);
  const theme = mergeDeep(getTheme().textarea, local.theme);

  return (
    <Show when={local.class} fallback={<textarea {...others} />}>
      <textarea
        class={twMerge(
          theme.root.base,
          theme.root.color[local.color],
          local.class
        )}
        {...others}
      />
    </Show>
  );
};
