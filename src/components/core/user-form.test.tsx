import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "./user-form";

describe("UserForm Component", () => {
  let preloadedState: any;
  beforeEach(() => {
    preloadedState = {
      user: {
        isLogged: false,
      },
    };
  });
  test("should be rendered for us logging", () => {
    render(
      <UserForm
        mode={"login"}
        setShowForm={() => {
          //
        }}
      />,
      { preloadedState }
    );
    expect(screen.getAllByText(/Login/i));
  });
  test("should be rendered when user is logged", () => {
    preloadedState.user.isLogged = true;
    render(
      <UserForm
        mode={"registration"}
        setShowForm={() => {
          //
        }}
      />,
      { preloadedState }
    );
    expect(screen.getAllByText(/Register/i));
  });
});
