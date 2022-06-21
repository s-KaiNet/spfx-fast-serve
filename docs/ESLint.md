# ESLint configuration

> **IMPORTANT**
>
> SPFx 1.15 and onwards uses ESLint for code linting. For these versions of SPFx you shouldn't configure ESLint according to the current doc, because now ESLint feature is implemented natively inside SPFx. Apply below configuration only if your SPFx version is less than 1.15.  

SPFx less than `1.15` uses TSLint which is currently [deprecated](https://github.com/palantir/tslint). You can configure [ESLint](https://eslint.org/) (which is a replacement for TSLint) to work with SharePoint Framework projects.

## Install the required packages

First of all, we need eslint and some essential related plugins. Let's install them:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin gulp-eslint7 eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

- `eslint` - is a linter itself
- `gulp-eslint7` - corresponding eslint gulp plugin (supports latest eslint)
- `eslint-plugin-react` - contains recommended rules for React-based projects
- `eslint-plugin-react-hooks` - react hooks lint rules
- `@typescript-eslint/parser` - a custom eslint parser, so that eslint understands what is TypeScript
- `@typescript-eslint/eslint-plugin` - contains recommended rules for TypeScript

## Create a file with rules

You can use the .eslintrc.json file to list all your rules (eslint follows [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), so you can use different config options).

This is the bare minimum configuration needed:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "ignorePatterns": ["*.js", "*.module.scss.ts", "*.d.ts"],
  "plugins": [
    "@typescript-eslint",
    "react-hooks"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ]
}
```

The essential things here are:

- `plugins` section contains definition for @typescript-eslint
- `parser` set to @typescript-eslint/parser
- `extends` defines a set of recommended rules for TypeScript and React

## Disable tslint task

Since we don't need tslint anymore, simply delete tslint.json. Open `gulpfile.js` and before initialization put a line

```javascript
build.tslintCmd.enabled = false;
```

That way we completely disabled the default tslint task.

## Enable ESLint for fast-serve

Open `./fast-serve/config.json` and add `eslint: true` under "serve" properties. That's it!

For performance reasons it lints only changed files (`lintDirtyModulesOnly: true`). If you need more control over [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin), then simply remove eslint setting (or set it to false `eslint: false`) and use [`webpack.extend.js`](https://github.com/s-KaiNet/spfx-fast-serve#webpack-extensibility) file to explicitly add `eslint-webpack-plugin` with the desired configuration.

## Configure a gulp task to run ESLint as part of the SPFx build

You can also add a custom ESLint task for your SPFx build. Again edit `gulpfile.js` and insert the below code:

```typescript
const eslint = require('gulp-eslint7');

const eslintSubTask = build.subTask('eslint', function (gulp, buildOptions, done) {
  return gulp.src(['src/**/*.{ts,tsx}'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

build.rig.addPreBuildTask(eslintSubTask);
```
