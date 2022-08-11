import { Accordion } from "react-bootstrap"

export default function GradingTermDisplay(props) {
    return (
        <Accordion.Item>
            <Accordion.Header>{props.GradePeriod}</Accordion.Header>
            <Accordion.Body className="p-2">
                {props.children}
            </Accordion.Body>
        </Accordion.Item>
    )
}