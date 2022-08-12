import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getGradebook } from "../data/Gradebook";
import GradebookWidget from "./GradebookWidget";
import { useNavigate } from "react-router-dom";
import CourseDisplay from "./CourseDisplay";

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
        <div className="container">
            <h1>Welcome, {appState.name}</h1>
            {appState.gradebook && !openedData && 
                <GradebookWidget gradebook={appState.gradebook} openCourse={openCourse} />
            }
            
            {openedData &&
                <CourseDisplay Course={openedData.course} Mark={openedData.mark} onClose={closeCourse} />
            }
        </div>
    )
}