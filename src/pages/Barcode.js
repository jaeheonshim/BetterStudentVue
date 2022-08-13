import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import IDBarcode from "../components/IDBarcode";
import "./Barcode.css";
import photo from "./photo.PNG";

export default function Barcode() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);

    const [studentInfo, setStudentInfo] = useState({
        id: undefined,
        name: undefined, 
        school: undefined, 
        grade: undefined
    });

    useEffect(() => {
        setStudentInfo({
            id: appState.id,
            name: appState.studentInfo && appState.studentInfo.name,
            school: appState.studentInfo && appState.studentInfo.school,
            grade: appState.studentInfo && appState.studentInfo.grade
        });
        console.log(appState.studentInfo);
    }, [appState]);

    const goHome = () => {
        navigate("/");
    }

    return (
        <div className="container main-container">
            <div className="navigation">
                <div onClick={goHome}><Icon width="32" icon="mdi-light:chevron-left" /></div>
                <div onClick={goHome} className="navigation_text">Navigation</div>
                <div className="title">ID Card</div>
                <div style={{visibility: "hidden"}}>Navigation</div>
                <div style={{visibility: "hidden"}}><Icon width="32" icon="mdi-light:chevron-left" /></div>
            </div>
            <p align="center">Counselor Hall Pass</p>
            <div className="contents">
                <div className="image">
                    <div className="image-cropper">
                        <img src={photo} />
                    </div>
                </div>
                <div className="barcode">
                    <p>Swipe anywhere to change QRCode/Barcode</p>
                    <div className="barcode-container">
                        <IDBarcode id="202012482" />
                        <p className="barcode-text">202012482</p>
                    </div>
                </div>

                <div className="footer">
                    <p style={{fontSize: "1.2em"}}>{studentInfo.name}</p>
                    <p>{studentInfo.school}</p>
                    <p>ID: {studentInfo.id}</p>
                    <p>Grade: {studentInfo.grade}</p>
                </div>
            </div>
        </div>
    )
}