import { Component, ComponentProps, mergeProps, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";

export interface FlowbiteFileInputTheme {
  root: {
    base: string;
    color: string;
  };
}

export interface FileInputProps extends Omit<ComponentProps<"input">, "type" | "ref"> {
  theme?: DeepPartial<FlowbiteFileInputTheme>;
  accept?: string;
  class?: string;
}

export const FileInput: Component<FileInputProps> = (props) => {
  const merged = mergeProps({ theme: {} }, props);
  const [local, others] = splitProps(merged, ["class", "accept", "theme"]);
  const theme = mergeDeep(getTheme().fileInput, local.theme);

  return (
    <input
      type="file"
      class={twMerge(
        theme.root.base,
        local.class
      )}
      accept={local.accept}
      {...others}
    />
  );
};
