import {
  ComponentProps,
  ParentComponent,
  createMemo,
  splitProps,
  children as useChildren,
} from "solid-js";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type { ButtonProps } from "../Button";

export interface FlowbiteButtonGroupTheme {
  base: string;
  position: PositionInButtonGroup;
}

export interface PositionInButtonGroup {
  none: string;
  start: string;
  middle: string;
  end: string;
}

export interface ButtonGroupProps
  extends ComponentProps<"div">,
    Pick<ButtonProps, "outline" | "pill"> {
  theme?: DeepPartial<FlowbiteButtonGroupTheme>;
}

export const ButtonGroup: ParentComponent<ButtonGroupProps> = (
  props: ButtonGroupProps
) => {
  const [local, others] = splitProps(props, [
    "children",
    "class",
    "outline",
    "pill",
    "theme",
  ]);
  const {
    children,
    class: className,
    outline,
    pill,
    theme: customTheme = {},
  } = local;
  const c = useChildren(() => children);
  const items = createMemo(() => {
    const r = c() as any[];
    r.map((child, index) => {
      child.outline = outline;
      child.pill = pill;
      child.positionInGroup =
        index === 0 ? "start" : index === r.length - 1 ? "end" : "middle";
      return child;
    });
    return r;
  }, [c, outline, pill]);
  const theme = mergeDeep(getTheme().buttonGroup, customTheme);

  return (
    <div class={twMerge(theme.base, className)} role="group" {...others}>
      {items()}
    </div>
  );
};

// ButtonGroup.displayName = "Button.Group";
