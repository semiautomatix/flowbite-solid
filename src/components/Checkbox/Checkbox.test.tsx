import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, fireEvent, screen } from "@solidjs/testing-library";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  it("renders correctly with default props", () => {
    render(() => <Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("applies custom theme correctly", () => {
    const customTheme = {
      root: {
        base: "bg-blue-500",
        color: { default: "text-white" },
      },
    };
    render(() => <Checkbox theme={customTheme} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("bg-blue-500");
    expect(checkbox).toHaveClass("text-white");
  });

  it("handles user interaction: clicking to check and uncheck", async () => {
    render(() => <Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("conditionally applies classes based on props", () => {
    const color = "red";
    render(() => <Checkbox color={color} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("text-red-500"); // Assuming 'text-red-500' is the class applied for color 'red'
  });
});
