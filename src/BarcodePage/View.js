import { Badge, Button } from "react-bootstrap";

export default function View(props) {
    return (<div className="container main-container">
        <div className="card p-3">
            <h5 className="card-title mb-3">View uploaded barcode image</h5>
            <p>Hint: Press and hold anywhere on the screen to return to this page.</p>
            <Button onClick={props.open}>View Image</Button>
            <Button variant="danger" className="mt-2" onClick={props.delete}>Delete uploaded image</Button>
        </div>
    </div>)
}