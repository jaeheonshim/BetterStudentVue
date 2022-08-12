import { useContext } from "react";
import { Button } from "react-bootstrap";
import { AppContext } from "./App";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);

    const logout = () => {
        setAppState({});
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="/">
                Home
                <div style={{fontSize: "0.55em"}}>BSV - BetterStudentVue</div>
            </a>
            {appState.id &&
                <Button onClick={logout} variant="outline-primary">Logout</Button>
            }
        </nav>
    )
}