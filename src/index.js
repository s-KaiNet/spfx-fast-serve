#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const logSymbols = require('log-symbols');
const replace = require('replace-in-file');

console.log('');

createWebpackFile();
patchGulpFile();
patchPackageJson();
pathcGitIgnoreFile();

console.log(logSymbols.success, chalk.green("All done!"));
console.log('');

console.log(logSymbols.warning, chalk.bgRed("Now you should run 'npm install'. When you're done, simply execute 'npm run serve'"));

function pathcGitIgnoreFile() {
    const gitIgnorePath = path.join(process.cwd(), ".gitignore");
    const lineToAdd = "*.scss.d.ts";

    if (!fs.existsSync(gitIgnorePath)) {
        console.log(logSymbols.warning, chalk.yellowBright(".gitignore file is not found under " + gitIgnorePath + ". Skipping the step."));
        console.log(logSymbols.warning, chalk.yellowBright("Manually add '" + lineToAdd + "' to your .gitignore"));
        console.log('');
        return;
    }
    const gitIgnorePathFile = fs.readFileSync(gitIgnorePath).toString();


    if (gitIgnorePathFile.indexOf(lineToAdd) !== -1) {
        console.log(logSymbols.success, chalk.blueBright("It looks like .gitignore was patched before, skipping...."));
        console.log('');
        return;
    }

    fs.appendFileSync(gitIgnorePath, lineToAdd);

    console.log(logSymbols.success, chalk.blueBright("Updated .gitignore...."));
    console.log('');
}

function createWebpackFile() {
    fs.copyFileSync(path.join(__dirname, "templates/webpack.js"), path.join(process.cwd(), "webpack.js"));

    console.log(logSymbols.success, chalk.blueBright("Created webpack.js file...."));
    console.log('');
}

function patchPackageJson() {

    const templateDeps = require(path.join(__dirname, "templates/dependecies.json"));
    const packagePath = path.join(process.cwd(), "package.json");
    const package = require(packagePath);

    for (const dependency in templateDeps) {
        const version = templateDeps[dependency];
        if (package.devDependencies[dependency] && package.devDependencies[dependency] !== version) {
            console.log(logSymbols.warning, chalk.yellowBright("Your dependency '" + dependency + "' version '" + package.devDependencies[dependency] + "' will be replaced with version '" + version + "'"));
        }

        package.devDependencies[dependency] = version;
    }

    package.scripts = package.scripts || {};
    package.scripts["serve"] = "gulp bundle --custom-serve && webpack-dev-server --mode development --config ./webpack.js --env.env=dev";

    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));

    console.log(logSymbols.success, chalk.blueBright("Updated package.json...."));
    console.log('');
}

function patchGulpFile() {
    const gulpfilePath = path.join(process.cwd(), "gulpfile.js");
    const currentGulpFile = fs.readFileSync(gulpfilePath).toString();

    if (currentGulpFile.indexOf("@microsoft/sp-webpart-workbench/lib/api") !== -1) {
        console.log(logSymbols.success, chalk.blueBright("It looks like your gulpfile.js was patched before, skipping...."));
        console.log('');
        return;
    }

    let hasErrors = false;

    let replaceContent;
    // if gulpfile.js contains call to build.configureWebpack.mergeConfig, we need manual merge
    if (currentGulpFile.indexOf("build.configureWebpack.mergeConfig") !== -1) {
        replaceContent = fs.readFileSync(path.join(__dirname, "templates/gulpfile.partial.js")).toString();

        console.log(logSymbols.warning, chalk.redBright("You use webpack's task 'mergeConfig' feature in your gulpfile.js. Manual merge required."));
        console.log(chalk.redBright("Please read https://github.com/s-KaiNet/spfx-fast-serve#ManualMerge for details."));
        console.log('');
        hasErrors = true;
    } else {
        replaceContent = fs.readFileSync(path.join(__dirname, "templates/gulpfile.full.js")).toString();
    }

    const options = {
        files: gulpfilePath,
        from: /build\.initialize.*;/g,
        to: replaceContent,
    };

    replace.sync(options);

    if (!hasErrors) {
        console.log(logSymbols.success, chalk.blueBright("Patched gulpfile.js...."));
    } else {
        console.log(logSymbols.warning, chalk.blueBright("Patched gulpfile.js with warnings...."));
    }
    console.log('');
}