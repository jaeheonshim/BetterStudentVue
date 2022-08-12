import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toHHMMSS } from "../util/textUtil";

export default function ScheduleTable(props) {
    const [body, setBody] = useState();

    useEffect(() => {
        if(!props.schedule) return;
        setBody(props.schedule.map((timeBlock) => {
            return (
            <tr>
                <td>{timeBlock.period}</td>
                <td>{timeBlock.title}</td>
                <td>{toHHMMSS(timeBlock.start).substring(0, 5)}</td>
                <td>{toHHMMSS(timeBlock.end).substring(0, 5)}</td>
            </tr>
            );
        }));
    }, [props.schedule]);

    return (
        (props.schedule &&
            <Table striped bordered className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        )
    )
}