import { Card, Accordion } from "react-bootstrap"
import GradeSummary from "./GradeSummary";
import GradingTermDisplay from "./GradingTermDisplay";

export default function GradebookWidget(props) {
    const gradebook = props.gradebook;
    console.log(gradebook);

    const content = gradebook.reportingPeriods.map((period, index) => (
        <GradingTermDisplay GradePeriod={period.GradePeriod}>
            {
                gradebook.courses.map((course) => (
                    <GradeSummary Period={course.Period} Title={course.Title} Room={course.Room} Staff={course.Staff} CalculatedScoreString={course.Marks[index].CalculatedScoreString} />
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