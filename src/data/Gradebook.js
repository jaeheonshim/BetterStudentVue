import axios from "axios";

const applicationEndpoint = "https://apps.gwinnett.k12.ga.us/sismobile/spvue";
const BODY_TEMPLATE = "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><ProcessWebServiceRequest xmlns=\"http://edupoint.com/webservices/\"><userID>{user}</userID><password>{pass}</password><skipLoginLog>1</skipLoginLog><parent>0</parent><webServiceHandleName>PXPWebServices</webServiceHandleName><methodName>{method}</methodName><paramStr>&lt;Parms&gt;&lt;ChildIntID&gt;0&lt;/ChildIntID&gt;&lt;/Parms&gt;</paramStr></ProcessWebServiceRequest></soap:Body></soap:Envelope>";

console.log("TEST");

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
    })
}

function buildRequestBody(method, username, password) {
    return BODY_TEMPLATE.replace("{user}", username).replace("{pass}", password).replace("{method}", method);
}