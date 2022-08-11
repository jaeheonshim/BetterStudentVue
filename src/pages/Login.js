import LoginForm from "../Login/LoginForm";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Login() {
    const { appState, setAppState } = useContext(AppContext);

    return (
        <Container>
            <LoginForm appState={appState} />
        </Container>
    )
}