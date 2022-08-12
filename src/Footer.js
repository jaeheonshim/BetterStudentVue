import { useEffect } from 'react';
import GitInfo from 'react-git-info/macro';
import VUEStatus from './components/VUEStatus';
import { getServerStatus } from './data/Gradebook';

export default function Footer() {
    const gitInfo = GitInfo();

    const buildId = gitInfo.commit.hash.substring(0, 7);

    return (
        <div className="text-center p-4 border-top mt-5">
            <VUEStatus />
            <br />
            BSV (BetterStudentVue)
            <br />
            <a href="https://github.com/jaeheonshim/BetterStudentVue">Open source</a> under the MIT license
            <br />
            <pre>Build {buildId}</pre>
        </div>
    );
}