import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ISignedInLinkProps {
  signOut?: () => void;
}

const SignedInLinksComp = (props: ISignedInLinkProps): JSX.Element => {
  const { signOut } = { ...props };
  return (
    <>
      <Nav.Link>
        <Link to="/myTeam">My Team</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/hostMatch">Host Match</Link>
      </Nav.Link>
    </>
  );
};

export { SignedInLinksComp as SignedInLinks };
