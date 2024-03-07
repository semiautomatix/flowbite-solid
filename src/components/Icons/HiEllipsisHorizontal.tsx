import { Icon } from "solid-heroicons";
import { ellipsisHorizontal } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { IconProps } from ".";

export const HiEllipsisHorizontal: Component<IconProps> = (
  props: IconProps
) => {
  return <Icon path={ellipsisHorizontal} {...props} />;
};
