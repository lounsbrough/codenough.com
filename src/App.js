import React from 'react';
import ColorScheme from 'color-scheme';

import Logo from './components/logo/Logo';
import Letters from './components/logo/Letters';
import './css/App.scss';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      colorShowActive: false,
      hue: Math.round(Math.random() * 359)
    };
  }

  componentDidMount() {
    this.randomColorShow();

    document.addEventListener('click', (event) => this.toggleColorShow(event));
  }

  setDefaultColors() {
    document.querySelectorAll('.logo path').forEach((path, index) => {
      path.style.fill = index === 0 ? "#006680" : "#ffffff";
    });

    document.querySelectorAll('.letter path').forEach(svgPath => {
      svgPath.style.fill = "inherit"
    });

    document.querySelector('.app-header').style.backgroundColor = "#1ccbd2";
  }

  randomColorShow() {
    if (!this.state.colorShowActive) {
      this.setDefaultColors();
    } else {
      const colorScheme = this.getRandomColorScheme();
      
      const svgPaths = document.querySelectorAll('svg path');

      svgPaths.forEach((svgPath, index) => {
        svgPath.style.fill = colorScheme[index % 12];
      });
    
      document.querySelector('.app-header').style.backgroundColor = "#000000";
    }
  
    setTimeout(() => this.randomColorShow(), 20);
  }

  toggleColorShow() {
    this.setState({
      colorShowActive: !this.state.colorShowActive
    });
  }
  
  getRandomColorScheme() {
    var scheme = new ColorScheme();

    this.setState({
      hue: this.state.hue + 1 % 360
    });

    return scheme.from_hue(this.state.hue)
          .scheme('analogic')
          .variation('default')
          .web_safe(true)
          .colors();
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Logo className="logo" format="fillWhite" height="500" width="80%" />
          <Letters />
        </header>
      </div>
    );
  }
}

export default App;
