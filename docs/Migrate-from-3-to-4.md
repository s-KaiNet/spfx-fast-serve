# How to migrate your SPFx solution to spfx-fast-serve 4.x

> **IMPORTANT**
>
> `spfx-fast-serve@4.x` supports SPFx 1.17+, you cannot migrate for earlier versions.

## Steps

Good news - everything is fully backward-compatible! If you don't want to apply any steps, you could leave it as is.

However, `spfx-fast-serve@4.x` introduced some improvements and simplicity, which is recommended to apply to your SPFx solution.

1. Fix `serve` command in `package.json` scripts.
  
   In version 3.x the command was `"gulp bundle --custom-serve --max_old_space_size=4096 && fast-serve"`, now you could use just `fast-serve`, everything is handled internally. If you have customized `serve` command, consider [available options](../README.md#fast-serve-cli-options) to migrate your customizations.
2. If you don't have any customizations inside `fast-serve/webpack.extend.js` file, you could delete it.
3. If you use just default [settings](../README.md#fast-serve-cli-options) inside `fast-serve/config.json` (like `"isLibraryComponent": false`), then you could also delete the whole config file.
