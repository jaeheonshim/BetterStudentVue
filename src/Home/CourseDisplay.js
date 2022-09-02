import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForceUpdate } from "../util/hooks";
import Assignment, { GRADE_MATCH } from "./Assignment";
import AssignmentList from "./AssignmentList";
import GradeSummary from "./GradeSummary";

export default function CourseDisplay(props) {
    const forceUpdate = useForceUpdate();

    const calculateEditedScore = () => {
        // calculate each category separately, and then take the weighted sum
        let numerator = 0;
        let denominator = 0;

        for(const type in props.Course.calcSummary) {
            const assignments = props.Mark.Assignments.filter(a => a.Type == type && a.modifiedScore != -1);
            const percentage = assignments.reduce((p, c) => p += c.modifiedScore, 0) / assignments.length;

            if(assignments.length > 0) {
                numerator += percentage * props.Course.calcSummary[type];
                denominator += props.Course.calcSummary[type];
            }
        }

        return Math.round(numerator / denominator);
    }

    const resetAll = () => {
        for(const assignment of props.Mark.Assignments) {
            assignment.modifiedScore = GRADE_MATCH.test(assignment.Score.split(" ")[0]) ? parseInt(assignment.Score.split(" ")[0]) : -1;
        }

        forceUpdate();
    }

    return (
        <div className="pb-5">
            <div className="d-flex gap-2">
                <Button onClick={props.onClose} variant="secondary" className="mb-2" size="md"><FontAwesomeIcon icon="fa-solid fa-angle-left" /></Button>
                <GradeSummary edit={props.edit} Period={props.Course.Period} Title={props.Course.Title} Room={props.Course.Room} Staff={props.Course.Staff} CalculatedScoreString={props.edit ? calculateEditedScore() : props.Mark.CalculatedScoreString} />
            </div>
            <div className="d-flex mt-4 mb-2 justify-content-between">
                <h6 className="fw-semibold mt-0 align-self-center">Assignments ({props.Mark.Assignments.length})</h6>
                <div className="d-flex gap-1">
                    <Button onClick={resetAll} style={{display: props.edit ? "block" : "none"}} size="sm" variant="secondary"><FontAwesomeIcon icon="fas fa-undo" /></Button>
                    <Button onClick={props.toggleEdit} variant={props.edit ? "success" : "outline-secondary"} size="sm" active={props.edit}><FontAwesomeIcon icon="fa-solid fa-calculator" /></Button>
                </div>
            </div>
            <hr className="mt-0" />
            <AssignmentList forceUpdate={forceUpdate} edit={props.edit} Assignments={props.Mark.Assignments} />
        </div>
    )
}