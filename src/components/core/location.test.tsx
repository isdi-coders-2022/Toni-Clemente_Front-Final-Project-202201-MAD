import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import * as actions from "../../redux/locations/action-creators";

import { Location } from "./location";

describe("Location Component", () => {
  let location: any;

  beforeEach(() => {
    location = {
      id: 1,
      title: "First Location",
      town: "Murcia",
      responsible: { name: "Toni" },
    };
  });
  test("should be rendered and used", () => {
    render(
      <MemoryRouter>
        <Location location={location} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Location/i));
    expect(screen.getByText(/Murcia/i));
    expect(screen.getByAltText(/location-image/i));
  });
});
