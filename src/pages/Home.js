import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getGradebook } from "../data/Gradebook";
import GradebookWidget from "../Home/GradebookWidget";
import { useNavigate } from "react-router-dom";
import CourseDisplay from "../Home/CourseDisplay";
import { Button } from "react-bootstrap";

export default function Home() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);
    
    const [ openedData, setOpenedData ] = useState();

    const updateGradebookState = () => {
        getGradebook(appState.id, appState.password).then((data) => {
            setAppState({...appState, gradebook: data});
        });
    }

    const closeCourse = () => {
        setOpenedData();
    }

    const openCourse = (course, markIndex) => {
        setOpenedData({
            course: course,
            mark: course.Marks[markIndex]
        });
    };

    const logout = () => {
        setAppState({});
        navigate("/login");
    }

    useEffect(() => {
        updateGradebookState();
    }, []);

    return (
        <>
        <nav className="navbar navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="#">
                Home
                <div style={{fontSize: "0.55em"}}>BSV - BetterStudentVue</div>
            </a>
            <Button onClick={logout} variant="outline-primary">Logout</Button>
        </nav>
        <div className="container">
            <h1 className="mt-3">Welcome, {appState.name}</h1>
            {appState.gradebook && !openedData && 
                <GradebookWidget gradebook={appState.gradebook} openCourse={openCourse} />
            }
            
            {openedData &&
                <CourseDisplay Course={openedData.course} Mark={openedData.mark} onClose={closeCourse} />
            }
        </div>
        </>
    )
}