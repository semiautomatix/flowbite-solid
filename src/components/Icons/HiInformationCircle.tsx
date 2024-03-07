import { Icon } from "solid-heroicons";
import { informationCircle } from "solid-heroicons/solid";
import { Component } from "solid-js";
import { IconProps } from "./";

export const HiInformationCircle: Component<IconProps> = (props: IconProps) => {
  return <Icon path={informationCircle} {...props} />;
};
