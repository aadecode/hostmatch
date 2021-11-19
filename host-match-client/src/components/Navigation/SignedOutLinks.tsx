import React from "react";
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signInWithFb } from '../../config/fbAuthConfig';

interface ISignedOutLinksProps {
    signIn: () => void;
}

const SignedOutLinks = (props: ISignedOutLinksProps): JSX.Element => {
    const { signIn } = { ...props };
    return (
        <>  
            {/* <Nav.Link onClick={signIn}>Sign in with Facebook</Nav.Link> */}
        </>
    )
}

export { SignedOutLinks };