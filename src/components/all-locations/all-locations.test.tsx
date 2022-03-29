import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import { getAll } from "../../services/api";
import { MemoryRouter as Router } from "react-router-dom";
import { AllLocations } from "./all-locations";
import { AxiosResponse } from "axios";

// Moqueamos getAll de la api, que extrae todas las locations que tengamos almacenadas.
jest.mock("../../services/api");
const mockedGetAll = getAll as jest.Mock<Promise<AxiosResponse<any, any>>>;

describe("All-locations Component", () => {
  let mockLocations: any;

  // Moqueamos tres posibles localizaciones
  beforeEach(() => {
    mockLocations = {
      data: [
        { id: 1, text: "Test Location 1" },
        { id: 2, text: "Test Location 2" },
        { id: 3, text: "Test Location 3" },
      ],
    };
    // ejecutamos nuestro moqueo del getAll con las localizaciones para que las muestre.
    mockedGetAll.mockResolvedValue(mockLocations);
  });

  test("should be rendered", async () => {
    await render(
      <Router>
        <AllLocations />,
      </Router>
    );
    await expect(screen.getAllByText(/A location in/i)).toHaveLength(3);
  });
});
