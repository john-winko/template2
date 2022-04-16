import {Link, Outlet} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import { ShowLoginLogout} from "../components/Login";


function Layout() {
    const linkStyle = {color: 'inherit', textDecoration: 'inherit', marginLeft:"1rem"}

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand><Link to={"/"} style={linkStyle}>App Name </Link></Navbar.Brand>
                    <Nav><Link to={"/public"} style={linkStyle}>Public </Link></Nav>
                    <Nav><Link to={"/protected"} style={linkStyle}>Protected </Link></Nav>
                    <Nav><Link to={"/notes"} style={linkStyle}>Notes </Link></Nav>
                    <Nav className="me-auto my-2 my-lg-0" style={{maxHeight: "100px"}} navbarScroll></Nav>
                    <ShowLoginLogout/>
                </Container>
            </Navbar>
            {/*Outlet renders the child routes*/}
            <Outlet/>
        </div>
    );
}

export default Layout