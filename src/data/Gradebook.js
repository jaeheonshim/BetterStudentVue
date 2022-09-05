import axios from "axios";
import { escapeXML, hhMMToSeconds, unescapeHtml } from "../util/textUtil";

const applicationEndpoint = "https://ga-gcps-psv.edupoint.com";
const BODY_TEMPLATE = "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><ProcessWebServiceRequest xmlns=\"http://edupoint.com/webservices/\"><userID>{user}</userID><password>{pass}</password><skipLoginLog>true</skipLoginLog><parent>false</parent><webServiceHandleName>PXPWebServices</webServiceHandleName><methodName>{method}</methodName><paramStr>&lt;Parms&gt;&lt;ChildIntID&gt;0&lt;/ChildIntID&gt;&lt;/Parms&gt;</paramStr></ProcessWebServiceRequest></soap:Body></soap:Envelope>";
const TEST_TEMPLATE = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"> <v:Header /> <v:Body> <ProcessWebServiceRequestMultiWeb xmlns="http://edupoint.com/webservices/" id="o0" c:root="1"> <userID i:type="d:string"> </userID> <password i:type="d:string"> </password> <skipLoginLog i:type="d:string"> true </skipLoginLog> <parent i:type="d:string"> false </parent> <webServiceHandleName i:type="d:string"> PXPWebServices </webServiceHandleName> <methodName i:type="d:string"> GETSAMLSTATUS </methodName> <paramStr i:type="d:string"> </paramStr> <webDBName i:type="d:string"> </webDBName> </ProcessWebServiceRequestMultiWeb> </v:Body> </v:Envelope>`;

export function getServerStatus() {
     return new Promise((resolve, reject) => {
          axios({
               method: 'post',
               url: applicationEndpoint + "/Service/PXPCommunication.asmx",
               headers: {
                   "Content-Type": "text/xml"
               },
               timeout: 2000,
               data: TEST_TEMPLATE
          }).then(response => {
               if(response.data.includes("ProcessWebServiceRequestMultiWebResponse")) {
                    resolve(true);
               } else {
                    reject(1);
               }
          }).catch(error => {
               reject(2);
          });
     });
}

export function getSchedule(username, password, depth=0) {
    password = escapeXML(password);
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: applicationEndpoint + "/Service/PXPCommunication.asmx",
            headers: {
                "Content-Type": "text/xml"
            },
            data: buildRequestBody("StudentClassList", username, password)
        }).then(response => {
            const formatData = response.data.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
            const parser = new DOMParser();

            const xmlDoc = parser.parseFromString(formatData, "text/xml");
            const schedule = [];

            if(xmlDoc.getElementsByTagName("ClassInfo").length < 1) {
                if(depth >= 10) {
                    // give up after 10 tries
                    reject("Failed to retrieve schedule");
                    return;
                }

                // what the fuck is StudentVue server doing
                // like this is some next level fucked up shit
                console.log("Failed to retrieve schedule. Retrying...");
                getSchedule(username, password, depth + 1).then(resolve, reject);
                return;
            }

            for(const classInfoDOM of xmlDoc.getElementsByTagName("ClassInfo")) {
                schedule.push({
                    period: parseInt(classInfoDOM.getAttribute("Period")),
                    title: unescapeHtml(classInfoDOM.getAttribute("ClassName")).trim().replace(/^(\d+.\d+)/, "").replace(/-.*/, "").trim(),
                    start: hhMMToSeconds(classInfoDOM.getAttribute("StartTime")),
                    end: hhMMToSeconds(classInfoDOM.getAttribute("EndTime"))
                });
            }

            resolve(schedule);
        }).catch(reject);
    });
}

