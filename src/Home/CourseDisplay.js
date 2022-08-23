import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import AssignmentList from "./AssignmentList";
import GradeSummary from "./GradeSummary";

export default function CourseDisplay(props) {
    return (
        <div className="pb-5">
            <div className="d-flex gap-2">
                <Button onClick={props.onClose} variant="secondary" className="mb-2" size="md"><FontAwesomeIcon icon="fa-solid fa-angle-left" /></Button>
                <GradeSummary Period={props.Course.Period} Title={props.Course.Title} Room={props.Course.Room} Staff={props.Course.Staff} CalculatedScoreString={props.Mark.CalculatedScoreString} />
            </div>
            <div className="d-flex mt-4 mb-2">
                <h6 className="fw-semibold mt-0 align-self-center">Assignments ({props.Mark.Assignments.length})</h6>
                <Button onClick={props.toggleEdit} style={{marginLeft: "auto"}} variant={props.edit ? "success" : "outline-secondary"} size="sm" active={props.edit}><FontAwesomeIcon icon="fa-solid fa-calculator" /></Button>
            </div>
            <hr className="mt-0" />
            <AssignmentList edit={props.edit} Assignments={props.Mark.Assignments} />
        </div>
    )
}