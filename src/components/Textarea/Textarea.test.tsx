import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, fireEvent, screen } from "@solidjs/testing-library";
import { Textarea } from "./Textarea";

describe("Textarea Component", () => {
  afterEach(cleanup);

  it("renders correctly with default props", () => {
    render(() => <Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("applies custom theme correctly", () => {
    const customTheme = {
      root: {
        base: "bg-blue-500",
        color: { default: "text-white" },
      },
    };
    render(() => <Textarea theme={customTheme} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("bg-blue-500");
    expect(textarea).toHaveClass("text-white");
  });

  it("handles user interaction: typing in the textarea", async () => {
    render(() => <Textarea />);
    const textarea = screen.getByRole("textbox");
    await fireEvent.input(textarea, { target: { value: 'Hello, World!' } });
    expect(textarea.value).toBe('Hello, World!');
  });

  it("conditionally applies classes based on props", () => {
    const placeholderText = "Type here...";
    render(() => <Textarea placeholder={placeholderText} />);
    const textarea = screen.getByPlaceholderText(placeholderText);
    expect(textarea).toBeInTheDocument();
  });
});
