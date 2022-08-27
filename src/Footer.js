import { useContext, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import GitInfo from 'react-git-info/macro';
import { Link } from 'react-router-dom';
import { DebugContext } from './App';
import VUEStatus from './components/VUEStatus';
import { getServerStatus } from './data/Gradebook';

export default function Footer() {
    let clicked = 0;
    const { debugState, setDebugState } = useContext(DebugContext);

    const gitInfo = GitInfo();
    const buildId = gitInfo.commit.hash.substring(0, 7);

    const updateDebug = () => {
        if(debugState.debug) return;
        
        ++clicked;
        if(clicked >= 15) {
            setDebugState({...debugState, debug: true});
        }
    }

    return (
        <div className="text-center p-4 border-top mt-5">
            <VUEStatus />
            <br />
            <b>The information on this website is provided "as is". <Link to="/disclaimer">Disclaimer.</Link> <Link to="/tos">Terms of Service.</Link></b>
            <br />
            <a href="https://github.com/jaeheonshim/BetterStudentVue">Open source</a> under the MIT license
            <br />
            <pre onClick={updateDebug}>Build {buildId}</pre>
            {
                debugState.debug &&
                <h3>
                    <Badge bg="danger" variant="lg">DEBUG MODE</Badge>
                </h3>
            }
        </div>
    );
}