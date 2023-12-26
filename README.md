# :rocket: SPFx Fast Serve Tool  

[![npm version](https://badge.fury.io/js/spfx-fast-serve.svg)](https://badge.fury.io/js/spfx-fast-serve)

A command line utility, which modifies your SharePoint Framework solution, so that it runs continuous `serve` command 10-15x times faster, than the regular `gulp serve`.

Curious how it works under the hood? Read my [blog post here](https://spblog.net/post/2020/03/24/spfx-overclockers-or-how-significantly-speed-up-the-gulp-serve-command).

> **IMPORTANT**
>
> `spfx-fast-serve` version `4.x` (current) supports SPFx starting from version 1.17. Read more [here](#which-sharepoint-framework-versions-are-supported)

## How to use

1. `npm install spfx-fast-serve -g`
2. Open a command line in a folder with your SharePoint Framework solution you want to speed up.
3. Run `spfx-fast-serve` and follow instructions. In most cases you shouldn't do anything specific and the CLI "just works".
4. Run `npm install`
5. Run `npm run serve` and enjoy the incredible speed of `serve` command!

## `fast-serve` CLI

The `spfx-fast-serve` command simply adds necessary things to run your `serve` faster. Among them, it installs `spfx-fast-serve-helpers` NodeJS package. The package contains the `fast-serve` CLI, which does all the magic "serve" things. Each CLI option could be provided as a command line parameter or could be stored inside the `fast-serve` configuration file under `<your SPfx project>/fast-serve/config.json`. The config file is not created by default, but you could create it using `fast-serve` CLI [commands](#fast-serve-commands).

### `fast-serve` CLI options

| option               | type    | defaults | description                                                                                                                                                                                                                                                                                     |
|----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `port`               | integer | 4321     | HTTP port to use to serve the bundles                                                                                                                                                                                                                                                           |
| `memory`             | integer | 8192     | Memory limits for the dev server in MB                                                                                                                                                                                                                                                          |
| `locale`             | string  | -        | Local code when running in a multi-language scenario, i.e. `--locale=nl-nl`                                                                                                                                                                                                                     |
| `config`             | string  | -        | Serve configuration to run on a startup. It works exactly the same as the OOB `gulp serve --config=[config-name]`                                                                                                                                                                               |
| `openUrl`            | string  | -        | URL to open on a startup. If empty, no URL will be opened. Supports SPFx {tenantDomain} placeholder                                                                                                                                                                                             |
| `loggingLevel`       | enum    | normal   | Logging level, 'minimal' notifies about errors and new builds only, 'normal' adds bundle information, 'detailed' displays maximum information about each bundle                                                                                                                                 |
| `fullScreenErrors`   | boolean | true     | Whether to show errors with a full-screen overlay on UI or not (only in console)                                                                                                                                                                                                                |
| `isLibraryComponent` | boolean | false    | Should be true, when running inside library component project type                                                                                                                                                                                                                              |
| `eslint`             | boolean | true     | When `true`, adds [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) to lint your code with `lintDirtyModulesOnly:true` option for performance                                                                                                                   |
| `hotRefresh`         | boolean | false    | Enables webpack's [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR). This feature is considered as experimental, meaning that you can try and use it if it works well for your project. Read [more here](/docs/HMR.md)                                    |
| `reactProfiling`     | boolean | false    | When `true`, enables react profiling mode through [React Chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). By default profiling doesn't work in SPFx solutions (even in dev mode).                                     |
| `containers`         | boolean | false    | Explicitly enables containerized environment support. By default, `fast-serve` automatically detects a containerized environment (like Docker) and applies needed configuration. But if it doesn't work for you, you can explicitly disable or enable support for containers using this option. |
| `debug`              | boolean | false    | Enables debug mode for `fast-serve`                                                                                                                                                                                                                                                             |

Here is a sample configuration:

```json
{
  "$schema": "https://raw.githubusercontent.com/s-KaiNet/spfx-fast-serve/master/schema/config.v2.schema.json",
  "serve": {
    "config": "my-config",
    "fullScreenErrors": false,
    "debug": true
  }
}
```

If you call `fast-serve` with the above configuration file, it will be the equivalent of calling the CLI with the below parameters (taken from file):

```bash
fast-serve --config=my-config --fullScreenErrors=false --debug
```

If you have the same option provided in both file and CLI, the CLI option will take the precedence.

### `fast-serve` commands

`fast-serve` CLI supports below commands:

- `fast-serve webpack extend` - adds fast-serve webpack extensibility file to the project. Read more on webpack extensibility [here](#webpack-extensibility)
- `fast-serve config add` - adds `fast-serve` configuration file to the project

## Migration between SPFx versions

The migration is as easy as just changing the version of `spfx-fast-serve-helpers` in your `package.json` to match the corresponding SPFx **minor** version (**do not** change the patch version).

For example, if your project is based on SPFx 1.17, then you have the below dependency:
 > "spfx-fast-serve-helpers": "~1.17.0"

 To migrate `fast-serve` to SPFx 1.18 you just need to change it like this (patch version should be `0`, we change only minor version):
> "spfx-fast-serve-helpers": "~1.18.0"

Reinstall all dependencies and that's it!

## Webpack extensibility

If you use custom webpack loaders or other webpack modifications via `build.configureWebpack.mergeConfig` feature, you should manually apply them to `webpack.extend.js` file created by the CLI to make everything work. Apply only those webpack modifications, which work on a regular `gulp serve` command, since `spfx-fast-serve` works only in development mode.  

By default, you don't have `webpack.extend.js` file. Run

```bash
npx fast-serve webpack extend
```

to create it. In this file you can put your own logic for webpack, it will not be overwritten by the subsequent `spfx-fast-serve` calls.

You can either provide custom `webpackConfig` object, which will be merged using [webpack-merge](https://github.com/survivejs/webpack-merge) module, or use `transformConfig` to even better control over configuration.

Check out [this sample](https://github.com/s-KaiNet/spfx-fast-serve/blob/master/samples/advanced/fast-serve/webpack.extend.js) to see how it works. The sample configures custom path aliases for SPFx.

## Which SharePoint Framework versions are supported

The latest `spfx-fast-serve@4.x` version supports SPFx 1.17 and onwards.

Version `3.x` supports SPFx 1.4.1 and above. If you need to run the tool for SPFx < 1.17, you could use `npx` tool for `npm` or `dlx` for `pnpm`:

```bash
npx -p spfx-fast-serve@3.0.7 -- spfx-fast-serve
```

```bash
pnpm --package=spfx-fast-serve@3.0.7 dlx spfx-fast-serve
```

You could also use [3.x branch](https://github.com/s-KaiNet/spfx-fast-serve/tree/3.x) to see the documentation for `3.x` version.

SharePoint 2016 is **NOT** supported.

## How it works

The tool adds necessary files to run your own webpack based build with webpack dev server. Technically it's a custom webpack build, which produces the same output files as SharePoint Framework build pipeline, but does it a lot faster, because of a number of improvements:

- all compilation are done in a memory with webpack, no additional "copy", "prepare", "typescript", "whatever" tasks.
- incremental TypeScript compilation when a file is being changed. It means only necessary files are compiled, not everything.
- asynchronous type checking and linting.

Also

- live reloading for hosted workbench, MS Teams host, mobile devices (with ngrok serve)
- debugging from VSCode with Chrome Debugger extension
- supports WSL2
- Hot Module Replacement (HMR) - experimental support
- doesn't mess up your default SPFx build. If you have troubles, simply switch back to regular `gulp serve`
- supports all major node package managers

## NGROK serve plugin

`spfx-fast-serve` supports ngrok as a proxy between webpack dev server and SharePoint. This is possible through the *NgrokServePlugin* webpack plugin. This option allows you to test your SPFx solution live on mobile devices in development mode.

Read more [here](/docs/NgrokServe.md) on how you can configure it.

## Library components

Please use [this guide](/docs/LibraryComponents.md) to configure `spfx-fast-serve` with library components.

## Privacy policy

`spfx-fast-serve` tracks every run using "fast serve" option. The "run" data includes time, when you run `npm run serve` and irreversible hash of computer name (to track unique computers). It **does NOT** collect nor store any personal, computer, network or project information. "Run" data needed to analyze, how many runs using "fast serve" scenario we have per day\month\year and what is the trend. Based on the data I can make a decision whether to further invest time into this project or not.

## Having troubles? Please try to find the answer under [FAQs](/docs/FAQ.md) or raise an issue
