import { ComponentProps, createEffect, createSignal, mergeProps, Show, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";

interface TextareaProps extends Omit<ComponentProps<"textarea">, "class"> {
  theme?: DeepPartial<any>; // Specify the theme structure when defined
  class?: string;
}

export const Textarea = (userProps: TextareaProps) => {
  const defaultProps = {
    theme: {},
  };
  const props = mergeProps(defaultProps, userProps);
  const [local, others] = splitProps(props, ["class", "theme"]);

  const [value, setValue] = createSignal("");

  createEffect(() => {
    // Example effect: Log value changes
    console.log(value());
  });

  const theme = mergeDeep(getTheme().textarea, local.theme);

  return (
    <Show when={local.theme} fallback={<textarea {...others} class={twMerge(local.class)} onInput={(e) => setValue(e.currentTarget.value)} />}>
      <textarea
        {...others}
        class={twMerge(theme.root.base, local.class)}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
    </Show>
  );
};
