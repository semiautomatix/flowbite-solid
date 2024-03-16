import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
import type { FlowbiteColors, FlowbiteSizes } from '../Flowbite';

export interface FlowbiteProgressTheme {
  base: string;
  label: string;
  bar: string;
  color: ProgressColor;
  size: ProgressSizes;
}

export interface ProgressColor
  extends Pick<FlowbiteColors, 'dark' | 'blue' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple'> {
  [key: string]: string;
}

export interface ProgressSizes extends Pick<FlowbiteSizes, 'sm' | 'md' | 'lg' | 'xl'> {
  [key: string]: string;
}

export interface ProgressProps extends ComponentProps<'div'> {
  labelProgress?: boolean;
  labelText?: boolean;
  progress: number;
  progressLabelPosition?: 'inside' | 'outside';
  size?: keyof ProgressSizes;
  textLabel?: string;
  textLabelPosition?: 'inside' | 'outside';
  theme?: DeepPartial<FlowbiteProgressTheme>;
}

export const Progress: FC<ProgressProps> = ({
  className,
  color = 'blue',
  labelProgress = false,
  labelText = false,
  progress,
  progressLabelPosition = 'inside',
  size = 'md',
  textLabel = 'progressbar',
  textLabelPosition = 'inside',
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().progress, customTheme);

  return (
    <>
      <div aria-label={textLabel} aria-valuenow={progress} role="progressbar" {...props}>
        {((textLabel && labelText && textLabelPosition === 'outside') ||
          (progress > 0 && labelProgress && progressLabelPosition === 'outside')) && (
          <div className={theme.label} data-testid="flowbite-progress-outer-label-container">
            {textLabel && labelText && textLabelPosition === 'outside' && (
              <span data-testid="flowbite-progress-outer-text-label">{textLabel}</span>
            )}
            {labelProgress && progressLabelPosition === 'outside' && (
              <span data-testid="flowbite-progress-outer-progress-label">{progress}%</span>
            )}
          </div>
        )}

        <div className={twMerge(theme.base, theme.size[size], className)}>
          <div style={{ width: `${progress}%` }} className={twMerge(theme.bar, theme.color[color], theme.size[size])}>
            {textLabel && labelText && textLabelPosition === 'inside' && (
              <span data-testid="flowbite-progress-inner-text-label">{textLabel}</span>
            )}
            {progress > 0 && labelProgress && progressLabelPosition === 'inside' && (
              <span data-testid="flowbite-progress-inner-progress-label">{progress}%</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const Progress: Component<ProgressProps> = (p) => {
  const mergedProps = mergeProps({ color: 'blue', labelProgress: false, labelText: false, progressLabelPosition: 'inside', size: 'md', textLabel: 'progressbar', textLabelPosition: 'inside', theme: {} }, p);
  const [local, others] = splitProps(mergedProps, ['className', 'color', 'labelProgress', 'labelText', 'progress', 'progressLabelPosition', 'size', 'textLabel', 'textLabelPosition', 'theme']);
  const theme = mergeDeep(getTheme().progress, local.theme);

  // JSX will be adjusted in the following steps to comply with Solid.js

  return (
    <>
      <div {...others} aria-label={local.textLabel} aria-valuenow={local.progress} role="progressbar">
        <Show when={(local.textLabel && local.labelText && local.textLabelPosition === 'outside') ||
          (local.progress > 0 && local.labelProgress && local.progressLabelPosition === 'outside')}>
          <div class={theme.label} data-testid="flowbite-progress-outer-label-container">
            <Show when={local.textLabel && local.labelText && local.textLabelPosition === 'outside'}>
              <span data-testid="flowbite-progress-outer-text-label">{local.textLabel}</span>
            </Show>
            <Show when={local.labelProgress && local.progressLabelPosition === 'outside'}>
              <span data-testid="flowbite-progress-outer-progress-label">{local.progress}%</span>
            </Show>
          </div>
        </Show>
        <div style={{ width: `${local.progress}%` }} class={twMerge(theme.bar, theme.color[local.color], theme.size[local.size])}>
          <Show when={local.textLabel && local.labelText && local.textLabelPosition === 'inside'}>
            <span data-testid="flowbite-progress-inner-text-label">{local.textLabel}</span>
          </Show>
          <Show when={local.progress > 0 && local.labelProgress && local.progressLabelPosition === 'inside'}>
            <span data-testid="flowbite-progress-inner-progress-label">{local.progress}%</span>
          </Show>
        </div>
      </div>
    </>
  );
};

Progress.displayName = 'Progress';
