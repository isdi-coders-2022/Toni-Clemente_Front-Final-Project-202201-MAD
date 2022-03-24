import * as action from './action-creators';

describe('Given the function createLocation', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const location = { cosicas: 'estas' };

      expect(action.createLocation(location)).toEqual({
        location: { cosicas: 'estas' },
        type: '@location/add',
      });
    });
  });
});

describe('Given the function removeLocation', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const location = { cosicas: 'estas' };

      expect(action.removeLocation(location)).toEqual({
        location: { cosicas: 'estas' },
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
        book: { cosicas: 'estas' },
        type: '@location/update',
      });
    });
  });
});
describe('Given the function loadLocations', () => {
  describe('Whem importing it', () => {
    test('then, it should work like this', () => {
      const locations = { cosicas: 'estas' };

      expect(action.loadBooks(locations)).toEqual({
        locations: { cosicas: 'estas' },
        type: '@books/load',
      });
    });
  });
});
