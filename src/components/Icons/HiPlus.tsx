import { Icon } from "solid-heroicons";
import { plus } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { IconProps } from ".";

export const HiPlus: Component<IconProps> = (props: IconProps) => {
  return <Icon path={plus} {...props} />;
};
