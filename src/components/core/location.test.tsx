import { render } from '../../redux/test.utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as actions from '../../redux/locations/action-creators';

import { Location } from './location';

// jest.mock("../../redux/locations/action-creators");

describe('Location Component', () => {
  let location: any;
  let preloadedState: any;
  console.log(actions);
  beforeEach(() => {
    location = {
      id: 1,
      title: 'First Location',
      town: 'Murcia',
      responsible: { name: 'Pepe' },
    };
    preloadedState = {
      user: {
        id: 1,
        name: 'Pepe',
        token: 'Baerer token',
      },
    };
  });
  test('should be rendered and used', () => {
    render(
      <MemoryRouter>
        <Location location={location} />
      </MemoryRouter>,
      { preloadedState }
    );
    expect(screen.getByText(/Location/i));
    expect(screen.getByText(/Murcia/i));
    expect(screen.getByAltText(/location-image/i));
    // const btn = screen.getByRole('button');
    // userEvent.click(btn);
    // TODO expect
    // const checkbox = screen.getByRole('checkbox');
    // userEvent.click(checkbox);
    // TODO expect
  });
});
