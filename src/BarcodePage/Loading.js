import { Spinner } from "react-bootstrap";

export default function Loading({visible, text}) {
    return <div style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        zIndex: 10000,
        display: visible ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Spinner animation="border" variant="light" />
        <div className="text-light mt-4 p-4 text-center">{text}</div>
    </div>
}