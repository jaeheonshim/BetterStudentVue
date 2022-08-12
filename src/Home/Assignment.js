import { Row, Col } from "react-bootstrap"

export default function Assignment(props) {
    return (
        <div>
            <Row>
                <Col xs={8}>
                    <h3 className="h6 fw-semibold mb-0">{props.Measure}</h3>
                    <div style={{fontSize: "0.7em", lineHeight: 1.4}} className="mt-1 text-secondary">{props.Course ? props.Course + " | " : ""} {props.Type} | {props.Date}</div>
                </Col>
                <Col>
                    <span className="display-6 float-end">{/^\+?(0|[1-9]\d*)$/.test(props.Score.split(" ")[0]) ? props.Score.split(" ")[0] : "--"}</span>
                </Col>
            </Row>
        </div>
    )
}