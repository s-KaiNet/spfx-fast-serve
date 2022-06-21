# :rocket: SPFx Fast Serve Tool  

[![npm version](https://badge.fury.io/js/spfx-fast-serve.svg)](https://badge.fury.io/js/spfx-fast-serve)

A command line utility, which modifies your SharePoint Framework solution, so that it runs continuous `serve` command as fast as possible.

---

Compare "refresh" time (the time needed to compile your project when you change a file and start refreshing a page in a browser):
> NOTE: The actual time depends on the environment, hardware, but at least you can see the difference

|                                                                                     | gulp serve | spfx-fast-serve |
| ----------------------------------------------------------------------------------- | ---------- | --------------- |
| Default "Hello World" <br> React web part                                           | 3-5 sec    | 0.1-0.2 sec     |
| [PnP Modern Search solution](https://github.com/microsoft-search/pnp-modern-search) | 28-34 sec  | 2-4 sec         |
| [SP Starter Kit solution](https://github.com/SharePoint/sp-starter-kit) (v1)        | 40-50 sec  | 2-3 sec         |

Curious how it works under the hood? Read my [blog post here](https://spblog.net/post/2020/03/24/spfx-overclockers-or-how-significantly-speed-up-the-gulp-serve-command).

## How to use

1. `npm install spfx-fast-serve -g`
2. Open a command line in a folder with your SharePoint Framework solution you want to speed up.
3. Run `spfx-fast-serve` and follow instructions. In most cases you shouldn't do anything specific and the cli "just works".
4. Run `npm install`
5. Run `npm run serve` and enjoy the incredible speed of `serve` command!

## Migration between SPFx versions

The migration is as easy as just changing the version of `spfx-fast-serve-helpers` in your `package.json` to match the corresponding SPFx **minor** version (**do not** change patch version).

For example, if your project is based on SPFx 1.11 and `spfx-fast-serve@3.x`, then you have below dependency:
 > "spfx-fast-serve-helpers": "~1.11.0"

 To migrate `fast-serve` to SPFx 1.12 you just need to change it like this (patch version should be `0`, we change only minor version):
> "spfx-fast-serve-helpers": "~1.12.0"

Reinstall all dependencies and that's it!

## Webpack extensibility

If you use custom webpack loaders or other webpack modifications via `build.configureWebpack.mergeConfig` feature, you should manually apply them to `webpack.extend.js` file created by the cli to make everything work. Apply only those webpack modifications, which work on a regular `gulp serve` command since `spfx-fast-serve` works only in development mode.  

In a `./fast-serve` folder you have a file called `webpack.extend.js`. In this file you can put your own logic for webpack, it will not be overwritten by subsequent `spfx-fast-serve` calls.

You can either provide custom `webpackConfig` object, which will be merged using [webpack-merge](https://github.com/survivejs/webpack-merge) module, or use `transformConfig` to even better control over configuration.

Check out [this sample](https://github.com/s-KaiNet/spfx-fast-serve/blob/master/samples/advanced/fast-serve/webpack.extend.js) to see how it works. The sample configures custom path aliases for SPFx.

## Configuration options

Starting from version `2.x`, the library saves your CLI arguments and serve options into the configuration file. The file is located under `./fast-serve/config.json`.

Currently below configuration values are available for `serve`:

- `openUrl` - string, default `undefined`, which url to open. If empty, no url will be opened
- `loggingLevel` - string, default `normal`, valid values are `"minimal", "normal", "detailed"`. `minimal` notifies about errors and new builds only, `normal` adds bundle information, `detailed` adds details about each bundle.
- `fullScreenErrors` - boolean, default `true`, whether to show full-screen (overlay) errors. Corresponds to [webpack's dev server overlay](https://webpack.js.org/configuration/dev-server/#devserveroverlay)
- `hotRefresh` - *[SPFx 1.12+]* boolean, default `false`. When `true` enables webpack's [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR). This features is considered as experimental meaning that you can try and use  if it works well for your project. Read [more here](/docs/HMR.md) on how to properly configure SPFx to work with HMR.
- `eslint` - boolean, for SPFx `1.15` and onwards, the default value is  `true`, because `1.15+` supports ESLint natively. For the earlier versions the default is `false`. When `true`, adds [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) to lint your code with `lintDirtyModulesOnly:true` option for performance. If you're running on the SPFx earlier than `1.15`, you should read [this doc](/docs/ESLint.md) and configure ESLint explicitly.
- `reactProfiling` - *[SPFx 1.13+]* boolean, default `false`. When `true`, enables react profiling mode through [React Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). By default profiling doesn't work in SPFx solutions (even in dev mode).
- `containers` - *[SPFx 1.13+]* boolean, by default `fast-serve` automatically detects containerized environment (like Docker) and applies needed configuration. But if it doesn't work for you, you can explicitly disable or enable support for containers using this option.

Here is a sample configuration:

```json
{
  "$schema": "https://raw.githubusercontent.com/s-KaiNet/spfx-fast-serve/master/schema/config.latest.schema.json",
  "cli": {
    "isLibraryComponent": false
  },
  "serve": {
    "openUrl": "https://<org>.sharepoint.com/sites/dev/_layouts/15/workbench.aspx",
    "fullScreenErrors": true
  }
}

```

Starting from SPFx 1.13+ the library also support SPFx serve configurations. If you have any custom serve configuration (`serveConfigurations` node under `./config/serve.json`), then you can apply it to the `spfx-fast-serve` as well by running:

```bash
npm run serve -- --config=[serve-config-name]
```

Or just duplicate "serve" npm script and add additional parameter:

```json
"serve-config": "gulp bundle --custom-serve --max_old_space_size=4096 && fast-serve --config=[serve-config-name]"
```

It works exactly the same as the OOB `gulp serve --config=[config-name]`

## Which SharePoint Framework versions are supported

SharePoint Online and SharePoint 2019, which basically means SharePoint Framework 1.4.1 and above.

SharePoint 2016 is **NOT** supported.

## How it works

The tool adds necessary files to run your own webpack based build with webpack dev server. Technically it's a custom webpack build, which produces the same output files as SharePoint Framework build pipeline, but does it a lot faster, because of a number of improvements:

- all compilation are done in a memory with webpack, no additional "copy", "prepare", "typescript", "whatever" tasks.
- incremental TypeScript compilation when a file is being changed. It means only necessary files are compiled, not everything.
- asynchronous type checking and linting.

Also

- supports local and hosted workbench, MS Teams host
- live reloading (for hosted workbench and Teams)
- debugging from VSCode with Chrome Debugger extension
- doesn't mess up your default SPFx build. If you have troubles, simply switch back to regular `gulp serve`

With `spfx-fast-serve` you will be able to significantly reduce the time from code change to a page refresh in a browser (a few times faster than the default `gulp serve` command).

## NGROK serve plugin

`spfx-fast-serve` supports ngrok as a proxy between webpack dev server and SharePoint. This is possible through the *NgrokServePlugin* webpack plugin. This option allows you to test your SPFx solution live on mobile devices in development mode.

Read more [here](/docs/NgrokServe.md) on how you can configure it.

## Library components

Please use [this guide](/docs/LibraryComponents.md) to configure `spfx-fast-serve` with library components.

## SharePoint Rest Proxy aka [sp-rest-proxy](https://github.com/koltyakov/sp-rest-proxy) support

If you want to use `sp-rest-proxy`, then use `webpack.extend.js` feature. Install `sp-rest-proxy` and add below code to the `webpack.extend.js`:

```javascript
const RestProxy = require('sp-rest-proxy');
....
const webpackConfig = {
  devServer.before = function (app) {
      new RestProxy({
        4321,
        logLevel: "Off",
        configPath: './config/private.json'
      }, app).serveProxy();
    }
}
....
```

You should create `./config/private.json` file with your credentials beforehand.

## [pnpm](https://pnpm.js.org/) support

`pnpm` is supported OOB, no additional steps required.

## Privacy policy

`spfx-fast-serve` tracks every run using "fast serve" option. The "run" data includes time, when you run `npm run serve` and irreversible hash of computer name (to track unique computers). It **does NOT** collect nor store any personal, computer, network or project information. "Run" data needed to analyze, how many runs using "fast serve" scenario we have per day\month\year and what is the trend. Based on the data I can make a decision whether to further invest time into this project or not.

## Having troubles? Please try to find the answer under [FAQs](/docs/FAQ.md) or raise an issue
