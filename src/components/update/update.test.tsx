import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";
//import firebase from "firebase/app";
import userEvent from "@testing-library/user-event";
import firebase from "@firebase/analytics";

import { Update } from "./update";

// si no hago esto, jest da error al testear update: "useNavigate() may be used only in
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

describe("Update Component", () => {
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
    render(<Update />, { preloadedState });
    expect(screen.getByText(/Update location/i));
  });
  // test("when add button is pushed", () => {
  //   render(<Add />, { preloadedState });
  //   const btn = screen.getByRole("submit");
  //   userEvent.click(btn);
  //   expect(screen.getByPlaceholderText(/user name/i));
  // });
});
