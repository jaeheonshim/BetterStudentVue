import { Badge, Button } from "react-bootstrap";

export default function Upload(props) {
    return (<div className="container main-container">
        <div className="card p-3">
            <h5 className="card-title mb-3">Upload barcode image <Badge>BETA</Badge></h5>
            <p class="card-text">BetterStudentVue cannot generate your student ID. However, you may take a screenshot of your barcode page on the official StudentVUE app, and save it here for convenience. Just like all sensitive data, <b>your image will only be stored on your own device.</b></p>
            <input type="file" onChange={props.onFileChange} accept="image/*" />
            <Button className="mt-2" type="primary" hidden={!props.selectedFile} onClick={props.saveBarcodeFile}>Save Image</Button>
        </div>
    </div>)
}