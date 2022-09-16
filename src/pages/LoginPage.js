import React, {useState} from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import {
    Navigate,
    useSearchParams
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

function LoginPage() {
    const loggedInUser = netlifyIdentity.currentUser();
    
    const [searchParams] = useSearchParams();

    const redirectTo = searchParams.get('redirect') ?? '/create-invoice';

    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const login = () => {
        netlifyAuth.authenticate(() => {
            console.log('User authenticated, will redirect');
            setRedirectToReferrer(true);
        });
    };

    if (loggedInUser && redirectToReferrer) {
        console.log('Redirecting now');
        return <Navigate to={redirectTo} />;
    }

    return (
        <div>
            <p>You must log in to see internal pages</p>
            <Button color="primary" onClick={login}>Log in</Button>
        </div>
    );
}

export default LoginPage;
