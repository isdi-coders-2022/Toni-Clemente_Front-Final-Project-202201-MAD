import * as action from "./action-creators";
import { userReducer } from "./user.reducer";

let mockState: any = [];
let mockInitialState: any = [];

describe("Given the function LocationsReducer", () => {
  beforeEach(() => {
    mockState = mockState = [{ id: 1, location: "cehegin" }];
    mockInitialState = mockState = {
      token: "",
      name: "",
      id: "",
      isLogged: false,
    };
  });
  describe("When passing a state login", () => {
    test("then it should return the state updated", () => {
      const currentState = userReducer(
        mockState,
        action.login({
          id: 1,
          location: "cehegin",
          isLogged: true,
        })
      );

      expect(currentState).toEqual({
        id: 1,
        location: "cehegin",
        isLogged: true,
      });
    });
  });
  describe("When passing a state logout", () => {
    test("then it should return the state updated", () => {
      const currentState = userReducer(mockState, action.logout());
      expect(currentState).toEqual({
        token: "",
        name: "",
        id: "",
        isLogged: false,
      });
    });
  });
  describe("When no login or logout button has been pushed", () => {
    test("then it should return the state in its default value", () => {
      const currentState = userReducer(mockState, mockInitialState);
      expect(currentState).toEqual({
        token: "",
        name: "",
        id: "",
        isLogged: false,
      });
    });
  });
});
