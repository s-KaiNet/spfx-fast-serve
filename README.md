# :rocket: SPFx Fast Serve Tool

A command line utility, which modifies your SharePoint Framework solution, so that it runs continuous `serve` command as fast as possible.

---

Compare "refresh" time (the time needed to compile your project when you change a file and start refreshing a page in a browser):
> NOTE: The actual time depends on the environment, hardware, but at least you can see the difference

|                                                                                     | gulp serve | spfx-fast-serve |
| ----------------------------------------------------------------------------------- | ---------- | --------------- |
| Default "Hello World" <br> React web part                                           | 3-5 sec    | 0.3-0.5 sec     |
| [PnP Modern Search solution](https://github.com/microsoft-search/pnp-modern-search) | 28-34 sec  | 2-4 sec         |
| [SP Starter Kit solution](https://github.com/SharePoint/sp-starter-kit) (v1)        | 40-50 sec  | 2-3 sec         |

Read more info in my [blog post here](https://spblog.net/post/2020/03/24/spfx-overclockers-or-how-significantly-speed-up-the-gulp-serve-command).

## How to use

1. `npm install spfx-fast-serve -g`
2. Open a command line in a folder with your SharePoint Framework solution you want to speed up.
3. Run `spfx-fast-serve` and follow instructions. In most cases you shouldn't do anything specific and the cli "just works".
4. Run `npm install`
5. Run `npm run serve` and enjoy the incredible speed of `serve` command!

## Migration to 2.x version

> **IMPORTANT!**  
> SharePoint Framework 1.12 and onwards is supported starting from `2.x` version of `spfx-fast-serve`.
>
> Minimal supported NodeJS version for SPFx 1.12 and up is `12.x`.

Please use [this guide](/docs/Upgrade%20to%202x.md) if you're planning to migrate your project to `spfx-fast-serve` 2.x.  

If your project is based on SPx 1.11 and you already use fast-serve `2.x` for your project and planning to migrate to SPFx 1.12, then after migration you should run `spfx-fast-serve` again, so that it adds the needed dependencies and updates `webpack.js`. `fast-serve 2.x` uses different webpack.js and newer dependencies for SPFx 1.12.

## Webpack extensibility

Starting from version `2.x`, the library supports webpack extensibility.
In a `./fast-serve` folder you have a file called `webpack.extend.js`. In this file you can put your own logic for webpack, it will not be overwritten by subsequent `spfx-fast-serve` calls.

You can either provide custom `webpackConfig` object, which will be merged using [webpack-merge](https://github.com/survivejs/webpack-merge) module, or use `transformConfig` to even better control over configuration.

Check out [this sample](https://github.com/s-KaiNet/spfx-fast-serve/blob/master/samples/advanced/fast-serve/webpack.extend.js) to see how it works. The sample configures custom path aliases for SPFx.

## Configuration options

Starting from version `2.x`, the library saves your CLI arguments and serve options into the configuration file. The file is located under `./fast-serve/config.json`.

Currently below configuration values are available for `serve`:

- `open` - boolean, default `true`, whether to open a workbench url on startup
- `openUrl` - string, default `undefined`, which url to open. If empty, local workbench will be opened
- `loggingLevel` - string, default `normal`, valid values are `"minimal", "normal", "detailed"`. `minimal` notifies about errors and new builds only, `normal` adds bundle information, `detailed` adds details about each bundle.
- `fullScreenErrors` - boolean, default `true`, whether to show full-screen (overlay) errors. Corresponds to [webpack's dev server overlay](https://webpack.js.org/configuration/dev-server/#devserveroverlay)

Here is a full configuration example:

```json
{
  "$schema": "https://raw.githubusercontent.com/s-KaiNet/spfx-fast-serve/master/schema/config.1.0.schema.json",
  "cli": {
    "isLibraryComponent": false,
    "usePnpm": false,
    "useRestProxy": false
  },
  "serve": {
    "open": true,
    "openUrl": "https://<org>.sharepoint.com/sites/dev/_layouts/15/workbench.aspx",
    "fullScreenErrors": true,
    "loggingLevel": 'normal'
  }
}

```

## Which SharePoint Framework versions are supported

SharePoint Online and SharePoint 2019, which basically means SharePoint Framework 1.4.1 and above.

SharePoint 2016 is **NOT** supported.

## How it works

The tool adds necessary files to run your own webpack based build with webpack dev server. Technically it's a custom webpack build, which produces the same output files as SharePoint Framework build pipeline, but does it a lot faster, because of a number of improvements:

- all compilation are done in a memory with webpack, no additional "copy", "prepare", "typescript", "whatever" tasks.
- incremental TypeScript compilation when a file is being changed. It means only necessary files are compiled, not everything.
- asynchronous type checking and linting.

Also

- supports local and hosted workbench
- live reloading (for hosted workbench as well)
- debugging from VSCode with Chrome Debugger extension
- doesn't mess up your default SPFx build. If you have troubles, simply switch back to regular `gulp serve`
- adds only ~30 MB to your `node_modules` folder

With `spfx-fast-serve` you will be able to significantly reduce the time from code change to a page refresh in a browser (a few times faster than the default `gulp serve` command).

## Library components

Please use [this guide](/docs/LibraryComponents.md) to configure `spfx-fast-serve` with library components.

## SharePoint Rest Proxy aka [sp-rest-proxy](https://github.com/koltyakov/sp-rest-proxy) support

If you want to use `sp-rest-proxy`, simply run

```bash
spfx-fast-serve --rest-proxy
```

It will add `sp-rest-proxy` support. You can find an example with [PnPjs](https://pnp.github.io/pnpjs) and built-in `SPHttpClient` under `samples/sp-rest-proxy`  

**NOTE**: to make it work, you should have `config/private.json` credential file available with your credentials for SharePoint site. Alternatively, you can modify generated `webpack.js` and provide path or credentials explicitly.

## [pnpm](https://pnpm.js.org/) support

`pnpm` resolves modules a bit differently, when it comes to nested modules. Thus if you use `pnpm` as your package manager, add `--pnpm` parameter when running `spfx-fast-serve`

## Privacy policy

`spfx-fast-serve` tracks every run using "fast serve" option. The "run" data includes time, when you run `npm run serve` and irreversible hash of computer name (to track unique computers). It **does NOT** collect nor store any personal, computer, network or project information. "Run" data needed to analyze, how many runs using "fast serve" scenario we have per day\month\year and what is the trend. Based on the data I can make a decision whether to further invest time into this project or not.

## Having troubles? Please try to find the answer under [FAQs](/docs/FAQ.md) or raise an issue
