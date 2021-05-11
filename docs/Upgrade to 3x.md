# How to upgrade to 3.x version from **any** earlier version

1. Run `npm install spfx-fast-serve -g`
2. Remove `fast-serve` related code from your `gulpfile.js`. `3.x` version uses more robust way of injecting into your `gulpfile`.
3. Remove now obsolete `spfx-fast-serve` dependencies from `package.json` (be careful and do not remove the dependency, if it's part of your project and not related `spfx-fast-serve`):
    - `webpack`
    - `webpack-cli`
    - `webpack-dev-server`
    - `webpack-merge`
    - `del`
    - `css-loader`
    - `css-modules-typescript-loader`
    - `fork-ts-checker-webpack-plugin`
    - `node-sass`
    - `sass-loader`
    - `style-loader`
    - `ts-loader`
4. Run `spfx-fast-serve` in the project folder (don't forget other CLI options if you initially used them)
5. Delete `<project root>/webpack.js` and `<project root>/fast-serve/webpack.js` (if you have it) file. If you have any custom modifications inside `webpack.js`, you should manually move them to a new `fast-serve/webpack.extend.js` file (will be merged with the default `fast-serve/webpack.js`).
6. Delete `node_modules` and `package-lock.json`
7. Run `npm i`
8. Run `npm run serve`
