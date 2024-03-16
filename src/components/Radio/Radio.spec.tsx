import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Flowbite, type CustomFlowbiteTheme } from '../Flowbite';
import { Radio } from './Radio';

describe.concurrent('Components / Radio', () => {
  describe.concurrent('A11y', () => {
    it('should have role="radio" by default', () => {
      const { getByRole } = render(() => <Radio />);
      const radio = getByRole('radio');

      expect(radio).toBeInTheDocument();
    });
  });

  describe('Theme', () => {
    it('should use custom `base` classes', () => {
      const theme: CustomFlowbiteTheme = {
        radio: {
          root: {
            base: 'bg-yellow-400 dark:bg-yellow-40',
          },
        },
      };
      const { container } = render(() => <Flowbite theme={{ theme }}>
        <Radio />
      </Flowbite>);
      const radio = () => container.querySelector('input[type="radio"]');

      expect(radio()).toHaveClass('bg-yellow-400 dark:bg-yellow-40');
    });
  });
});

const radio = () => screen.getByRole('radio');
