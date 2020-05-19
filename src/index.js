#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const logSymbols = require('log-symbols');
const replace = require('replace-in-file');
const ejs = require("ejs");

const { getTemplatesPath } = require("./templateResolver");
const args = process.argv.slice(2);

const isLibComponent = args.indexOf("--library-component") !== -1;
const isRestProxy = args.indexOf("--rest-proxy") !== -1;

console.log('');

createWebpackFile();
patchGulpFile();
patchPackageJson();
patchGitIgnoreFile();

console.log(logSymbols.success, chalk.green("All done!"));
console.log('');

console.log(logSymbols.warning, chalk.bgRed("Now you should run 'npm install'. When you're done, simply execute 'npm run serve'"));

function patchGitIgnoreFile() {
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
    let webpackContent = fs.readFileSync(getTemplatesPath("webpack.ejs")).toString();
    webpackContent = ejs.render(webpackContent, { isLibComponent, isRestProxy });
    fs.writeFileSync(path.join(process.cwd(), "webpack.js"), webpackContent);

    console.log(logSymbols.success, chalk.blueBright("Created webpack.js file...."));
    console.log('');
}

function patchPackageJson() {
    const templateDeps = require(getTemplatesPath("dependecies.json"));
    const packagePath = path.join(process.cwd(), "package.json");
    const package = require(packagePath);

    if (isLibComponent) {
        templateDeps["concurrently"] = "5.2.0";
    }

    if (isRestProxy) {
        templateDeps["sp-rest-proxy"] = "2.11.1";
    }

    for (const dependency in templateDeps) {
        const version = templateDeps[dependency];
        if (package.devDependencies[dependency] && package.devDependencies[dependency] !== version) {
            console.log(logSymbols.warning, chalk.yellowBright("Your dependency '" + dependency + "' version '" + package.devDependencies[dependency] + "' will be replaced with version '" + version + "'"));
        }

        package.devDependencies[dependency] = version;
    }

    package.scripts = package.scripts || {};
    if (package.scripts["serve"]) {
        console.log(logSymbols.warning, chalk.yellowBright("Your npm 'serve' command will be replaced."));
    }
    if (isLibComponent) {
        package.scripts["serve"] = "cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve && cross-env NODE_OPTIONS=--max_old_space_size=4096 concurrently -k \"webpack-dev-server --mode development --config ./webpack.js --env.env=dev\" \"tsc -p tsconfig.json -w --preserveWatchOutput\"";
    } else {
        package.scripts["serve"] = "cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve && cross-env NODE_OPTIONS=--max_old_space_size=4096 webpack-dev-server --mode development --config ./webpack.js --env.env=dev";
    }

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
        replaceContent = fs.readFileSync(getTemplatesPath("gulpfile.partial.js")).toString();

        console.log(logSymbols.warning, chalk.redBright("You use webpack's task 'mergeConfig' feature in your gulpfile.js. Manual merge required."));
        console.log(chalk.redBright("Please read https://github.com/s-KaiNet/spfx-fast-serve#manual-merge-warning for details."));
        console.log('');
        hasErrors = true;
    } else {
        replaceContent = fs.readFileSync(getTemplatesPath("gulpfile.full.js")).toString();
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