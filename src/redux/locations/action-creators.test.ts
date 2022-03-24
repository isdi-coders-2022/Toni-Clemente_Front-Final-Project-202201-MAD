import * as action from './action-creators';

describe('Given the function createLocation', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const location = { cosicas: 'estas' };

      expect(action.createLocation(location)).toEqual({
        payload: { cosicas: 'estas' },
        type: '@location/create',
      });
    });
  });
});

describe('Given the function removeLocation', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const location = { cosicas: 'estas' };

      expect(action.removeLocation(location)).toEqual({
        payload: { cosicas: 'estas' },
        type: '@location/remove',
      });
    });
  });
});

describe('Given the function updateLocation', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const location = { cosicas: 'estas' };

      expect(action.updateLocation(location)).toEqual({
        payload: { cosicas: 'estas' },
        type: '@location/update',
      });
    });
  });
});
describe('Given the function loadLocations', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const locations = { cosicas: 'estas' };

      expect(action.loadLocations(locations)).toEqual({
        payload: { cosicas: 'estas' },
        type: '@locations/load',
      });
    });
  });
});
