import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup, fireEvent, screen } from "@solidjs/testing-library";
import { Alert } from "./Alert";

describe("Alert Component", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    render(() => <Alert />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("displays custom class when provided", () => {
    const customClass = "my-custom-class";
    render(() => <Alert class={customClass} />);
    expect(screen.getByRole("alert")).toHaveClass(customClass);
  });

  it("renders additional content when provided", () => {
    const additionalContent = (
      <div data-testid="additional-content">More Info</div>
    );
    render(() => <Alert additionalContent={additionalContent} />);
    expect(screen.getByTestId("additional-content")).toBeInTheDocument();
  });

  it("icon is displayed when provided", () => {
    const Icon = () => <svg data-testid="custom-icon"></svg>;
    render(() => <Alert icon={Icon} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("calls onDismiss when the dismiss button is clicked", () => {
    const onDismissMock = vi.fn();
    render(() => <Alert onDismiss={onDismissMock} />);
    fireEvent.click(screen.getByLabelText("Dismiss"));
    expect(onDismissMock).toHaveBeenCalled();
  });
});
