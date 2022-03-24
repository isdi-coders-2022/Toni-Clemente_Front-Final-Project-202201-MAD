import * as action from './action-creators';

describe('Given the function login', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const user = { cosicas: 'estas' };

      expect(action.login(user)).toEqual({
        payload: { cosicas: 'estas' },
        type: '@user/login',
      });
    });
  });
});

describe('Given the function logout', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      expect(action.logout()).toEqual({
        type: '@user/logout',
      });
    });
  });
});
