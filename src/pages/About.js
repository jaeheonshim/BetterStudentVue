import Header from "../Header";
import { Container } from "react-bootstrap"
import Footer from "../Footer";

export default function About() {
    return (
        <>
        <Header title="Disclaimer" />
        <Container className="pt-4">
            <h1>About BetterStudentVue (BSV)</h1>
            <p>BetterStudentVue (BSV) is an unofficial improvement upon the mobile StudentVue application. In addition to a clean layout, BSV provides additional features such as a weekly overview and a live schedule page. The BSV client application directly queries the StudentVue server; thus no student information is ever shared with anyone other than the student. BSV is developed and maintained by Jaeheon Shim.</p>
            <p>If necessary, you may contact me (Jaeheon Shim) at <a href="mailto:bsv@jshim.dev">bsv@jshim.dev</a>. Feature requests/issue reports are welcome!</p>
            <h3>Technical Details</h3>
            <p>BSV is deployed to and hosted on Google's Firebase platform. The client BSV application is built using React, and is styled using Bootstrap. Requests to StudentVue are made using Axios. BSV utilizes native PWA features of its host device, allowing for faster load times and offline functionality.</p>
            <p>The entire BSV source code is available on GitHub. <a href="https://github.com/jaeheonshim/BetterStudentVue">https://github.com/jaeheonshim/BetterStudentVue</a></p>
        </Container>
        <Footer />
        </>
    )
}