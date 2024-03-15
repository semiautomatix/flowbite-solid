import { render, screen, cleanup } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Textarea } from './Textarea';

describe.concurrent('Components / Textarea', () => {
  afterEach(cleanup);
  describe.concurrent('A11y', () => {
    it('should have role="textbox" by default', () => {
      render(<Textarea />);
      const textArea = screen.getByRole('textbox');

      expect(textArea).toBeInTheDocument();
    });
  });
});
