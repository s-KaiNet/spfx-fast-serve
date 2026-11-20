# Library components

![SPFx](https://img.shields.io/badge/SPFx-1.24.1-green.svg)

`spfx-webparts` depends on the `corporate-library` library component from `spfx-library` through a link (`"corporate-library": "file:../spfx-library"`). `fast-serve` compiles the linked library from its `src` into the web part bundles, with hot updates. Read more in the [library components](../../README.md#library-components) section.

## How to run

1. Run `npm install` in `./spfx-library` and then inside `./spfx-webparts`
2. Run `npm run serve` inside `./spfx-webparts`. You don't need to build or start anything in `./spfx-library`.