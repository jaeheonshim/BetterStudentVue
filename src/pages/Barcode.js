import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import IDBarcode from "../components/IDBarcode";
import { getStudentInfo } from "../data/Gradebook";
import "./Barcode.css";

export default function Barcode() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);

    const [studentData, setStudentData] = useState(appState.studentInfo);
    const [studentInfo, setStudentInfo] = useState({
        id: undefined,
        name: undefined, 
        school: undefined, 
        grade: undefined
    });

    useEffect(() => {
        getStudentInfo(appState.id, appState.password).then((data) => {
            setStudentData(data);
            setAppState({...appState, studentInfo: data});
        });
    }, []);

    useEffect(() => {
        if(!studentData) return;

        setStudentInfo({
            id: appState.id,
            name: studentData.name,
            school: studentData.school,
            grade: studentData.grade,
            photo: studentData.photo
        });
    }, [studentData]);

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
                        <img src={"data:image/png;base64," + studentInfo.photo} />
                    </div>
                </div>
                <div className="barcode">
                    <p>Swipe anywhere to change QRCode/Barcode</p>
                    <div className="barcode-container">
                        <IDBarcode id={studentInfo.id} />
                        <p className="barcode-text">{studentInfo.id}</p>
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