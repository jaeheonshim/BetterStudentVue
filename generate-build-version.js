const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const fs = require("fs");

const gitInfo = new GitRevisionPlugin();

const appVersion = gitInfo.commithash();

const jsonData = {
    version: appVersion
};

const jsonContent = JSON.stringify(jsonData);

fs.writeFile("./public/version-meta.json", jsonContent, "utf8", function(err) {
    if(err) {
        console.error("An error occurred while writing latest commit hash");
        console.error(err);
    }
})