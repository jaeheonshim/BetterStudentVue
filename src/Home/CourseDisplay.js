import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import AssignmentList from "./AssignmentList";
import GradeSummary from "./GradeSummary";

export default function CourseDisplay(props) {
    return (
        <div>
            <div className="d-flex gap-2">
                <Button onClick={props.onClose} variant="secondary" className="mb-2" size="md"><FontAwesomeIcon icon="fa-solid fa-angle-left" /></Button>
                <GradeSummary Period={props.Course.Period} Title={props.Course.Title} Room={props.Course.Room} Staff={props.Course.Staff} CalculatedScoreString={props.Mark.CalculatedScoreString} />
            </div>
            <h6 className="fw-semibold mt-4">Assignments ({props.Mark.Assignments.length})</h6>
            <hr className="mt-0" />
            <AssignmentList Assignments={props.Mark.Assignments} />
        </div>
    )
}