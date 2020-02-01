import React from 'react';
import { Helmet } from 'react-helmet';
import netlifyIdentity from 'netlify-identity-widget';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import InternalPageLayout from './components/InternalPageLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import PlatformGame from './components/PlatformGame';

const App = () => {
    return (
        <>
            <Helmet>
                <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat&display=swap" rel="stylesheet"></link>
            </Helmet>
            <Router>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={(props) => <InternalPageLayout pageTitle="Login"><LoginPage {...props} /></InternalPageLayout>} />
                <Route path="/game" component={(props) => <PlatformGame {...props} />} />
                <PrivateRoute path="/create-invoice" component={(props) => <InternalPageLayout pageTitle="Create Invoices"><CreateInvoicePage {...props} /></InternalPageLayout>} />
            </Router>
        </>
    );
};

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                netlifyIdentity.currentUser() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default App;