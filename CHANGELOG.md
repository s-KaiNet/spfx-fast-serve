# Change Log

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
