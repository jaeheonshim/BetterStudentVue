import LoginForm from "../Login/LoginForm";
import { Card, Container } from "react-bootstrap";
import { useContext } from "react";
import { AppContext } from "../App";
import Header from "../Header";
import Footer from "../Footer";
import { getMobileOperatingSystem } from "../util/userAgent";

export default function Login() {
    const { appState, setAppState } = useContext(AppContext);

    return (
        <>
        <Header title="Login" />
        <Container>
            <Card style={{display: getMobileOperatingSystem() != "unknown" ? "block" : "none"}} className="mt-3">
                <Card.Body>
                    <Card.Text>
                        Tip: Add BetterStudentVue to your home screen to use it as if it were an app! 
                        {
                            getMobileOperatingSystem() == "iOS" &&
                            <> <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installing#safari_for_ios_iphoneos_ipados">Learn how.</a> (You must use Safari.)</>
                        }

                        {
                            getMobileOperatingSystem() == "Android" &&
                            <>
                            &nbsp;Learn how:&nbsp;
                            <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installing#google_chrome_for_android">Chrome</a>&nbsp;
                            <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installing#firefox_for_android">Firefox</a>
                            </>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
            <LoginForm appState={appState} />
        </Container>
        <Footer />
        </>
    )
}