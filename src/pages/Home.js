import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getGradebook } from "../data/Gradebook";
import GradebookWidget from "../Home/GradebookWidget";
import { useNavigate } from "react-router-dom";
import CourseDisplay from "../Home/CourseDisplay";
import { Button, Spinner } from "react-bootstrap";
import Header from "../Header";
import WeeklyOverview from "../Home/WeeklyOverview";

export default function Home() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);
    
    const [ openedData, setOpenedData ] = useState();
    const [ showWeekly, setShowWeekly ] = useState(false);

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

    const refresh = () => {
        const {gradebook, ...newAppstate} = appState;
        setAppState(newAppstate);
        updateGradebookState();
    }

    const openWeekly = () => {
        setShowWeekly(true);
    }

    const hideWeekly = () => {
        setShowWeekly(false);
    }

    useEffect(() => {
        updateGradebookState();
    }, []);

    return (
        <>
        <div className="container">
            <h1 className="mt-3">Welcome, {appState.name}</h1>

            {appState.gradebook && !openedData && !showWeekly && 
                <GradebookWidget refresh={refresh} showWeekly={openWeekly} gradebook={appState.gradebook} openCourse={openCourse} />
            }

            {!appState.gradebook && 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            
            {openedData && !showWeekly &&
                <CourseDisplay Course={openedData.course} Mark={openedData.mark} onClose={closeCourse} />
            }

            {showWeekly &&
                <WeeklyOverview onClose={hideWeekly} gradebook={appState.gradebook} />
            }
        </div>
        </>
    )
}