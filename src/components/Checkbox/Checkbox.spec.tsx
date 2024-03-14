import { render, fireEvent, cleanup } from 'solid-testing-library';
import { describe, it, expect, afterEach } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox component', () => {
  afterEach(cleanup);

  it('renders with default props', () => {
    const { getByRole } = render(() => <Checkbox />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders with custom color and theme', () => {
    const customTheme = {
      root: {
        base: 'custom-base',
        color: {
          default: 'custom-color-default',
        },
      },
    };
    const { getByRole } = render(() => <Checkbox color="default" theme={customTheme} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.className).toContain('custom-color-default');
  });

  it('toggles checked state on user interaction', async () => {
    const { getByRole } = render(() => <Checkbox />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
