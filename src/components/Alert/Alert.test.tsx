import { render, cleanup, fireEvent } from 'solid-testing-library';
import Alert from './Alert.tsx';

const mockGetTheme = jest.fn().mockImplementation(() => ({
  alert: {
    base: 'alert-base',
    wrapper: 'alert-wrapper',
    icon: 'alert-icon',
    closeButton: {
      base: 'close-button-base',
      icon: 'close-button-icon',
    },
    color: {
      info: 'alert-info',
      warning: 'alert-warning',
      success: 'alert-success',
    },
    rounded: 'alert-rounded',
    borderAccent: 'alert-border-accent',
  },
}));

jest.mock('../../theme-store', () => ({
  getTheme: mockGetTheme,
}));

describe('Alert Component', () => {
  afterEach(cleanup);

  it('renders with default props', () => {
    const { getByTestId } = render(() => <Alert />);
    expect(getByTestId('flowbite-alert-wrapper')).toBeTruthy();
    expect(getByTestId('flowbite-alert-wrapper')).toHaveClass('alert-base alert-info alert-rounded');
  });

  it('applies correct classes for color prop', () => {
    const { rerender, container } = render(() => <Alert color="warning" />);
    expect(container.firstChild).toHaveClass('alert-warning');
    rerender(() => <Alert color="success" />);
    expect(container.firstChild).toHaveClass('alert-success');
  });

  it('applies rounded styling based on rounded prop', () => {
    const { rerender, container } = render(() => <Alert rounded={false} />);
    expect(container.firstChild).not.toHaveClass('alert-rounded');
    rerender(() => <Alert rounded />);
    expect(container.firstChild).toHaveClass('alert-rounded');
  });

  it('renders dismiss button when onDismiss is a function', () => {
    const onDismissMock = jest.fn();
    const { getByLabelText } = render(() => <Alert onDismiss={onDismissMock} />);
    const dismissButton = getByLabelText('Dismiss');
    expect(dismissButton).toBeInTheDocument();
    fireEvent.click(dismissButton);
    expect(onDismissMock).toHaveBeenCalled();
  });

  it('does not render dismiss button when onDismiss is false', () => {
    const { queryByLabelText } = render(() => <Alert onDismiss={false} />);
    expect(queryByLabelText('Dismiss')).toBeNull();
  });

  it('renders additional content when provided', () => {
    const additionalContent = <div data-testid="additional-content">More Info</div>;
    const { getByTestId } = render(() => <Alert additionalContent={additionalContent} />);
    expect(getByTestId('additional-content')).toBeInTheDocument();
  });

  it('applies custom themes correctly', () => {
    mockGetTheme.mockImplementationOnce(() => ({
      alert: {
        base: 'custom-alert-base',
        color: {
          info: 'custom-alert-info',
        },
      },
    }));
    const { container } = render(() => <Alert />);
    expect(container.firstChild).toHaveClass('custom-alert-base custom-alert-info');
  });
});
