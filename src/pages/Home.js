import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getGradebook, getStudentInfo } from "../data/Gradebook";
import GradebookWidget from "../Home/GradebookWidget";
import { useNavigate } from "react-router-dom";
import CourseDisplay from "../Home/CourseDisplay";
import { Button, Spinner } from "react-bootstrap";
import Header from "../Header";
import WeeklyOverview from "../Home/WeeklyOverview";
import IDBarcode from "../components/IDBarcode";
import Footer from "../Footer";
import PageVisibility from "react-page-visibility";
import { useOnlineStatus } from "../util/OnlineStatusProvider";
import MotivationalQuote from "../components/MotivationalQuote";

export default function Home() {
    const navigate = useNavigate();
    const isOnline = useOnlineStatus();

    const { appState, setAppState } = useContext(AppContext);
    
    const [ openedData, setOpenedData ] = useState();
    const [ showWeekly, setShowWeekly ] = useState(false);
    const [ updatingGradebook, setUpdatingGradebook ] = useState(false);

    const [ edit, setEdit ] = useState(false);

    const toggleEdit = () => setEdit(!edit);

    const updateGradebookState = () => {
        console.log("Updating gradebook...");
        setUpdatingGradebook(true);

        getGradebook(appState.id, appState.password).then((data) => {
            getStudentInfo(appState.id, appState.password).then((studentData) => {
                for(const course of data.courses) {
                    course.calcSummary = {};
            
                    for(const calc of course.Marks[0].GradeCalculationSummary) {
                        course.calcSummary[calc.Type] = parseInt(calc.Weight) / 100.0;
                    }
                }

                setAppState({...appState, gradebook: data, studentInfo: studentData, lastUpdate: new Date().getTime()});
                setUpdatingGradebook(false);
            });
        });
    }

    const secondsSinceUpdate = () => {
        return (new Date().getTime() - (appState.lastUpdate || 0)) / 1000;
    }

    const closeCourse = () => {
        setOpenedData();
        setEdit(false);
    }

    const openCourse = (course, markIndex) => {
        for(const assignment of course.Marks[markIndex].Assignments) {
            assignment.modifiedScore = /^\+?(0|[1-9]\d*)$/.test(assignment.Score.split(" ")[0]) ? parseInt(assignment.Score.split(" ")[0]) : -1;
        }

        setOpenedData({
            course: course,
            mark: course.Marks[markIndex]
        });
    };

    const refresh = () => {
        updateGradebookState();
    }

    const openWeekly = () => {
        setShowWeekly(true);
    }

    const hideWeekly = () => {
        setShowWeekly(false);
    }

    const handleVisibilityChange = isVisible => {
        if(isVisible) {
            if(secondsSinceUpdate() >= 2 * 60) {
                updateGradebookState();
            }
        }
    }

    useEffect(() => {
        if(isOnline) {
            updateGradebookState();
        }
    }, [isOnline]);

    return (
        <PageVisibility onChange={handleVisibilityChange}>
            <>
            <Header title="Gradebook" />
            <div className="container">
                <h1 className="mt-3">Welcome, {appState.name}</h1>

                {appState.gradebook && !openedData && !showWeekly && 
                    <GradebookWidget lastUpdate={new Date().getTime() - (appState.lastUpdate)} updating={updatingGradebook} refresh={refresh} showWeekly={openWeekly} gradebook={appState.gradebook} openCourse={openCourse} />
                }

                {!appState.gradebook && 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                
                {openedData && !showWeekly &&
                    <CourseDisplay toggleEdit={toggleEdit} edit={edit} Course={openedData.course} Mark={openedData.mark} onClose={closeCourse} />
                }

                {showWeekly &&
                    <WeeklyOverview onClose={hideWeekly} gradebook={appState.gradebook} />
                }
            </div>
            <Footer />
            </>
        </PageVisibility>
    )
}