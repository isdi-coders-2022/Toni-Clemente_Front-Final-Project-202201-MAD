import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Details } from './details';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

describe('Given details component', () => {
  describe('When it loads in details/:id', () => {
    test('It should render id', () => {
      render(
        <MemoryRouter initialEntries={['/details/1']}>
          <Provider store={store}>
            <Routes location="/details/1">
              <Route path="/details/:town" element={<Details />} />
            </Routes>
          </Provider>
        </MemoryRouter>
      );

      expect(screen.getByText(/A location in 1/i)).toBeInTheDocument();
    });
  });
});
