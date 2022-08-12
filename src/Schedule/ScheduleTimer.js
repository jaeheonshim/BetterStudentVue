import { Card, ProgressBar, Badge } from "react-bootstrap";
import { toHHMMSS } from "../util/textUtil";

export default function ScheduleTimer(props) {
    return (
        <Card>
            <Card.Body align="middle">
                <h1 className="display-1" style={{fontSize: "4.5em"}}>{toHHMMSS(props.remainingTime)}</h1>
                <Badge bg="secondary" className="mb-2">{props.timeTitle}</Badge>
                <ProgressBar className="mt-2" now={props.elapsedPercentage} label={toHHMMSS(props.elapsedTime)} />
            </Card.Body>
        </Card>
    )
}