import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Menu } from './menu';

describe('Given the component Menu', () => {
  describe('When rendering it', () => {
    test('Then it should appear on the screen', () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Menu />} />
            </Routes>
          </Provider>
        </MemoryRouter>
      );
      expect(screen.getAllByRole('menuitem')).toHaveLength(3);
    });
  });
});
