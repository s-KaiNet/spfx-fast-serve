# SPFx Fast Serve Tool

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

## Which SharePoint Framework versions are supported

If you develop for SharePoint Online, simply use the latests version of the tool.  
If you target is SharePoint 2019 (which uses SharePoint Framework 1.4.1), then run specific `spfx-fast-serve` version with SP 2019 support:

```bash
npx spfx-fast-serve@1.4.x
```

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

With `spfx-fast-serve` you will be able to significantly reduce the time from code change to a page refresh in a browser (a few times faster than the  default `gulp serve` command).

## Known issues

- you may loose formatting in your `package.json` and `gulpfile.js` because the tool doesn't respect original file formatting (tabs vs whitespace, size, etc.). You have to fix it afterwards, if needed.
- every time you introduce a new dependency for your solution, you should re-run `npm run serve` command, so that it picks up all new dependencies correctly.
- when you modify localization .js files, live reload doesn't work. You should reload manually
- if you use custom webpack loaders or other webpack modifications via `build.configureWebpack.mergeConfig` feature, you should manually apply them to `webpack.js` file created by the cli to make everything work
- React Hot Module Replacement (aka HMR) is not supported. I tried different things, but was not able to make it work. If you have ideas, please welcome to issues or PRs :)

## Manual merge warning

As part of the steps, `spfx-fast-serve` modifies your `gulpfile.js`. In most cases it smoothly merges all required stuff. However, in case if you use `build.configureWebpack.mergeConfig` in your code, the tool is unable to perform merge correctly. In that case you should do manual merge.  

Simply locate you code with `build.configureWebpack.mergeConfig` and insert the line

```javascript
fs.writeFileSync("./temp/_webpack_config.json", JSON.stringify(generatedConfiguration, null, 2));
```

at the beginning of your `additionalConfiguration` callback method.  
For example:

```javascript
  build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {

      fs.writeFileSync("./temp/_webpack_config.json", JSON.stringify(generatedConfiguration, null, 2)); // <-- the needed line

      // your stuff goes here

      return generatedConfiguration;
    }
  });
```

Additionally at the top of your `gulpfile.js` add `fs` tool import: `const fs = require("fs");`. 

That's it!

---
Please use [issues](https://github.com/s-KaiNet/spfx-fast-serve/issues) for questions, suggestions and, of course, issues.
