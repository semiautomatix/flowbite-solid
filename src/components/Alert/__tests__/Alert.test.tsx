import { render, fireEvent, cleanup } from 'solid-testing-library';
import { Alert } from '../Alert';

describe('Alert', () => {
  afterEach(cleanup);

  test('renders without crashing', () => {
    const { getByRole } = render(() => <Alert />);
    expect(getByRole('alert')).toBeInTheDocument();
  });

  test('applies default and custom themes', () => {
    const { rerender, container } = render(() => <Alert />);
    expect(container.firstChild).toHaveClass('info');
    const customTheme = {
      alert: {
        base: 'custom-base',
        color: {
          info: 'custom-info',
        },
      },
    };
    rerender(() => <Alert theme={customTheme} />);
    expect(container.firstChild).toHaveClass('custom-info');
  });

  test('displays an icon when icon prop is provided', () => {
    const MockIcon = () => <svg data-testid="mock-icon"></svg>;
    const { getByTestId } = render(() => <Alert icon={MockIcon} />);
    expect(getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('displays additional content when additionalContent prop is provided', () => {
    const additionalContent = <div data-testid="additional-content">More Info</div>;
    const { getByTestId } = render(() => <Alert additionalContent={additionalContent} />);
    expect(getByTestId('additional-content')).toBeInTheDocument();
  });

  test('dismiss button calls onDismiss when clicked', () => {
    const onDismissMock = jest.fn();
    const { getByLabelText } = render(() => <Alert onDismiss={onDismissMock} />);
    fireEvent.click(getByLabelText('Dismiss'));
    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });
});
