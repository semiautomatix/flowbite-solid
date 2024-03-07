import { ComponentProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ElementType } from "../../helpers/types";

export type ButtonBaseProps<T extends ElementType = "button"> =
  ComponentProps<"button"> & {
    as?: T;
    href?: string;
    type?: string;
  };

const ButtonBaseComponent = <T extends ElementType = "button">(
  props: ButtonBaseProps<T>
) => {
  const [local, others] = splitProps(props, [
    "children",
    "as",
    "href",
    "type",
    "ref",
  ]);
  const { children, as: Component, href, type = "button", ref } = local;
  const BaseComponent = Component || (href ? "a" : "button");
  // https://github.com/solidjs/solid/issues/380#issuecomment-805643273
  // https://www.solidjs.com/docs/latest/api#dynamic
  return (
    <Dynamic
      component={BaseComponent}
      ref={ref}
      href={href}
      type={type}
      {...others}
    >
      {children}
    </Dynamic>
  );
};

// export const ButtonBase = genericForwardRef(ButtonBaseComponent);
export const ButtonBase = ButtonBaseComponent;
