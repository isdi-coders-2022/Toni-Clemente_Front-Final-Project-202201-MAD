import * as action from './action-creators';
import { userReducer } from './user.reducer';

let mockState: any = [];

describe('Given the function LocationsReducer', () => {
  beforeEach(() => {
    mockState = mockState = [{ id: 1, location: 'cehegin' }];
  });

  describe('When passing a state and the update function', () => {
    test('then it should return the state updated', () => {
      const currentState = userReducer(
        mockState,
        action.login({
          id: 1,
          location: 'cehegin',
          isLogged: true,
        })
      );

      expect(currentState).toEqual({
        id: 1,
        location: 'cehegin',
        isLogged: true,
      });
    });
  });
});
