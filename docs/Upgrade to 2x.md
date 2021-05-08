# How to upgrade to 2.x version from 1.x

1. Run `npm install spfx-fast-serve -g`
2. Remove `fast-serve` related code from your `gulpfile.js`. `2.1` version uses more robust way of injecting into your `gulpfile`.
3. Run `spfx-fast-serve` in the project folder (don't forget other CLI options if you initially used them)
4. Delete `webpack.js` file. If you have any custom modifications inside `webpack.js`, you should manually move them to a new `fast-serve/webpack.extend.js` file (will be merged with the default `fast-serve/webpack.js`).
5. Delete `node_modules` and `package-lock.json`
6. Run `npm i`
7. Run `npm run serve`
