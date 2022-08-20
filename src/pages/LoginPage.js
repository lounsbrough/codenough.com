import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import {
    Navigate
} from 'react-router-dom';
import { Button } from 'reactstrap';

const netlifyAuth = {
    authenticate(callback) {
        netlifyIdentity.open();
        netlifyIdentity.on('login', user => {
            callback(user);
        });
    },
    signout(callback) {
        netlifyIdentity.logout();
        netlifyIdentity.on('logout', () => {
            callback();
        });
    }
};

class LoginPage extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        netlifyAuth.authenticate(() => {
            this.setState({
                redirectToReferrer: true
            });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Navigate to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <Button color="primary" onClick={this.login}>Log in</Button>
            </div>
        );
    }
}

export default LoginPage;