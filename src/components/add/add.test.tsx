import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";
import firebase from "firebase/app";
import userEvent from "@testing-library/user-event";

import { Add } from "./add";

// si no hago esto, jest da error al testear add: "useNavigate() may be used only in
// the context of a <Router> component"
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
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
    expect(screen.getByText(/the beauty/i));
  });
  test("when add button is pushed", () => {
    render(<Add />, { preloadedState });
    const btn = screen.getByRole("submit");
    userEvent.click(btn);
    expect(screen.getByPlaceholderText(/user name/i));
  });
});
