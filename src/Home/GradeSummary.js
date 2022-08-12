import { Card, Row, Col, Badge } from "react-bootstrap"
import { unescapeHtml } from "../util/textUtil"

export default function GradeSummary(props) {
    return (
        <Card className="mb-2 flex-grow-1">
            <Card.Body className="p-2">
                <Row>
                    <Col xs={8}>
                        <h3 className="h6 fw-semibold mb-1">{props.Period}: {unescapeHtml(props.Title)}</h3>
                        <Badge bg="primary" style={{fontSize: "0.65em"}} className="me-2">{props.Room}</Badge>
                        <Badge bg="secondary" style={{fontSize: "0.65em"}} className="me-2">{props.Staff}</Badge>
                    </Col>
                    <Col>
                        <span className="display-6 fw-semibold float-end">{props.CalculatedScoreString}</span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}