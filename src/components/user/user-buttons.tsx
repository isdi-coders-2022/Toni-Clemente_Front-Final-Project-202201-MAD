import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserForm } from './user-form';
import * as actions from '../../redux/user/action-creators';
import { store } from '../../redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

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
      {!showLogin && (
        <button onClick={handleLogin}>
          {user.isLogged ? 'Logout' : 'Login'}
        </button>
      )}
      {!showLogin && !user.isLogged && (
        <button onClick={handleRegistration}>Registration</button>
      )}
      {showLogin && <UserForm setShowForm={setShowLogin} mode="login" />}
      {showRegistration && (
        <UserForm setShowForm={setShowRegistration} mode="registration" />
      )}
    </div>
  );
}
