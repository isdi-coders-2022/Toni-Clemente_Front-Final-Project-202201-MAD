import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
//import firebase from "firebase/app";
import userEvent from "@testing-library/user-event";

import { Add } from "./add";

// si no hago esto, jest da error al testear add: "useNavigate() may be used only in
// the context of a <Router> component"
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("firebase/storage", () => ({
  ...jest.requireActual("firebase/storage"),
  ref: jest.fn().mockReturnValue({}),
  uploadBytes: jest.fn().mockResolvedValue({}),
  getDownloadURL: jest.fn().mockResolvedValue("test.com/pepe.jpg"),
}));

describe("Add Component", () => {
  let preloadedState: any;

  beforeEach(() => {
    preloadedState = {
      locations: [
        {
          id: 1,
          name: "First Location",
          responsible: "Pepe",
        },
      ],
      user: { name: "Pepe" },
    };
  });
  test("should be rendered", () => {
    render(<Add />, { preloadedState });
    expect(screen.getByText(/Add location/i));
  });
  // test("when add button is pushed", () => {
  //   render(<Add />, { preloadedState });
  //   const btn = screen.getByRole("submit");
  //   userEvent.click(btn);
  //   expect(screen.getByPlaceholderText(/user name/i));
  // });
});
