import { Card, Accordion, Button } from "react-bootstrap"
import Assignment from "./Assignment";
import AssignmentList from "./AssignmentList";
import GradeSummary from "./GradeSummary";
import GradingTermDisplay from "./GradingTermDisplay";

export default function GradebookWidget(props) {
    const gradebook = props.gradebook;

    const openCourse = props.openCourse;

    console.log(gradebook.reportingPeriods);

    const content = gradebook.reportingPeriods.map((period, index) => (
        <GradingTermDisplay key={index} GradePeriod={period.GradePeriod}>
            {
                gradebook.courses.map((course, j) => (
                    <div role="button" key={course.Title + j} onClick={() => openCourse(course, index)}>
                        <GradeSummary  Period={course.Period} Title={course.Title} Room={course.Room} Staff={course.Staff} CalculatedScoreString={course.Marks[index].CalculatedScoreString} />
                    </div>
                ))
            }
        </GradingTermDisplay>
    ));

    return (
        <>
            <div className="d-grid mb-2">
                <Button onClick={props.refresh} variant="outline-secondary" disabled={props.updating}>{props.updating ? "Updating gradebook..." : "Refresh Gradebook (Last updated " + Math.round(props.lastUpdate / 1000) + " seconds ago)"}</Button>
                <Button onClick={props.showWeekly} className="mt-1" variant="primary">Weekly overview</Button>
            </div>
            <Accordion>
                {content}
            </Accordion>
        </>
    )
}