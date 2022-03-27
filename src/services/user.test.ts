import axios from 'axios';
import * as user from './user';
jest.mock('axios');

describe('Given the service user', () => {
  test('When login is running, axios.post should be called', () => {
    user.login(user);
    expect(axios.post).toHaveBeenCalled();
  });
  test('When login is running, axios.post should be called', () => {
    user.register(user);
    expect(axios.post).toHaveBeenCalled();
  });
});
