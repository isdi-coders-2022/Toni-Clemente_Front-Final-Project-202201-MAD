import { render } from "../../redux/test.utils.js";
import { screen } from "@testing-library/react";
import { UserForm } from "./user-form";
import userEvent from "@testing-library/user-event";

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
  test("when cancel button is pushed after having pushed the register button", () => {
    preloadedState.user.isLogged = false;
    render(
      <UserForm
        mode={"registration"}
        setShowForm={() => {
          //
        }}
      />,
      { preloadedState }
    );
    const btn = screen.getByRole("cancel-button");
    userEvent.click(btn);
    expect(screen.getByText(/register/i));
  });
  test("when cancel button is pushed after having pushed the login button", () => {
    preloadedState.user.isLogged = false;
    render(
      <UserForm
        mode={"login"}
        setShowForm={() => {
          //
        }}
      />,
      { preloadedState }
    );
    const btn = screen.getByRole("cancel-button");
    userEvent.click(btn);
    expect(screen.getByText(/login/i));
  });
});
