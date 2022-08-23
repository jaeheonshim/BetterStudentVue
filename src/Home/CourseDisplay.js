import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForceUpdate } from "../util/hooks";
import AssignmentList from "./AssignmentList";
import GradeSummary from "./GradeSummary";

export default function CourseDisplay(props) {
    const forceUpdate = useForceUpdate();

    const calculateEditedScore = () => {
        const weightedNumerator = props.Mark.Assignments.reduce((p, c) => {
            const weight = props.Course.calcSummary[c.Type] || 0;
            return c.modifiedScore == -1 ? p : p + weight * c.modifiedScore
        }, 0);

        const weightedDenominator = props.Mark.Assignments.reduce((p, c) => {
            const weight = props.Course.calcSummary[c.Type] || 0;
            return c.modifiedScore == -1 ? p : p + weight;
        }, 0);

        return Math.round((weightedNumerator / weightedDenominator) * 10) / 10;
    }

    return (
        <div className="pb-5">
            <div className="d-flex gap-2">
                <Button onClick={props.onClose} variant="secondary" className="mb-2" size="md"><FontAwesomeIcon icon="fa-solid fa-angle-left" /></Button>
                <GradeSummary edit={props.edit} Period={props.Course.Period} Title={props.Course.Title} Room={props.Course.Room} Staff={props.Course.Staff} CalculatedScoreString={props.edit ? calculateEditedScore() : props.Mark.CalculatedScoreString} />
            </div>
            <div className="d-flex mt-4 mb-2">
                <h6 className="fw-semibold mt-0 align-self-center">Assignments ({props.Mark.Assignments.length})</h6>
                <Button onClick={props.toggleEdit} style={{ marginLeft: "auto" }} variant={props.edit ? "success" : "outline-secondary"} size="sm" active={props.edit}><FontAwesomeIcon icon="fa-solid fa-calculator" /></Button>
            </div>
            <hr className="mt-0" />
            <AssignmentList forceUpdate={forceUpdate} edit={props.edit} Assignments={props.Mark.Assignments} />
        </div>
    )
}