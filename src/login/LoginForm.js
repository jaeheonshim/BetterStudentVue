import { Button, Modal } from "react-bootstrap";
import { useContext, useState } from "react"
import "../data/Gradebook"
import { getStudentInfo } from "../data/Gradebook"
import { AppContext } from "../App";

export default function LoginForm() {
    const [loginFormInfo, setLoginFormInfo] = useState({
        id: "",
        password: ""
    });

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [errorText, setErrorText] = useState();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState();

    const { appState, setAppState } = useContext(AppContext);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

    const handleChange = (event) => {
        setLoginFormInfo({...loginFormInfo, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setSubmitDisabled(true);
        setErrorText();
        
        getStudentInfo(loginFormInfo.id, loginFormInfo.password).then((data) => {
            setName(data.name);
            handleOpen();
        }).catch((error) => {
            setErrorText("Error logging in. Ensure that your credentials were entered correctly.");
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

            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Login</h3>
                    <p>Use your GCPS credentials</p>
                    <form onChange={handleChange}>
                        <div class="mb-3">
                            <label for="studentID" className="form-label">Student ID</label>
                            <input type="text" className="form-control" id="studentID" name="id" value={loginFormInfo.id}></input>
                        </div>
                        <div class="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={loginFormInfo.password}></input>
                        </div>
                        <p className="text-danger">{errorText}</p>
                        <button type="submit" onClick={onSubmit} class="btn btn-primary" disabled={submitDisabled}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}