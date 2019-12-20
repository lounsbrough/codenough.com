import React from 'react';
import {Helmet} from 'react-helmet';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import './css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat&display=swap" rel="stylesheet"></link>
        </Helmet>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route path="/create-invoice" component={CreateInvoicePage} />
        </Router>
      </>
    );
  }
}

export default App;
