// import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
// import PropTypes from "prop-types";
import Login from "./Login";

function AppNav({user, setUser}) {

  // keep bootstrap styling intact (no blue underline)
  const linkStyle = { color: 'inherit', textDecoration: 'inherit' }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Your App Name</Navbar.Brand>
        {/*    <Link to={"/"} style={linkStyle}>Your App Name</Link>*/}
        {/*</Navbar.Brand>*/}
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link>Your link</Nav.Link>
        </Nav>
          {/*TODO add*/}
        <Login user={user} setUser={setUser} />
      </Container>
    </Navbar>
  )
};

// AppNav.propTypes = {
//     user: PropTypes.object,
//     // user2: PropTypes.shape({username:PropTypes.string})
//     setUser: PropTypes.func
// }

export default AppNav