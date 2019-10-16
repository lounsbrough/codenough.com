import React from 'react';

import Logo from './components/logo/Logo';
import Letters from './components/logo/Letters';
import './css/App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header colorful-background">
        <Logo format="fillAndOutlineWhite" height="500" width="80%" />
        <Letters />
      </header>
    </div>
  );
}

export default App;
