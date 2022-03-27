import React from 'react';
import { render } from './redux/test.utils.js';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(getByText(/LOGIN/i)).toBeInTheDocument();
});
