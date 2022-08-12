import { Card, Accordion } from "react-bootstrap"
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
        <Accordion>
            {content}
        </Accordion>
    )
}