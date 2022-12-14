import { Button, Modal, Card, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import "../data/Gradebook";
import { getStudentInfo } from "../data/Gradebook"
import { AppContext, DebugContext } from "../App";
import { useNavigate } from "react-router-dom";
import dataflow from "./dataflow.png";

export default function LoginForm() {
    const navigate = useNavigate();

    const { appState, setAppState } = useContext(AppContext);
    const { debugState, setDebugState } = useContext(DebugContext);

    const [loginFormInfo, setLoginFormInfo] = useState({
        id: "",
        password: ""
    });

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [errorText, setErrorText] = useState();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState();

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const handleChange = (event) => {
        setLoginFormInfo({...loginFormInfo, [event.target.name]:  event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setSubmitDisabled(true);
        setErrorText();
        
        getStudentInfo(loginFormInfo.id, loginFormInfo.password).then((data) => {
            setName(data.name);
            handleOpen();
        }).catch((error) => {
            let errorText = error.message;
            if(debugState.debug) {
                errorText += ` ${error.error.name}: ${error.error.message}`;
            }

            setErrorText(errorText);
        }).finally(() => {
            setSubmitDisabled(false);
        });
    };

    const cancelLogin = () => {
        handleClose();
        setLoginFormInfo({
            id: "",
            password: ""
        });
    }

    const confirmLogin = () => {
        handleClose();
        setAppState({...appState, id: loginFormInfo.id, password: loginFormInfo.password, name: name});
        navigate("/");
    }

    return (
        <>
            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Confirm login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Is your name <b>{name}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelLogin}>No, that's somebody else</Button>
                    <Button variant="primary" onClick={confirmLogin}>Yes, that's me</Button>
                </Modal.Footer>
            </Modal>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title><h3>Login</h3></Card.Title>
                    <p>Use your GCPS credentials</p>
                    <Form onChange={handleChange}>
                        <Form.Group className="mb-3">
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="text" name="id" value={loginFormInfo.id}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={loginFormInfo.password}></Form.Control>
                        </Form.Group>
                        <p className="text-danger">{errorText}</p>
                        <Button variant="primary" type="submit" onClick={onSubmit} disabled={submitDisabled}>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mt-3 mb-3">
                <Card.Body>
                    <Card.Title><h3>Security and Privacy</h3></Card.Title>
                    <p>Your credentials <b>will never leave your device</b>. BetterStudentVue makes requests directly from the web application to the StudentVue server, with no intermediate 3rd-party involved. Your username and password are only stored on your device and never sent to any server other than the official StudentVue server. <b>Gradebook information never leaves your device.</b></p>
                    <img className="img-fluid" src={dataflow} />
                    <p>Don't just take my word for it - BetterStudentVue is completely open source (under the MIT license), and you can check the source code yourself <a href="https://github.com/jaeheonshim/BetterStudentVue">https://github.com/jaeheonshim/BetterStudentVue</a></p>
                </Card.Body>
            </Card>
        </>
    )
}