export function getStudentInfo(username, password) {
    password = escapeXML(password);
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: applicationEndpoint + "/Service/PXPCommunication.asmx",
            headers: {
                "Content-Type": "text/xml"
            },
            data: buildRequestBody("ChildList", username, password)
        }).then(response => {
            const formatData = response.data.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
            const parser = new DOMParser();

            try {
                const xmlDoc = parser.parseFromString(formatData, "text/xml").getElementsByTagName("Child")[0];

                const studentInfo = {
                    name: xmlDoc.getElementsByTagName("ChildName")[0].innerHTML,
                    school: xmlDoc.getElementsByTagName("OrganizationName")[0].innerHTML,
                    grade: xmlDoc.getElementsByTagName("Grade")[0].innerHTML,
                    photo: xmlDoc.getElementsByTagName("photo")[0].innerHTML
                }

                resolve(studentInfo);
            } catch(exception) {
                reject({
                    message: "Error logging in. Ensure that your credentials were entered correctly.",
                    error: exception
                });
            }
        }).catch((exception) => {
            reject({
                message: "Sorry, a network error occurred. Please try again later.",
                error: exception
            });
        });
    });
}

export function getGradebook(username, password) {
    password = escapeXML(password);
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: applicationEndpoint + "/Service/PXPCommunication.asmx",
            headers: {
                "Content-Type": "text/xml"
            },
            data: buildRequestBody("Gradebook", username, password)
        }).then(response => {
            const formatData = response.data.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
            const parser = new DOMParser();

            try {
                const xmlDoc = parser.parseFromString(formatData, "text/xml").getElementsByTagName("Gradebook")[0];
                const reportingPeriods = [];
                for(const reportingPeriodDOM of xmlDoc.getElementsByTagName("ReportingPeriod")) {
                    reportingPeriods.push({
                        GradePeriod: reportingPeriodDOM.getAttribute("GradePeriod"),
                        StartDate: reportingPeriodDOM.getAttribute("StartDate"),
                        EndDate: reportingPeriodDOM.getAttribute("EndDate")
                    });
                }

                const courses = [];
                for(const courseDOM of xmlDoc.getElementsByTagName("Course")) {
                    const marks = [];
                    for(const markDOM of courseDOM.getElementsByTagName("Mark")) {
                        const assignments = [];
                        for(const assignmentDOM of markDOM.getElementsByTagName("Assignment")) {
                            assignments.push({
                                Measure: assignmentDOM.getAttribute("Measure"),
                                Type: assignmentDOM.getAttribute("Type"),
                                Date: assignmentDOM.getAttribute("Date"),
                                DueDate: assignmentDOM.getAttribute("DueDate"),
                                Score: assignmentDOM.getAttribute("Score"),
                                ScoreType: assignmentDOM.getAttribute("ScoreType"),
                                Points: assignmentDOM.getAttribute("Points")
                            });
                        }

                        const gradeCalculationSummary = [];
                        for(const gradeCalculationSummaryDOM of markDOM.getElementsByTagName("AssignmentGradeCalc")) {
                            gradeCalculationSummary.push({
                                Type: gradeCalculationSummaryDOM.getAttribute("Type"),
                                Weight: gradeCalculationSummaryDOM.getAttribute("Weight"),
                                Points: gradeCalculationSummaryDOM.getAttribute("Points"),
                                PointsPossible: gradeCalculationSummaryDOM.getAttribute("PointsPossible"),
                                WeightedPct: gradeCalculationSummaryDOM.getAttribute("WeightedPct"),
                                CalculatedMark: gradeCalculationSummaryDOM.getAttribute("CalculatedMark"),
                            })
                        }

                        marks.push({
                            MarkName: markDOM.getAttribute("MarkName"),
                            CalculatedScoreString: markDOM.getAttribute("CalculatedScoreString"),
                            Assignments: assignments,
                            GradeCalculationSummary: gradeCalculationSummary
                        });
                    }

                    courses.push({
                        Marks: marks,
                        Period: courseDOM.getAttribute("Period"),
                        Title: courseDOM.getAttribute("Title"),
                        Room: courseDOM.getAttribute("Room"),
                        Staff: courseDOM.getAttribute("Staff"),
                        StaffEMail: courseDOM.getAttribute("StaffEMail"),
                    });
                }

                resolve({
                    reportingPeriods: reportingPeriods,
                    courses: courses
                });
            } catch(exception) {
                reject(exception);
            }
        });
    });
}

function buildRequestBody(method, username, password) {
    return BODY_TEMPLATE.replace("{user}", username).replace("{pass}", password).replace("{method}", method);
}