import { Card, Accordion, Button } from "react-bootstrap"
import Assignment from "./Assignment";
import AssignmentList from "./AssignmentList";
import GradeSummary from "./GradeSummary";
import GradingTermDisplay from "./GradingTermDisplay";

export default function GradebookWidget(props) {
    const gradebook = props.gradebook;
    console.log(gradebook);

    const openCourse = props.openCourse;

    const content = gradebook.reportingPeriods.map((period, index) => (
        <GradingTermDisplay GradePeriod={period.GradePeriod}>
            {
                gradebook.courses.map((course) => (
                    <div role="button" onClick={() => openCourse(course, index)}>
                    <GradeSummary  Period={course.Period} Title={course.Title} Room={course.Room} Staff={course.Staff} CalculatedScoreString={course.Marks[index].CalculatedScoreString} />
                    </div>
                ))
            }
        </GradingTermDisplay>
    ));

    return (
        <>
            <div className="d-grid mb-2">
                <Button onClick={props.refresh} variant="outline-secondary">Refresh Gradebook</Button>
                <Button onClick={props.refresh} className="mt-1" variant="primary">Weekly overview</Button>
            </div>
            <Accordion>
                {content}
            </Accordion>
        </>
    )
}