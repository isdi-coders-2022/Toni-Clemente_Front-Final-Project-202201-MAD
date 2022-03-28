import { render } from '../../redux/test.utils.js';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Add } from './add';

describe('Add Component', () => {
  let preloadedState: any;

  beforeEach(() => {
    preloadedState = {
      locations: [
        {
          id: 1,
          name: 'First Location',
          responsible: 'Pepe',
        },
      ],
      user: { name: 'Pepe' },
    };
  });
  test('should be rendered', () => {
    render(<Add />, { preloadedState });
    expect(screen.getByPlaceholderText(/coment/i));
    expect(screen.getByPlaceholderText(/loca/i));
  });
  test('when add button is pushed', () => {
    render(<Add />, { preloadedState });
    const btn = screen.getByRole('submit');
    userEvent.click(btn);
    expect(screen.getByPlaceholderText(/user name/i));
  });
});
