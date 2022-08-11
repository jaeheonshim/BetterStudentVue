import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { getGradebook } from "../data/Gradebook";
import GradebookWidget from "./GradebookWidget";

export default function Home() {
    const { appState, setAppState } = useContext(AppContext);

    const updateGradebookState = () => {
        getGradebook("202012482", "j@3h30n5h1m").then((data) => {
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