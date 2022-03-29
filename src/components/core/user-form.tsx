import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../services/user";
import * as actions from "../../redux/user/action-creators";

import "./user-form.scss";

export function UserForm({
  setShowForm,
  mode,
}: {
  setShowForm: any;
  mode: any;
}) {
  const [user, setUser] = useState({ name: "", passwd: "" });
  const dispatch = useDispatch();

  const handleChange = (ev: any) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    try {
      let result;
      if (mode.toLowerCase() === "login") {
        result = await login(user);
      } else {
        result = await register(user);
      }
      result.data.name = result.data.userName;
      delete result.data.userName;
      dispatch(actions.login({ ...result.data, isLogged: true }));
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="user name"
        value={user.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="passwd"
        placeholder="password"
        value={user.passwd}
        onChange={handleChange}
      />
      <br />

      <button
        type="submit"
        className="login-button"
        role="login-button"
        onClick={handleSubmit}
      >
        {mode.toLowerCase() === "login" ? "Login" : "Register"}
      </button>
      <button
        type="reset"
        role="cancel-button"
        className="cancel-button"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
}
