import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import {
    Redirect
} from 'react-router-dom';

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

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

export default LoginPage;