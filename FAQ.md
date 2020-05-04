# FAQs / known issues <!-- omit in toc -->

- [1. When I run `npm run serve` I see the error](#1-when-i-run-npm-run-serve-i-see-the-error)
- [2. After I applied `sfpx-fast-serve` tool I have formatting broken in `package.json` and `gulpfile.js`](#2-after-i-applied-sfpx-fast-serve-tool-i-have-formatting-broken-in-packagejson-and-gulpfilejs)
- [3. I added a new dependency in my solution (or started using new import from "@microsoft/*" modules) and now I see some strange errors](#3-i-added-a-new-dependency-in-my-solution-or-started-using-new-import-from-microsoft-modules-and-now-i-see-some-strange-errors)
- [4. When I modify localization files, live reload doesn't work](#4-when-i-modify-localization-files-live-reload-doesnt-work)
- [5. I use custom loaders and / or webpack modifications in my `gulpfile.js`](#5-i-use-custom-loaders-and--or-webpack-modifications-in-my-gulpfilejs)
- [6. Does it support React Hot Module Replacement (aka HMR)?](#6-does-it-support-react-hot-module-replacement-aka-hmr)
- [7. Webpack generates a lot of output, I want only errors or just minimal of information in my console](#7-webpack-generates-a-lot-of-output-i-want-only-errors-or-just-minimal-of-information-in-my-console)
- [8. How to debug with Chrome Debugger extension from VSCode?](#8-how-to-debug-with-chrome-debugger-extension-from-vscode)


## 1. When I run `npm run serve` I see the error

> `ERROR in <Component>.tsx Cannot find module './<Component>.module.scss'`:

![Error](img/missing-module-error.png)

*a*. Try to explicitly change and then save any of `.tsx` files in the solution in order to trigger the build. Maybe the error will disappear automatically. If not, go to `#b`  

*b*. Check that you use `styles` variable in `.tsx` file. For example, if you have `import styles from './<Component>.module.scss';` and you don't have usages of `styles` in your `<Component>.tsx`, you will see the error. Simply delete unused import. If it's not the case, goto `#c`.  

*c*. Maybe you don't have `<Component>.module.scss.d.ts` which is generated automatically. Request generation by going to `<Component>.module.scss` and explicitly saving the file using `Ctrl+S` combination or just by changing something and saving. This should generate `<Component>.module.scss.d.ts` and fix the issue. If not, please raise an [issue](https://github.com/s-KaiNet/spfx-fast-serve/issues).

## 2. After I applied `sfpx-fast-serve` tool I have formatting broken in `package.json` and `gulpfile.js`

`sfpx-fast-serve` patches those files and doesn't respect original file formatting (tabs vs whitespace, size, etc.). You have to fix it afterwards, if needed.

## 3. I added a new dependency in my solution (or started using new import from "@microsoft/*" modules) and now I see some strange errors

every time you introduce a new dependency for your solution, you should re-run `npm run serve` command, so that it picks up all new dependencies correctly.

## 4. When I modify localization files, live reload doesn't work

this scenario isn't supported, thus in that case you have to reload page manually

## 5. I use custom loaders and / or webpack modifications in my `gulpfile.js`

if you use custom webpack loaders or other webpack modifications via `build.configureWebpack.mergeConfig` feature, you should manually apply them to `webpack.js` file created by the cli to make everything work
  
## 6. Does it support React Hot Module Replacement (aka HMR)?

HMR is not supported. I tried different things, but was not able to make it work. If you have ideas, please welcome to issues or PRs :)

## 7. Webpack generates a lot of output, I want only errors or just minimal of information in my console

in `webpack.js` find settings for `devServer` and update `stats` variable to any of the values from [webpack docs here](https://webpack.js.org/configuration/stats/)

## 8. How to debug with Chrome Debugger extension from VSCode?

just refer to the official [documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-in-vscode). The only difference is that instead of `gulp serve` you will use `npm run serve`
