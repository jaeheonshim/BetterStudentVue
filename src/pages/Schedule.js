import ScheduleTimer from "../Schedule/ScheduleTimer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { getSchedule } from "../data/Gradebook";
import ScheduleTable from "../Schedule/ScheduleTable";
import { Button, Modal } from "react-bootstrap";
import { useInterval } from "../util/hooks";
import Header from "../Header";
import Footer from "../Footer";

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
];

function elapsed(start, end) {
    if(end >= start) return end - start;
    else return (24 * 60 * 60) - start + end;
}

export default function Schedule() {
    const { appState, setAppState } = useContext(AppContext);

    const [schedule, setSchedule] = useState(appState.schedule || DEMO_SCHEDULE);
    const [time, setTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [elapsedPercentage, setElapsedPercentage] = useState(0);
    const [currentTimeBlock, setCurrentTimeBlock] = useState(null);

    const [showSyncModal, setShowSyncModal] = useState(false);
    const [justSynchronized, setJustSynchronized] = useState(false);
    const [syncDialogMessage, setSyncDialogMessage] = useState();
    const closeSyncModal = () => {
        setShowSyncModal(false);
        setTimeout(() => {
            setJustSynchronized(false);
            setSyncDialogMessage();
        }, 1000);
    }
    const openSyncModal = () => setShowSyncModal(true);

    function getCurrentTimeSeconds() {
        let d = new Date();
        let time = d.getSeconds();
        time += d.getMinutes() * 60;
        time += d.getHours() * 3600;
      
        return time;
    }

    function getCurrentTimeBlock(seconds) {
        if(!schedule || schedule.length < 1) return null;

        for(const tb of schedule) {
            if(seconds >= tb.start && seconds <= tb.end) {
                return tb;
            }
        }

        // if not in a scheduled timeblock, return break timeblock
        for(let i = 1; i < schedule.length; ++i) {
            if(seconds >= schedule[i - 1].end && seconds <= schedule[i].start) {
                return {
                    period: "Break",
                    title: "(Next: " + schedule[i].title + ")",
                    start: schedule[i - 1].end,
                    end: schedule[i].start,
                    isBreak: true
                }
            }
        }

        let lastNonTrivial = schedule[schedule.length - 1];
        for(let i = schedule.length - 1; i >= 0; --i) {
            if(schedule[i].end - schedule[i].start > 0) {
                lastNonTrivial = schedule[i];
                break;
            }
        }

        return {
            period: "School not in session",
            title: "(Next: " + schedule[0].title + ")",
            start: lastNonTrivial.end,
            end: schedule[0].start,
            isBreak: true
        }
    }

    function updateTime() {
        setTime(getCurrentTimeSeconds() + (appState.timeOffset || 0));
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
        setRemainingTime(elapsed(time, currentTimeBlock.end));
        setElapsedTime(elapsed(currentTimeBlock.start, time));
        setElapsedPercentage(Math.round(elapsed(currentTimeBlock.start, time) / elapsed(currentTimeBlock.start, currentTimeBlock.end) * 100));
    }, [time]);

    useEffect(() => {
        if(appState.id && appState.password) {
            getSchedule(appState.id, appState.password).then(s => {
                setSchedule(s);
                setAppState({...appState, schedule: s});
            });
        }
    }, []);

    useInterval(updateTime, 100);

    const calcTimeOffset = () => {
        const bellTimes = [];
        for(const a of schedule) {
            bellTimes.push(a.start);
            bellTimes.push(a.end);
        }

        bellTimes.sort((a, b) => Math.abs(a - (time - (appState.timeOffset || 0))) - Math.abs(b - (time - (appState.timeOffset || 0))));
        
        const delta = bellTimes[0] - (time - (appState.timeOffset || 0));
        setAppState({...appState, timeOffset: delta});
        return delta;
    }

    const synchronize = () => {
        calcTimeOffset();
        setJustSynchronized(true);

        setSyncDialogMessage("Successfully synchronized!")
        setTimeout(closeSyncModal, 2000);
    }

    const resetSync = () => {
        setAppState({...appState, timeOffset: 0});

        setJustSynchronized(true);
        setSyncDialogMessage("Successfully reset synchronization!");
        setTimeout(closeSyncModal, 2000);
    }

    return (
        <>
        <Modal show={showSyncModal} onHide={closeSyncModal}>
            <Modal.Header closeButton>
                <Modal.Title>Synchronize clock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Press the button below exactly when the bell rings. Current time offset: {appState.timeOffset}</p>
                {syncDialogMessage}
                <div className="d-grid">
                    {!justSynchronized && (
                        <>
                        <Button onClick={synchronize}>Synchronize Clock</Button>
                        <Button onClick={resetSync} variant="outline-danger" className="mt-2">Reset Synchronization</Button>
                        </>
                    )
                    }
                </div>
            </Modal.Body>
        </Modal>
        <Header title="Schedule" />
        <div className="container pt-3">
            <ScheduleTimer timeTitle={(currentTimeBlock && !currentTimeBlock.isBreak && currentTimeBlock.period && currentTimeBlock.period + ": " + currentTimeBlock.title) || (currentTimeBlock && currentTimeBlock.isBreak && ("Break " + currentTimeBlock.title))} elapsedTime={elapsedTime} elapsedPercentage={elapsedPercentage} remainingTime={remainingTime} />
            <ScheduleTable schedule={schedule} />
            <div className="d-grid">
                <Button onClick={openSyncModal}>Synchronize Clock</Button>
            </div>
        </div>
        <Footer />
        </>
    );
}