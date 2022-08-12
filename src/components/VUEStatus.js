import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getServerStatus } from "../data/Gradebook";

export default function VUEStatus() {
    const [ stateColor, setStateColor ] = useState("#808080");
    const [ stateText, setStateText ] = useState("Checking StudentVue server...");

    useEffect(() => {
        getServerStatus().then(() => {
            setStateColor("#4BB543");
            setStateText("StudentVue server is operational");
        }).catch((error) => {
            if(error == 2) {
                // failed to connect
                setStateColor("#FC100D");
                setStateText("Failed to connect");
            } else if(error == 1) {
                // incorrect response
                setStateColor("#FC100D");
                setStateText("StudentVue server is malfunctioning");
            }
        })
    }, []);

    return (
        <Card style={{width: "20rem", marginLeft: "auto", marginRight: "auto"}}>
            <Card.Body className="fw-semibold">
                <FontAwesomeIcon style={{color: stateColor}} icon="fa-solid fa-circle" /> &nbsp;&nbsp;{stateText}
            </Card.Body>
        </Card>
    )
}