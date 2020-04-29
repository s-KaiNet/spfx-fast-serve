# Change Log

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
