import ScheduleTimer from "../Schedule/ScheduleTimer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getSchedule } from "../data/Gradebook";
import ScheduleTable from "../Schedule/ScheduleTable";
import { Button } from "react-bootstrap";

const DEMO_SCHEDULE = [
    {
        period: 1,
        title: "1st Period",
        start: 26400,
        end: 29880
    },
    {
        period: 2,
        title: "2nd Period",
        start: 30240,
        end: 33360
    },
    {
        period: 3,
        title: "3rd Period",
        start: 33720,
        end: 36840
    },
    {
        period: 4,
        title: "4th Period",
        start: 37200,
        end: 40380
    },
    {
        period: 5,
        title: "5th Period",
        start: 40740,
        end: 43920
    },
    {
        period: 6,
        title: "6th Period",
        start: 44280,
        end: 47460
    },
    {
        period: 7,
        title: "7th Period",
        start: 47820,
        end: 51000
    }
]

function getCurrentTimeSeconds() {
    let d = new Date();
    let time = d.getSeconds();
    time += d.getMinutes() * 60;
    time += d.getHours() * 3600;
  
    return time;
}

export default function Schedule() {
    const { appState, setAppState } = useContext(AppContext);

    const [schedule, setSchedule] = useState(DEMO_SCHEDULE);
    const [time, setTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [elapsedPercentage, setElapsedPercentage] = useState(0);
    const [currentTimeBlock, setCurrentTimeBlock] = useState(null);

    function getCurrentTimeBlock(seconds) {
        for(const tb of schedule) {
            if(seconds >= tb.start && seconds <= tb.end) {
                return tb;
            }
        }

        return null;
    }

    function updateTime() {
        setTime(getCurrentTimeSeconds());
    }

    useEffect(() => {
        const currentTimeBlock = getCurrentTimeBlock(time);
        if(!currentTimeBlock) {
            setCurrentTimeBlock({});
            setRemainingTime(0);
            setElapsedTime(0);
            setElapsedPercentage(0);
            return;
        }

        setCurrentTimeBlock(currentTimeBlock);
        setRemainingTime(currentTimeBlock.end - time);
        setElapsedTime(time - currentTimeBlock.start);
        setElapsedPercentage(Math.round((time - currentTimeBlock.start) / (currentTimeBlock.end - currentTimeBlock.start) * 100));
    }, [time]);

    useEffect(() => {
        setInterval(updateTime, 100);

        if(appState.id && appState.password) {
            getSchedule(appState.id, appState.password).then(schedule => {
                console.log("Updated schedule");
                setSchedule(schedule);
            });
        }
    }, []);

    return (
        <div className="container pt-3">
            <ScheduleTimer timeTitle={currentTimeBlock && currentTimeBlock.period && currentTimeBlock.period + ": " + currentTimeBlock.title} elapsedTime={elapsedTime} elapsedPercentage={elapsedPercentage} remainingTime={remainingTime} />
            <ScheduleTable schedule={schedule} />
            <div className="d-grid">
                <Button>Sync Clock</Button>
            </div>
        </div>
    );
}