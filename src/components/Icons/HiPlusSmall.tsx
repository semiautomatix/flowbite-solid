import { Icon } from "solid-heroicons";
import { plusSmall } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { IconProps } from ".";

export const HiPlusSmall: Component<IconProps> = (props: IconProps) => {
  return <Icon path={plusSmall} {...props} />;
};
