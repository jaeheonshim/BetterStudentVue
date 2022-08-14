import { Container } from "react-bootstrap";
import Footer from "../Footer";
import Header from "../Header";

export default function Disclaimer() {
    return (
        <>
        <Header title="Disclaimer" />
        <Container className="pt-4">
            <h1>Disclaimer</h1>
            <p>BetterStudentVue (BSV) and it's developers have made every attempt to ensure the accuracy and reliability of the information provided on this website. However, the information is provided "as is" without warranty of any kind. BetterStudentVue (BSV) and its developers do not accept any responsibility or liability for the accuracy, content, completeness, legality, or reliability of the information contained on this website.</p>
            <p>No warranties, promises and/or representations of any kind, expressed or implied, are given as to the nature, standard, accuracy or otherwise of the information provided in this website nor to the suitability or otherwise of the information to your particular circumstances.</p>
            <p>We shall not be liable for any loss or damage of whatever nature (direct, indirect, consequential, or other) whether arising in contract, tort or otherwise, which may arise as a result of your use of (or inability to use) this website, or from your use of (or failure to use) the information on this site.</p>
            <p>In the case of any inconsistencies between the information presented on this website and the information presented on an official website, information on the official website should be taken as true.</p>
        </Container>
        <Footer />
        </>
    )
}