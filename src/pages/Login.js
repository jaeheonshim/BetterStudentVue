import LoginForm from "../Login/LoginForm";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../App";
import Header from "../Header";

export default function Login() {
    const { appState, setAppState } = useContext(AppContext);

    return (
        <>
        <Header />
        <Container>
            <LoginForm appState={appState} />
        </Container>
        </>
    )
}