import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getGradebook } from "../data/Gradebook";
import GradebookWidget from "../Home/GradebookWidget";
import { useNavigate } from "react-router-dom";
import CourseDisplay from "../Home/CourseDisplay";
import { Button, Spinner } from "react-bootstrap";
import Header from "../Header";

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

    useEffect(() => {
        updateGradebookState();
    }, []);

    return (
        <>
        <Header />
        <div className="container">
            <h1 className="mt-3">Welcome, {appState.name}</h1>
            {appState.gradebook && !openedData && 
                <GradebookWidget gradebook={appState.gradebook} openCourse={openCourse} />
            }

            {!appState.gradebook && 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            
            {openedData &&
                <CourseDisplay Course={openedData.course} Mark={openedData.mark} onClose={closeCourse} />
            }
        </div>
        </>
    )
}