# Change Log

## [3.0.7] - 17 Sep 2023

### Features

- grammar fix
- added additional webpack parameter to the extend function

## [3.0.6] - 19 Nov 2022

### Fixed

- `-rc.[number]` now also recognized as beta SPFx version

## [3.0.5] - 11 Mar 2021

### Features

- minor changes

## [3.0.4] - 11 Mar 2021

### Features

- self-update checker

## [3.0.3] - 09 Dec 2021

### Features

- automatic "beta" detection

## [3.0.2] - 10 Jun 2021

### Features

- schema changed to support latest SPFx
- minor improvements

## [3.0.1] - 08 Jun 2021

### Features

- added `port` option to support more than one library component projects

### Features

- moved all the logic into a separate package
- deprecated `--usePnpm` (now supported OOB) and `--useRestProxy` (supported via webpack extensibility)
- simplified SPFx migration process

## [2.1.1] - 09 May 2021

### Features

- added a message about potential webpack modifications

## [2.1.0] - 08 May 2021

### Features

- significantly simplified `gulpfile.js` merging

## [2.0.4] - 08 May 2021

### Features

- "manual merge" was removed in favor of a better solution

## [2.0.3] - 06 May 2021

### Fixed

- [CSS module system applied twice to third party js libs](https://github.com/s-KaiNet/spfx-fast-serve/issues/22). css-loader changed the default behavior for modules and now it's ON by default.

## [2.0.2] - 06 May 2021

### Features

- simplified localized resource resolution process

## [2.0.1] - 05 May 2021

### Fixed

- [a problem with localized resources inside library component](https://github.com/s-KaiNet/spfx-fast-serve/issues/21)

## [2.0.0] - 30 Apr 2021

Full codebase re-write with TypeScript, better extensibility and SPFx 1.12 support.

## [1.11.0] - 13 Dec 2020

### Features

- added better support for pnpm package manager

## [1.10.13] - 24 May 2020

### Fixed

- wrong file loader Regexp

## [1.10.12] - 20 May 2020

### Features

- added support for sp-rest-proxy

## [1.10.11] - 04 May 2020

### Features

- simplified library components configuration

## [1.10.9 - 1.10.10] - 30 Apr 2020

### Features

- added `writeToDisk:false` by default

### Fixed

- prevent deletion of .manifest files from `/dist` since they needed for library components

## [1.10.7 - 1.10.8] - 29 Apr 2020

### Fixed

- an error is thrown when trying to generate files for library components
- simplified port settings inside webpack.js file

## [1.10.5 - 1.10.6] - 24 Apr 2020

### Fixed

- webpack config for SPFx 1.7.x and 1.4.x
- Bundles loading issue [#4](https://github.com/s-KaiNet/spfx-fast-serve/issues/4)

## [1.10.4] - 29 Mar 2020

### Features

- refactored to support different SharePoint Framework versions in the same branch

## [1.10.3] - 28 Mar 2020

### Features

- minimized webpack output - small performance gain

## [1.10.2] - 28 Mar 2020

### Fixed

- VSCode Chrome debugging issue
- css modules class names are not generated with original class name as a prefix
- out of memory for some projects - fixed with cross-env and `NODE_OPTIONS=--max_old_space_size=4096`
- `.scss` files were treated as modules, thus break css styling
- on a clean project sometimes it throws `Cannot find module './<Component>.module.scss'`

## [1.10.1] - 24 Mar 2020

### Fixed

- default `*.module.scss.ts` conflicts with webpack loader generated `*.module.scss.d.ts`

## [1.10.0] - 23 Mar 2020

### Initial release
