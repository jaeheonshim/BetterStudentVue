import { Row, Col } from "react-bootstrap"
import { useForceUpdate } from "../util/hooks";

export default function Assignment(props) {
    const forceUpdate = useForceUpdate();

    const onEditChange = (e) => {
        props.assignment.modifiedScore = e.target.value;
        props.forceUpdate();
    }

    return (
        <div>
            <Row>
                <Col xs={8}>
                    <h3 className="h6 fw-semibold mb-0">{props.Measure}</h3>
                    <div style={{fontSize: "0.7em", lineHeight: 1.4}} className="mt-1 text-secondary">{props.Course ? props.Course + " | " : ""} {props.Type} | {props.Date}</div>
                </Col>
                <Col>
                    {props.edit ? 
                        <input type="number" className="float-end" style={{width: "5em"}} onChange={onEditChange} value={props.assignment.modifiedScore} /> :
                        <span className="display-6 float-end">{/^\+?(0|[1-9]\d*)$/.test(props.Score.split(" ")[0]) ? props.Score.split(" ")[0] : "--"}</span>
                    }
                </Col>
            </Row>
        </div>
    )
}