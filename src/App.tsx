import React from 'react';
import { useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { ToDo } from './components/todo/todo';
import { UserButtons } from './components/user/user-buttons';
import { store } from './redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

function App() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="App">
      <header className="App-header">
        <header>
          <h1>Todas las ubicaciones</h1>
          <UserButtons />
        </header>

        <img src={logo} className="App-logo" alt="logo" />

        <ToDo />
      </header>
    </div>
  );
}

export default App;
