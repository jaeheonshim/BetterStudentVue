import GitInfo from 'react-git-info/macro';

export default function Footer() {
    const gitInfo = GitInfo();

    const buildId = gitInfo.commit.hash.substring(0, 7);

    return (
        <div className="text-center p-4 border-top mt-5">
            BSV (BetterStudentVue)
            <br />
            <a href="https://github.com/jaeheonshim/BetterStudentVue">Open source</a> under the MIT license
            <br />
            <pre>Build {buildId}</pre>
        </div>
    );
}