import Assignment from "./Assignment"

export default function AssignmentList(props) {
    return props.Assignments.map((assignment, index) => (
        <>
        <Assignment Course={props.showCourse && assignment.course} Measure={assignment.Measure} Type={assignment.Type} Date={assignment.Date} Score={assignment.Score} />
        {index < props.Assignments.length - 1 && <hr />}
        </>
    ));
}