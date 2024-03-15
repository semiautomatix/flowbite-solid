import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteBoolean, FlowbiteColors } from '../Flowbite';
import { HelperText } from '../HelperText';

export interface FlowbiteTextareaTheme {
  base: string;
  colors: TextareaColors;
  withShadow: FlowbiteBoolean;
}

export interface TextareaColors extends Pick<FlowbiteColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
  [key: string]: string;
}

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'color' | 'ref'> {
  color?: keyof TextareaColors;
  helperText?: ReactNode;
  shadow?: boolean;
  theme?: DeepPartial<FlowbiteTextareaTheme>;
}

export const Textarea: Component<TextareaProps> = (props) => {
  const mergedProps = mergeProps({ color: 'gray', helperText: '', shadow: false, theme: {} }, props);
  const [local, others] = splitProps(mergedProps, ['color', 'helperText', 'shadow', 'theme']);
  const theme = mergeDeep(getTheme().textarea, local.theme);

  return (
    <>
      <textarea
        class={twMerge(theme.base, theme.colors[local.color], theme.withShadow[local.shadow ? 'on' : 'off'], local.class)}
        {...others}
      />
      <Show when={local.helperText}>
        <HelperText color={local.color}>{local.helperText}</HelperText>
      </Show>
    </>
  );
};
