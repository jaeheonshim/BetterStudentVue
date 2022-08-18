import { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { AppContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { useOnlineStatus } from "./util/OnlineStatusProvider";

export default function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const isOnline = useOnlineStatus();
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
                    { !isOnline && <div style={{fontSize: "0.65em", margin: 0}}><Badge bg="warning">Offline mode</Badge></div> }
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