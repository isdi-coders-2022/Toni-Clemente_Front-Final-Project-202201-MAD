import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserForm } from "./user-form";
import * as actions from "../../redux/user/action-creators";
import { store } from "../../redux/store"; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

import "./user-buttons.scss";

export function UserButtons() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = () => {
    if (user.isLogged) {
      dispatch(actions.logout());
    } else {
      setShowLogin(true);
    }
  };

  const handleRegistration = () => {
    setShowRegistration(true);
  };

  return (
    <div>
      {showRegistration ||
        (!showLogin && (
          <button
            role="login-button"
            className="login-button"
            onClick={handleLogin}
          >
            {user.isLogged ? "Logout" : "Login"}
          </button>
        ))}
      {showRegistration ||
        (!showLogin && !user.isLogged && (
          <button
            className="register-button"
            role="register-button"
            onClick={handleRegistration}
          >
            Register
          </button>
        ))}
      {showLogin && <UserForm setShowForm={setShowLogin} mode="login" />}
      {showRegistration && (
        <UserForm setShowForm={setShowRegistration} mode="registration" />
      )}
    </div>
  );
}
