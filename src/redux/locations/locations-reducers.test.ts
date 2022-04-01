import * as action from "./action-creators";
import { locationsReducer } from "./locations-reducers";

let mockState: any = [];

describe("Given the function LocationsReducer", () => {
  beforeEach(() => {
    mockState = [
      { id: 1, location: "cehegin" },
      { id: 2, location: "caravaca" },
      { id: 3, location: "mula" },
    ];
  });

  describe("When passing a state and the create action", () => {
    test("Then it should return the state with the added location", () => {
      const newState = locationsReducer(
        mockState,
        action.createLocation({ id: 4, location: "bullas" })
      );

      expect(newState).toEqual([
        { id: 1, location: "cehegin" },
        { id: 2, location: "caravaca" },
        { id: 3, location: "mula" },
        { id: 4, location: "bullas" },
      ]);
    });
  });

  // describe("When passing a state and the remove action", () => {
  //   test("then it should return the state without the removed location", () => {
  //     const newState = locationsReducer(
  //       mockState,
  //       action.removeLocation({ id: 3, location: "mula" })
  //     );

  //     expect(newState).toEqual([
  //       { id: 1, location: "cehegin" },
  //       { id: 2, location: "caravaca" },
  //     ]);
  //   });
  // });

  describe("When passing a state and the load action", () => {
    test("then it should return the current state", () => {
      const newState = locationsReducer(
        mockState,
        action.loadLocations(mockState)
      );

      expect(newState).toEqual([
        { id: 1, location: "cehegin" },
        { id: 2, location: "caravaca" },
        { id: 3, location: "mula" },
      ]);
    });
  });

  describe("When passing a state and the update function", () => {
    test("then it should return the state updated", () => {
      const currentState = locationsReducer(
        mockState,
        action.updateLocation({
          id: 3,
          location: "mula",
          isVisited: true,
          rating: 3,
        })
      );

      expect(currentState).toEqual([
        { id: 1, location: "cehegin" },
        { id: 2, location: "caravaca" },
        { id: 3, location: "mula", isVisited: true, rating: 3 },
      ]);
    });
  });

  describe("When passing a state and the an unknown function", () => {
    test("then it should return the same state", () => {
      const currentState = locationsReducer(mockState, action === undefined);

      expect(currentState).toEqual([
        { id: 1, location: "cehegin" },
        { id: 2, location: "caravaca" },
        { id: 3, location: "mula" },
      ]);
    });
  });
});
