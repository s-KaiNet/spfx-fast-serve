const path = require("path");
const packagePath = path.join(process.cwd(), "package.json");
const package = require(packagePath);

module.exports = {
    getTemplatesPath(fileName) {
        const minorVersion = parseInt(package.dependencies["@microsoft/sp-core-library"].split(".")[1]);
        let basePath = "templates/";

        if (minorVersion >= 9) {
            basePath += "latest/";
        } else if (minorVersion < 9 && minorVersion > 4) {
            basePath += "1.7.1/";
        } else if (minorVersion === 4) {
            basePath += "1.4.1/";
        } else {
            throw new Error("SharePoint Framework with version " + package.dependencies["@microsoft/sp-core-library"] + "is not supported.");
        }

        return path.join(__dirname, basePath + fileName);
    }
}