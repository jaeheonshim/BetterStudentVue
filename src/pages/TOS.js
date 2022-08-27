import { Container } from "react-bootstrap";
import Footer from "../Footer";
import Header from "../Header";

export default function TOS() {
    return (
        <>
        <Header title="TOS" />
        <Container className="pt-4">
            <h1>Terms of Service</h1>
            <p>
                By using BetterStudentVue, these terms will automatically apply to you. Please read these terms and conditions carefully before using the application. BetterStudentVue is completely open source - however, Jaeheon Shim takes no responsibility for the use of derivative instances of the application.
            </p>
            <p>
                Please review the <a href="https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html">Family Educational Rights and Privacy Act (FERPA)</a> to learn how student educational records are protected. BetterStudentVue merely serves as a 3rd-party website to transmit information from the official StudentVue server. As the user, you are essentially accessing the StudentVue application yourself through a 3rd-party application.
            </p>
            <p>
                The BetterStudentVue app stores and processes personal data that you have provided to us, in order to provide the service. It is your sole responsibility to keep your devices and access to the app secure. BetterStudentVue and it's developers will not be held responsible for security compromises due to the fault of the user. By providing your student credentials to the BetterStudentVue application, you agree to allow the BetterStudentVue application to access your student data on your behalf, and agree to defend, indemnify, and hold BetterStudentVue and it's developers (Jaeheon Shim) harmless from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of this site.
            </p>
            <iframe src="/tos.html" style={{width: "100%", height: "950px"}} />
        </Container>
        <Footer />
        </>
    )
}