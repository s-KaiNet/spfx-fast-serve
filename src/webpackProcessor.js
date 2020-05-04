const libComponentPort = 4320;
const defaultPort = 4321;
const portPlaceholder = "\"<#port#>\"";
const openPlaceholder = "\"<#open#>\"";
const writeToDiskPlaceholder = "\"<#writeToDisk#>\"";

module.exports = {
    generateWebpackFile(useLibComponents, originalWebpack) {
        if (!useLibComponents) {
            originalWebpack = originalWebpack
                .replace(portPlaceholder, defaultPort)
                .replace(openPlaceholder, "true")
                .replace(writeToDiskPlaceholder, "false")
        } else {
            originalWebpack = originalWebpack
                .replace(portPlaceholder, libComponentPort)
                .replace(openPlaceholder, "false")
                .replace(writeToDiskPlaceholder, "true")
        }

        return originalWebpack;
    }
}