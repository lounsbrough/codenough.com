import React from 'react';
import {Helmet} from 'react-helmet';
import netlifyIdentity from 'netlify-identity-widget';
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes
} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowDown, faCloud} from '@fortawesome/free-solid-svg-icons';

import StrangerThingsSocketContext, {StrangerThingsSocket} from './contexts/StrangerThingsSocketContext';
import InternalPageLayout from './components/InternalPageLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import SkydivingGame from './components/SkydivingGame';
import StrangerThings from './components/stranger-things/StrangerThings';

library.add(faArrowDown, faCloud);

const App = () =>
    <StrangerThingsSocketContext.Provider value={StrangerThingsSocket}>
        <Helmet>
            <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat&display=swap" rel="stylesheet"></link>
        </Helmet>
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/login" element={<InternalPageLayout pageTitle="Login"><LoginPage /></InternalPageLayout>} />
                <Route path="/skydiving" element={<SkydivingGame />} />
                <Route path="/stranger-things" element={<StrangerThings />} />
                <Route path="/create-invoice" element={<InternalPageLayout pageTitle="Create Invoices"><CreateInvoicePage /></InternalPageLayout>} />
            </Routes>
        </Router>
    </StrangerThingsSocketContext.Provider>;

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                netlifyIdentity.currentUser() ? (
                    <Component {...props} />
                ) : (
                        <Navigate
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