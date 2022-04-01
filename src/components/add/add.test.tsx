import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import { set } from "../../services/api";
import userEvent from "@testing-library/user-event";
import { AxiosResponse } from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Add } from "./add";
import { AllLocations } from "../all-locations/all-locations";

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

// Moqueamos getAll de la api, que extrae todas las locations que tengamos almacenadas.
jest.mock("../../services/api");
const mockedSet = set as jest.Mock<Promise<AxiosResponse<any, any>>>;

describe("Add Component", () => {
  let mockLocation: any;
  let preloadedState: any;
  beforeEach(() => {
    preloadedState = {
      user: {
        isLogged: false,
      },
    };
    mockLocation = {
      data: { id: 1, town: "cehegin", photo: "foto" },
    };
  });

  // ejecutamos nuestro moqueo del getAll con las localizaciones para que las muestre.
  mockedSet.mockResolvedValue(mockLocation);

  //let preloadedState: any;

  // beforeEach(() => {
  //   preloadedState = {
  //     locations: [
  //       {
  //         id: 1,
  //         name: "First Location",
  //         responsible: "Pepe",
  //       },
  //     ],
  //     user: { name: "Pepe" },
  //   };
  // });

  test("should be rendered", async () => {
    await render(<Add />);
    expect(screen.getByText(/Add location/i));
  });
  // test("when add button is pushed", async () => {
  //   preloadedState.user.isLogged = true;
  //   await render(<Add />, { preloadedState });

  //   const btn = screen.getByRole("submit");
  //   userEvent.click(btn);

  //   expect(screen.getByText(/A location in cehegin/i));
  // });
});
