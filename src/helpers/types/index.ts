import { Component, JSX } from "solid-js";

// https://github.com/solidjs/solid/issues/701
export type ElementType = keyof JSX.IntrinsicElements | Component<any>;
