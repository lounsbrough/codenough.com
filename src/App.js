import React from 'react';

import Logo from './components/logo/Logo';
import Letters from './components/logo/Letters';
import './css/App.scss';

const touchHandler = () => {
  document.querySelector('body').classList.toggle('rotation-enabled');
};

const orientationHandler = (e) => {
  var orientation = window.screen.msOrientation || window.screen.mozOrientation || (window.screen.orientation || {}).type;

  let rotatableBody;

  if (orientation === 'portrait-primary') {
    rotatableBody = document.querySelector(".rotation-enabled");
  }

  if (!rotatableBody) {
    document.querySelector("body").style.transform = "";
    return;
  }

  rotatableBody.style.transform = `
    rotateZ(${e.alpha - 90}deg)
    rotateX(${e.beta + 270}deg)
    rotateY(${-e.gamma}deg)`;
};

class App extends React.Component {
  componentDidMount() {
    if (window.DeviceOrientationEvent !== undefined) {
      window.addEventListener("deviceorientation", orientationHandler, true);
    }

    window.addEventListener("touchstart", touchHandler);
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Logo className="logo" format="fillAndOutlineWhite" height="500" width="80%" />
          <Letters />
        </header>
      </div>
    );
  }
}

export default App;
