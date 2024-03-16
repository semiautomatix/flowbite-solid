import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Flowbite } from '../Flowbite';
import { DarkThemeToggle } from './DarkThemeToggle';

describe('Dark theme toggle', () => {
  it('should toggle the theme when `Space` is pressed', async () => {
    render(() => (
      <Flowbite>
        <DarkThemeToggle />
      </Flowbite>
    ));

    await fireEvent.tab(screen.getByTestId('dark-theme-toggle'));
    await fireEvent.keyboard(screen.getByTestId('dark-theme-toggle'), { key: ' ', code: 'Space' });

    expect(screen.queryByLabelText('Currently light mode')).toHaveAttribute('data-active', 'false');
    expect(screen.queryByLabelText('Currently dark mode')).toHaveAttribute('data-active', 'true');
  });
});
