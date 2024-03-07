import { Icon } from "solid-heroicons";
import { xMark } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { IconProps } from "./";

export const HiX: Component<IconProps> = (props: IconProps) => {
  return <Icon path={xMark} {...props} />;
};
