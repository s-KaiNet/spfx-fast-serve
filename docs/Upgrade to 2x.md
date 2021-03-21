# How to upgrade to 2.x version from 1.x

1. Run `npm install spfx-fast-serve -g`
2. Run `spfx-fast-serve` in the project folder (don't forget other CLI options if you initially used them)
3. Delete `webpack.js` file. If you have any custom modifications inside `webpack.js`, you should manually move them to a new `fast-serve/webpack.extend.js` file (will be merged with the default `fast-serve/webpack.js`).
4. Run `npm i`
5. Run `npm run serve`
