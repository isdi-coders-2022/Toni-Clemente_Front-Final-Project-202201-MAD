import { render } from '../../redux/test.utils.js';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserButtons } from './user-buttons';

describe('UserButtons Component', () => {
  let preloadedState: any;
  beforeEach(() => {
    preloadedState = {
      user: {
        isLogged: false,
      },
    };
  });
  test('should be rendered when user is not logged', () => {
    render(<UserButtons />, { preloadedState });
    expect(screen.getByText(/Login/i));
    expect(screen.getByText(/Register/i));
  });
  test('should be rendered when user is logged', () => {
    preloadedState.user.isLogged = true;
    render(<UserButtons />, { preloadedState });
    expect(screen.getByText(/Logout/i));
  });
  test('when register button is pushed', () => {
    //preloadedState.user.isLogged = true;
    render(<UserButtons />, { preloadedState });
    const btn = screen.getByRole('register-button');

    userEvent.click(btn);
    expect(screen.getByPlaceholderText(/user name/i));
  });
  test('when login button is pushed', () => {
    preloadedState.user.isLogged = false;
    render(<UserButtons />, { preloadedState });
    const btn = screen.getByRole('login-button');

    userEvent.click(btn);
    expect(screen.getByPlaceholderText(/user name/i));
  });

  // TODO expect
  // const checkbox = screen.getByRole('checkbox');
  // userEvent.click(checkbox);
  // TODO expect
});
