import { Card } from "react-bootstrap";

export default function MotivationalQuote(props) {
    return (
        <Card className={props.className}>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p className="mb-4"> Success is not final, failure is not fatal - It is the courage to continue that counts.</p>
                    <footer className="blockquote-footer">Winston Churchill</footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}