import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer

import { locationsReducer } from './locations/locations-reducers';
import { userReducer } from './user/user.reducer';

function render(
  ui: any,

  {
    preloadedState: any,
    store = configureStore({
      reducer: {
        locations: locationsReducer,
        user: userReducer,
      },
      preloadedState: any,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: any }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
