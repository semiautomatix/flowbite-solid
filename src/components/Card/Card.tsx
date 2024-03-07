import { twMerge } from "tailwind-merge";
import { mergeDeep } from "../../helpers/merge-deep";
import { omit } from "../../helpers/omit";
import { getTheme } from "../../theme-store";
import type { DeepPartial } from "../../types";
import type { FlowbiteBoolean } from "../Flowbite";
import {
  Component,
  ComponentProps,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";

export interface FlowbiteCardTheme {
  root: FlowbiteCardRootTheme;
  img: FlowbiteCardImageTheme;
}

export interface FlowbiteCardRootTheme {
  base: string;
  children: string;
  horizontal: FlowbiteBoolean;
  href: string;
}

export interface FlowbiteCardImageTheme {
  base: string;
  horizontal: FlowbiteBoolean;
}

interface CommonCardProps extends ComponentProps<"div"> {
  horizontal?: boolean;
  href?: string;
  /** Overwrites the theme. Will be merged with the context theme.
   * @default {}
   */
  theme?: DeepPartial<FlowbiteCardTheme>;
}

export type CardProps = (
  | { imgAlt?: string; imgSrc?: string; renderImage?: never }
  | {
      /** Allows to provide a custom render function for the image component. Useful in Next.JS and Gatsby. **Setting this will disable `imgSrc` and `imgAlt`**.
       */
      renderImage?: (
        theme: DeepPartial<FlowbiteCardTheme>,
        horizontal: boolean
      ) => JSX.Element;
      imgAlt?: never;
      imgSrc?: never;
    }
) &
  CommonCardProps;

export const Card: Component<CardProps> = (p: CardProps) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, [
    "children",
    "class",
    "horizontal",
    "href",
    "theme",
  ]);

  // const Component = typeof local.href === "undefined" ? "div" : "a";
  const BaseComponent = typeof local.href === "undefined" ? "div" : "a";
  const theirProps = () => removeCustomProps(props);

  const theme = mergeDeep(getTheme().card, local.theme);

  return (
    <Dynamic
      component={BaseComponent}
      data-testid="flowbite-card"
      href={local.href}
      class={twMerge(
        theme.root.base,
        theme.root.horizontal[local.horizontal ? "on" : "off"],
        local.href && theme.root.href,
        local.class
      )}
      {...theirProps()}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- jsx-ally/alt-text gives a false positive here. Since we use our own Image component, we cannot provide an "alt" prop.*/}
      <Image {...p} />
      <div class={theme.root.children}>{local.children}</div>
    </Dynamic>
  );
};

const Image: Component<CardProps> = (p: CardProps) => {
  const merged = mergeProps(
    {
      theme: {},
    },
    p
  );
  const [local, props] = splitProps(merged, ["theme"]);

  const theme = mergeDeep(getTheme().card, local.theme);
  if (props.renderImage) {
    return props.renderImage(theme, props.horizontal ?? false);
  }
  if (props.imgSrc) {
    return (
      <img
        data-testid="flowbite-card-image"
        alt={props.imgAlt ?? ""}
        src={props.imgSrc}
        class={twMerge(
          theme.img.base,
          theme.img.horizontal[props.horizontal ? "on" : "off"]
        )}
      />
    );
  }
  return null;
};

const removeCustomProps = omit([
  "renderImage",
  "imgSrc",
  "imgAlt",
  "children",
  "className",
  "horizontal",
  "href",
  "theme",
]);
