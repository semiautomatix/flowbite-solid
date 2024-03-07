import { Icon } from "solid-heroicons";
import { magnifyingGlass } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { IconProps } from ".";

export const HiMagnifyingGlass: Component<IconProps> = (props: IconProps) => {
  return <Icon path={magnifyingGlass} {...props} />;
};
