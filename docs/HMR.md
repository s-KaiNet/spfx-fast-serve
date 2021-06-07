# HMR with SharePoint Framework

## Prerequisites

### SPFx 1.12+

It works only for SPFx starting from version 1.12 and above.

### TypeScript 4+

By default, SPFx 1.12 is shipped with TypeScrpt 3.7. To update to TypeScript 4 you should uninstall dev dependency "*@microsoft/rush-stack-compiler-3.7*" and install 4.2 instead:  

```
npm uninstall @microsoft/rush-stack-compiler-3.7 --save-dev
npm install @microsoft/rush-stack-compiler-4.2 --save-dev
```

Then update tsconfig.json so that it extends the 4.2 version instead of 3.7:

```
"extends": "./node_modules/@microsoft/rush-stack-compiler-4.2/includes/tsconfig-web.json",
```

TypeScript 4+ doesn't support tslint (tslint is deprecated). Thus you should disable the tslint task in your `gulpfile.js`:

```
build.tslintCmd.enabled = false;
```

Otherwise, the build will fail. As an alternative to tslint, you can use [eslint](https://spblog.net/post/2020/12/22/sharepoint-framework-with-eslint).

## Full page refresh

Sometimes it performs a full page refresh instead of a partial update. That's ok because the HMR feature is smart enough to detect when a partial update is available. If you component depends on external state or performs HTTP requests, then most likely a full-page refresh will be executed. Partial update works well only for small single-purpose components without lots of dependencies.

## Experimental

At the time being this feature is marked as experimental, because I can't guarantee that it works on all different cases and configurations. Also, it relies on some nodejs modules, which are still in development. And the last thing, it requires TypeScript 4+ which is not the default for SPFx yet. Thus my recommendation is to try it if you wish. If it works for your project - then use it. In future versions of SPFx, this feature should be more stable.
