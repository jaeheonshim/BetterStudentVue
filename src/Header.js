import { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AppContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);

    const logout = () => {
        setAppState({});
        navigate("/login");
    }

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    BSV - BetterStudentVue
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link href="/" active={location.pathname == "/"}>Gradebook</Nav.Link>
                        <Nav.Link href="/schedule" active={location.pathname == "/schedule"}>Schedule</Nav.Link>
                    </Nav>
                    {appState.id &&
                        <Button onClick={logout} variant="outline-primary">Logout</Button>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}