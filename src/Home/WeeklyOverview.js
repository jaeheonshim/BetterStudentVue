import { Button, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssignmentList from "./AssignmentList";

export default function WeeklyOverview(props) {
    const endDate = new Date();
    endDate.setHours(0, 0, 0);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const gradebook = props.gradebook;
    if(!gradebook) return;
    let totalAssignments = [];

    for(const course of gradebook.courses) {
        const calcSummary = {};

        for(const calc of course.Marks[0].GradeCalculationSummary) {
            calcSummary[calc.Type] = parseInt(calc.Weight) / 100.0;
        }

        const weekAssignments = course.Marks[0].Assignments.filter((assignment) => {
            const dateParts = assignment.Date.split("/");
            const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
            assignment.jsDate = date;
            assignment.weight = calcSummary[assignment.Type] || 0;
            assignment.numScore = parseInt(assignment.Score.split(" ")[0]);
            console.log(assignment);
            return (date >= startDate && date <= endDate);
        });

        totalAssignments.push(...weekAssignments);
    }

    totalAssignments = totalAssignments.sort((a, b) => b.jsDate - a.jsDate);
   
    const weightedNumerator = totalAssignments.reduce((p, c) => p + c.weight * c.numScore, 0);
    const weightedDenominator = totalAssignments.reduce((p, c) => p + c.weight, 0);

    const weightedAverage = Math.round((weightedNumerator / weightedDenominator) * 10) / 10;

    return (
        <div className="pb-5">
            <div className="d-flex gap-2">
                <Button onClick={props.onClose} variant="secondary" className="mb-2" size="md"><FontAwesomeIcon icon="fa-solid fa-angle-left" /></Button>
                <Card className="mb-2 flex-grow-1">
                    <Card.Body className="p-2">
                        <Row>
                            <Col xs={8}>
                                <h3 className="h4 fw-semibold mb-1">Weekly Overview</h3>
                                <div className="h5">{startDate.getMonth() + 1}/{startDate.getDate()} - {endDate.getMonth() + 1}/{endDate.getDate()}</div>
                            </Col>
                            <Col>
                                <div className="float-end" align="center">
                                    <span className="display-4 fw-semibold text-center">{weightedAverage}*</span>
                                </div>
                            </Col>
                        </Row>
                        <div style={{lineHeight: 1.3, fontSize: "0.8rem"}}>*Weekly average: a weighted average of your assignments from the past week</div>
                    </Card.Body>
                </Card>
            </div>
            <h6 className="fw-semibold mt-4">Assignments ({totalAssignments.length})</h6>
            <hr className="mt-0" />
            <AssignmentList Assignments={totalAssignments} />
        </div>
    )
}