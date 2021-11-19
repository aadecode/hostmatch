import React from "react";
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Button,
  Image,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { SignedInLinks, SignedOutLinks } from ".";
import { IUserProfie } from "../../pages/UserProfile";
import { signIn, signOut } from "../../store/actions/authActions";
import { IRootReducerState } from "../../store";
import { IAuth } from "../../utilities/auth";

interface INavigationProps {
  auth: IAuth;
  user: IUserProfie;
  _signIn: () => void;
  _signOut: () => void;
}

const Navigation = (props: INavigationProps): JSX.Element => {
  const [show, setShow] = React.useState(false);
  const { auth, _signIn, user, _signOut } = { ...props };
  const toggleNav = () => setShow(!show);

  return (
    <>
      <Button variant="dark" onClick={toggleNav} className="nav-toggle-btn">
        <i className="fas fa-bars"></i>
      </Button>
      <Offcanvas.Header>
        <Offcanvas.Title>Host match</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas
        show={show}
        onHide={toggleNav}
        backdrop={false}
        scroll={true}
        className="hm-nav-offcanvas"
      >
        <Offcanvas.Body>
          <Navbar bg="dark" expand={true} variant="dark">
            <Container>
              <Nav className="me-auto" onClick={toggleNav}>
                <Nav.Link>
                  <Link to="/">Matches</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/teams">Teams</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/players">Players</Link>
                </Nav.Link>
                {!!user.uid && <SignedInLinks signOut={_signOut} />}
                {!user.uid && <SignedOutLinks signIn={_signIn} />}
              </Nav>
            </Container>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
      <div className={`hm-profile-menu`}>
        {!!user.uid ? (
          <Image
            src={user.photoURL}
            thumbnail
            className={`profile-thumbnail`}
          />
        ) : (
          <i className="fas fa-user"></i>
        )}
        <NavDropdown title="" id="basic-nav-dropdown">
          {!user.uid && (
            <NavDropdown.Item onClick={_signIn}>My profile</NavDropdown.Item>
          )}
          {!!user.uid && (
            <NavDropdown.Item>
              <Nav.Link>
                <Link to="/profile">My profile</Link>
              </Nav.Link>
            </NavDropdown.Item>
          )}
          <NavDropdown.Divider />
          {!!user.uid && (
            <NavDropdown.Item onClick={_signOut}>Sign Out</NavDropdown.Item>
          )}
          {!user.uid && (
            <NavDropdown.Item onClick={_signIn}>Sign In</NavDropdown.Item>
          )}
        </NavDropdown>
      </div>
    </>
  );
};

const mapStateToProps = (
  state: IRootReducerState
): { auth: any; user: IUserProfie } => {
  return {
    auth: state.auth,
    user: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch: any): any => {
  return {
    _signIn: () => dispatch(signIn()),
    _signOut: () => dispatch(signOut()),
  };
};

const HMNavBar: any = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export { HMNavBar };
