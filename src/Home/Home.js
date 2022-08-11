import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { getGradebook } from "../data/Gradebook";
import GradebookWidget from "./GradebookWidget";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);

    const updateGradebookState = () => {
        getGradebook(appState.id, appState.password).then((data) => {
            setAppState({...appState, gradebook: data});
        })
    }

    useEffect(() => {
        updateGradebookState();
    }, []);

    return (
        <div className="container">
            <h1>Welcome, {appState.name}</h1>
            {appState.gradebook && 
                <GradebookWidget gradebook={appState.gradebook} />
            }
        </div>
    )
}