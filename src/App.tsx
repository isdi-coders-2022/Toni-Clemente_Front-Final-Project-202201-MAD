import { Routes, Route } from 'react-router-dom';
import { AllLocations } from './components/all-locations/all-locations';
import { Home } from './components/home/home';
import { Add } from './components/add/add';
import { Details } from './components/details/details';
import { Update } from './components/update/update';
import { Menu } from './components/core/menu';
//import { useSelector } from 'react-redux';
import './App.css';

import { UserButtons } from './components/core/user-buttons';
import { store } from './redux/store'; //añadido, supuestamente soluciona el problema
type RootState = ReturnType<typeof store.getState>; //añadido, supuestamente soluciona el problema

function App() {
  // const user = useSelector((state: RootState) => state.user);
  return (
    <div className="App">
      <Menu />
      <UserButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/allLocations" element={<AllLocations />} />
        <Route path="/details/:_id" element={<Details />} />
        <Route path="/update/:_id" element={<Update />} />
      </Routes>
      <header className="App-header"></header>
    </div>
  );
}

export default App;
