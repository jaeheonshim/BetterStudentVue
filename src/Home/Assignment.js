import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap"
import { useForceUpdate } from "../util/hooks";

export default function Assignment(props) {
    const forceUpdate = useForceUpdate();

    const onEditChange = (e) => {
        props.assignment.modifiedScore = e.target.value == "" ? -1 : e.target.value;
        props.forceUpdate();
    }

    const reset = () => {
        props.assignment.modifiedScore = /^\+?(0|[1-9]\d*)$/.test(props.assignment.Score.split(" ")[0]) ? parseInt(props.assignment.Score.split(" ")[0]) : -1;
        props.forceUpdate();
    }

    return (
        <div>
            <Row>
                <Col xs={8}>
                    <h3 className="h6 fw-semibold mb-0">{props.Measure}</h3>
                    <div style={{fontSize: "0.7em", lineHeight: 1.4}} className="mt-1 text-secondary">{props.Course ? props.Course + " | " : ""} {props.Type} | {props.Date}</div>
                </Col>
                <Col className="d-flex justify-content-end gap-2">
                    {props.edit ? 
                        <>
                            <Button onClick={reset} size="sm" variant="outline-secondary"><FontAwesomeIcon icon="fas fa-undo" /></Button>
                            <input type="number" className="float-end" style={{width: "5em"}} onChange={onEditChange} value={props.assignment.modifiedScore == -1 ? "" : props.assignment.modifiedScore} />
                        </> :
                        <div className="display-6 align-self-end">{/^\+?(0|[1-9]\d*)$/.test(props.Score.split(" ")[0]) ? props.Score.split(" ")[0] : "--"}</div>
                    }
                </Col>
            </Row>
        </div>
    )
}