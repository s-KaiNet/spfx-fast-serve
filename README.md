# SPFx Fast Serve Tool

A command line utility, which modifies your SharePoint Framework solution, so that it runs continues `gulp serve` command as fast as possible. 

## How to use

1. `npm install spfx-fast-serve -g`
2. Open a command line in a folder with your SharePoint Framework solution you want to speed up.
3. run `spfx-fast-serve` and follow instructions. In most cases you shouldn't do anything and tool "just works".
4. run `npm install`
5. run `npm run serve` and enjoy incredible speed of `serve` command!

## How it works

The tool adds necessary files to run your own webpack based build with webpack dev server. Technically it's the same build used by SharePoint Framework pipeline, but a lot faster, because all bundling are done in memory, incremental TypeScript compilation is used, some other performance tricks are also applied. 

With `spfx-fast-serve` you will be able to reduce the time from TypeScript code change in vscode to browser refreshes a page to just 400ms-3s (depending on a project size).

Read more info in my blog post here. 

## Known issues

- you may loose formatting in your `package.json` and `gulpfile.js` because the tool doesn't respect original file formatting (tabs vs whitespace, size, etc.). You have to fix it afterwards, if needed. 
- every time you introduce a new dependency for your solution, you should re-run `npm run serve` command, so that it picks up all dependencies correctly. 

## Manual merge warning

As part of the steps, `spfx-fast-serve` modifies your `gulpfile.js`. In most cases it smoothly merged required stuff. However, in case if you use `build.configureWebpack.mergeConfig` in your code, the tool is unable to correctly perform merge. In that case you should do manual merge.   

Simply locate you code with `build.configureWebpack.mergeConfig` and insert the line 

```javascript
fs.writeFileSync("./temp/_webpack_config.json", JSON.stringify(generatedConfiguration, null, 2));
```
 at the bigining of your `additionalConfiguration` callback method.   
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