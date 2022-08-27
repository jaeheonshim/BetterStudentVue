import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function TOSModal() {
    const location = useLocation();
    const [tosAccepted, setTosAccepted] = useState(localStorage.getItem("bsv.tos") == "true");

    const accept = () => {
        localStorage.setItem("bsv.tos", "true");
        window.location.reload();
    }

    return (
        <Modal show={!tosAccepted && location.pathname != "/tos"} size="lg">
            <Modal.Header>
                <Modal.Title>Accept Terms of Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                In order to protect you and BetterStudentVue's developers, you must accept these Terms of Service to continue using the app.
                 <b> No policies about data privacy have changed. Your personal information is still protected and kept solely on your device.</b>
                <br />
                <p className="mt-4">Please review our terms of service here: <a href="/tos">Terms of Service</a></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={accept}>I accept the terms of service.</Button>
            </Modal.Footer>
        </Modal>
    )
}