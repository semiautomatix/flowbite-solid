import { render, cleanup, fireEvent, screen } from 'solid-testing-library';
import { jest } from '@jest/globals';
import Alert from './Alert';

describe('Alert Component', () => {
  afterEach(cleanup);

  test('renders without crashing', () => {
    render(() => <Alert />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('displays custom class when provided', () => {
    const customClass = 'my-custom-class';
    render(() => <Alert class={customClass} />);
    expect(screen.getByRole('alert')).toHaveClass(customClass);
  });

  test('renders additional content when provided', () => {
    const additionalContent = <div data-testid="additional-content">More Info</div>;
    render(() => <Alert additionalContent={additionalContent} />);
    expect(screen.getByTestId('additional-content')).toBeInTheDocument();
  });

  test('icon is displayed when provided', () => {
    const Icon = () => <svg data-testid="custom-icon"></svg>;
    render(() => <Alert icon={Icon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('calls onDismiss when the dismiss button is clicked', () => {
    const onDismissMock = jest.fn();
    render(() => <Alert onDismiss={onDismissMock} />);
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(onDismissMock).toHaveBeenCalled();
  });
});
