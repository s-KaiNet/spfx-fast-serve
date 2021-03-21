# FAQs / known issues <!-- omit in toc -->

- [1. When I run `npm run serve` I see the error](#1-when-i-run-npm-run-serve-i-see-the-error)
- [2. After I applied `sfpx-fast-serve` tool I have formatting broken in `package.json` and `gulpfile.js`](#2-after-i-applied-sfpx-fast-serve-tool-i-have-formatting-broken-in-packagejson-and-gulpfilejs)
- [3. I added a new dependency in my solution (or started using new import from "@microsoft/*" modules) and now I see some strange errors](#3-i-added-a-new-dependency-in-my-solution-or-started-using-new-import-from-microsoft-modules-and-now-i-see-some-strange-errors)
- [4. When I modify localization files, live reload doesn't work](#4-when-i-modify-localization-files-live-reload-doesnt-work)
- [5. I use custom loaders and / or webpack modifications in my `gulpfile.js`](#5-i-use-custom-loaders-and--or-webpack-modifications-in-my-gulpfilejs)
- [6. Does it support React Hot Module Replacement (aka HMR)?](#6-does-it-support-react-hot-module-replacement-aka-hmr)
- [7. Webpack generates a lot of output, I want only errors or just minimal of information in my console](#7-webpack-generates-a-lot-of-output-i-want-only-errors-or-just-minimal-of-information-in-my-console)
- [8. How to debug with Chrome Debugger extension from VSCode?](#8-how-to-debug-with-chrome-debugger-extension-from-vscode)
- [9. How to prevent browser to open the default url (equivalent to `gulp serve --nobrowser`)?](#9-how-to-prevent-browser-to-open-the-default-url-equivalent-to-gulp-serve---nobrowser)
- [10. How to run with different locale?](#10-how-to-run-with-different-locale)

## 1. When I run `npm run serve` I see the error

> `ERROR in <Component>.tsx Cannot find module './<Component>.module.scss'`:

![Error](img/missing-module-error.png)

*a*. Try to explicitly change and then save any of `.tsx` files in the solution in order to trigger the build. Maybe the error will disappear automatically. If not, go to `#b`  

*b*. Check that you use `styles` variable in `.tsx` file. For example, if you have `import styles from './<Component>.module.scss';` and you don't have usages of `styles` in your `<Component>.tsx`, you will see the error. Simply delete unused import. If it's not the case, goto `#c`.  

*c*. Maybe you don't have `<Component>.module.scss.d.ts` which is generated automatically. Request generation by going to `<Component>.module.scss` and explicitly saving the file using `Ctrl+S` combination or just by changing something and saving. This should generate `<Component>.module.scss.d.ts` and fix the issue. If not, please raise an [issue](https://github.com/s-KaiNet/spfx-fast-serve/issues).

## 2. After I applied `sfpx-fast-serve` tool I have formatting broken in `package.json` and `gulpfile.js`

`sfpx-fast-serve` patches those files and doesn't respect original file formatting (tabs vs whitespace, size, etc.). You have to fix it afterwards, if needed.

## 3. I added a new dependency in my solution (or started using new import from "@microsoft/*" modules) and now I see some strange errors

Every time you introduce a new dependency for your solution, you should re-run `npm run serve` command, so that it picks up all new dependencies correctly.

## 4. When I modify localization files, live reload doesn't work

This scenario isn't supported, thus in that case you have to reload page manually

## 5. I use custom loaders and / or webpack modifications in my `gulpfile.js`

If you use custom webpack loaders or other webpack modifications via `build.configureWebpack.mergeConfig` feature, you should manually apply them to `webpack.js` file created by the cli to make everything work
  
## 6. Does it support React Hot Module Replacement (aka HMR)?

HMR is not supported. I tried different things, but was not able to make it work. If you have ideas, please welcome to issues or PRs :)

## 7. Webpack generates a lot of output, I want only errors or just minimal of information in my console

In `webpack.js` find settings for `devServer` and update `stats` variable to any of the values from [webpack docs here](https://webpack.js.org/configuration/stats/)

## 8. How to debug with Chrome Debugger extension from VSCode?

Just refer to the official [documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/debug-in-vscode). The only difference is that instead of `gulp serve` you will use `npm run serve`

## 9. How to prevent browser to open the default url (equivalent to `gulp serve --nobrowser`)?

Modify the default `webpack.js` file and update `devServer.open` property. By default the value is `true`, which opens your browser, change it to `false`.

## 10. How to run with different locale?

You have two options here. If you support only one or two additional locales, you can create additional npm serve scripts (inside `package.json`) with different locales support, i.e.

```json
"serve-nl": "cross-env NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve --locale=nl-nl && cross-env NODE_OPTIONS=--max_old_space_size=4096 webpack-dev-server --mode development --config ./webpack.js --env.env=dev",
```

Take a note that I added `--locale=nl-nl` to support NL locale.

Alternatively, if you need a lot of locales, you can create dynamic solution with environmental variables. To support this scenario, set a new environmental varable to be your locale code, i.e.

```bash
set SPFX_LOCALE=nl-nl
```

Then update npm script to use this variable:

```json
"serve-loc": "cross-env-shell NODE_OPTIONS=--max_old_space_size=4096 gulp bundle --custom-serve --locale=$SPFX_LOCALE && cross-env NODE_OPTIONS=--max_old_space_size=4096 webpack-dev-server --mode development --config ./webpack.js --env.env=dev"
```
Take a note on `--locale=$SPFX_LOCALE` special syntax and using `cross-env-shell` (part of `cross-env` package, you don't need to install anything additionally).