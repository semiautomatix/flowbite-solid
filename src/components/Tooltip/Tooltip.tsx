import { Component, ComponentProps, createSignal, mergeProps, Show, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

interface TooltipProps extends ComponentProps<"div"> {
  content: string;
  placement: "top" | "bottom" | "left" | "right";
  style?: "dark" | "light" | "auto";
}

const Tooltip: Component<TooltipProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const mergedProps = mergeProps({ style: "auto" }, props);
  const [local, others] = splitProps(mergedProps, ["content", "placement", "style", "children"]);

  const toggleTooltip = () => setIsOpen(!isOpen());

  return (
    <>
      <div {...others} onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
        {local.children}
      </div>
      <Show when={isOpen()}>
        <div
          class={twMerge(
            "absolute z-10",
            local.placement === "top" && "bottom-full",
            local.placement === "bottom" && "top-full",
            local.placement === "left" && "right-full",
            local.placement === "right" && "left-full",
            local.style === "dark" && "bg-black text-white",
            local.style === "light" && "bg-white text-black",
            local.style === "auto" && "bg-gray-200 text-gray-800",
            "p-2 rounded shadow-md"
          )}
        >
          {local.content}
        </div>
      </Show>
    </>
  );
};

export default Tooltip;
