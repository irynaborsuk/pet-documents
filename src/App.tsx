import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import DrawerMenuLeft from './components/DrawerMenuLeft';

function App() {
  return (
    <div className="App">
        <DrawerMenuLeft/>

        This is a welcome page with some common information about app/site, with header, footer, main, side part, some photo, facts
    </div>
  );
}

export default App;
