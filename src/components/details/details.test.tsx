import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { Details } from "./details";

// si no hago esto, jest da error al testear update: "useNavigate() may be used only in
// the context of a <Router> component"
// const mockedUsedNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockedUsedNavigate,
// }));

describe("Update Component", () => {
  let preloadedState: any;

  beforeEach(() => {
    preloadedState = {
      locations: [
        {
          id: 1,
          town: "Murcia",
        },
      ],
      user: { name: "Toni" },
    };
  });
  test("should be rendered", () => {
    render(
      <Router>
        <Details />,
      </Router>
    );
    expect(screen.getAllByText(/A location in/i));
  });
  // test("when add button is pushed", () => {
  //   render(<Add />, { preloadedState });
  //   const btn = screen.getByRole("submit");
  //   userEvent.click(btn);
  //   expect(screen.getByPlaceholderText(/user name/i));
  // });
});
