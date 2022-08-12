import axios from "axios";

const applicationEndpoint = "https://apps.gwinnett.k12.ga.us/sismobile/spvue";
const BODY_TEMPLATE = "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><ProcessWebServiceRequest xmlns=\"http://edupoint.com/webservices/\"><userID>{user}</userID><password>{pass}</password><skipLoginLog>1</skipLoginLog><parent>0</parent><webServiceHandleName>PXPWebServices</webServiceHandleName><methodName>{method}</methodName><paramStr>&lt;Parms&gt;&lt;ChildIntID&gt;0&lt;/ChildIntID&gt;&lt;/Parms&gt;</paramStr></ProcessWebServiceRequest></soap:Body></soap:Envelope>";
const TEST_TEMPLATE = `<v:Envelope xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:d="http://www.w3.org/2001/XMLSchema" xmlns:c="http://schemas.xmlsoap.org/soap/encoding/" xmlns:v="http://schemas.xmlsoap.org/soap/envelope/"> <v:Header /> <v:Body> <ProcessWebServiceRequestMultiWeb xmlns="http://edupoint.com/webservices/" id="o0" c:root="1"> <userID i:type="d:string"> </userID> <password i:type="d:string"> </password> <skipLoginLog i:type="d:string"> true </skipLoginLog> <parent i:type="d:string"> false </parent> <webServiceHandleName i:type="d:string"> PXPWebServices </webServiceHandleName> <methodName i:type="d:string"> GETSAMLSTATUS </methodName> <paramStr i:type="d:string"> </paramStr> <webDBName i:type="d:string"> </webDBName> </ProcessWebServiceRequestMultiWeb> </v:Body> </v:Envelope>`;

export function getServerStatus() {
     return new Promise((resolve, reject) => {
          axios({
               method: 'post',
               url: applicationEndpoint + "/Service/PXPCommunication.asmx",
               headers: {
                   "Content-Type": "text/xml"
               },
               data: TEST_TEMPLATE
          }).then(response => {
               if(response.data.includes("ProcessWebServiceRequestMultiWebResponse")) {
                    resolve(true);
               } else {
                    reject(1);
               }
          }).catch(error => {
               console.log(error);
               reject(2);
          });
     });
}

export function getStudentInfo(username, password) {
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
                const xmlDoc = parser.parseFromString(formatData, "text/xml").getElementsByTagName("ChildList")[0];
        
                const studentInfo = {
                    name: xmlDoc.getAttribute("UserFormattedName")
                }

                resolve(studentInfo);
            } catch(exception) {
                reject(exception);
            }
        });
    });
}

export function getGradebook(username, password) {
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