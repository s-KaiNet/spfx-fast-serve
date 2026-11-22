# :rocket: SPFx Fast Serve

A fast dev server for SharePoint Framework **1.24+** projects. Blazingly fast start, lightning-quick incremental updates with HMR and React Fast Refresh (no full page reloads), and a much smaller memory footprint.

> [!IMPORTANT]
>
> **Looking for the previous version?** `spfx-fast-serve` 4.x (the `spfx-fast-serve` CLI for gulp-based SPFx 1.17 - 1.21) is documented in the [4.x branch](https://github.com/s-KaiNet/spfx-fast-serve/tree/4.x).

## Highlights

- **Fast start:** ready in about 1-2 seconds, where `heft start` needs 13-19 seconds on the same projects.
- **Fast edits:** a rebuild takes 50-150 ms, and the change is on the page 0.1-0.3 s after you save. React components keep their state (Fast Refresh), styles are swapped without a reload. No full page reloads!
- **Zero config:** one dev dependency and one npm script. No global CLI, no changes to your build. Works in development mode only: production builds, packaging and deployment stay on Heft.
- **Less memory:** 2x-3x less memory usage in development.

## Quick start

Install the package in your SPFx project and run it:

```bash
npm install --save-dev spfx-fast-serve-helpers@beta
npx fast-serve
```

Optionally, add a script to `package.json` and run `npm run serve`:

```json
"scripts": {
  "serve": "fast-serve"
}
```

> [!TIP]
>
> **`ERESOLVE` error mentioning `css-loader` during `npm install`?** Update `css-loader` in the same command: `npm install --save-dev css-loader@^7.1.4 spfx-fast-serve-helpers@beta`, or install with `--legacy-peer-deps`: `npm install --save-dev spfx-fast-serve-helpers@beta --legacy-peer-deps`.

## Configuration

Every option can be set as a command-line flag or in the optional `fast-serve/config.json` file.

| Option               | Flag                | Default   | Description                                                                                                                     |
| -------------------- | ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `port`               | `-p, --port <port>` | `4321`    | HTTPS port on `localhost`. Falls back to `port` from `config/serve.json`                                                        |
| `pageUrl`            | `--page-url <url>`  | -         | SharePoint page to open with the debug query. Supports the `{tenantDomain}` placeholder                                         |
| `locale`             | `--locale <locale>` | `en-us`   | Locale of the localized strings, for example `nl-nl`. Missing resources fall back to `en-us`                                    |
| `serveConfiguration` | `--config <name>`   | `default` | Serve configuration from `config/serve.json` to use (`--serve-config` works too)                                                |
| `overlay`            | `--no-overlay`      | `true`    | Show compile and runtime errors in an overlay over the page. Errors always go to the terminal and the browser console           |
| `deployedLibraries`  | (config file only)  | `[]`      | Package names of [linked library components](#library-components) to load from SharePoint instead of compiling them from source |

Other flags: `-h, --help` prints the help, `-v, --version` prints the version.

### `fast-serve/config.json`

```jsonc
{
  "port": 4321,
  "pageUrl": "https://{tenantDomain}/sites/dev/SitePages/test.aspx",
  "locale": "en-us",
  "serveConfiguration": "default",
  "overlay": true,
  "deployedLibraries": [],
}
```

An unknown key or a wrong value type stops `fast-serve` with the list of supported keys. Editing the file restarts the server.

### `{tenantDomain}`

`{tenantDomain}` in the page URL is replaced with the `SPFX_SERVE_TENANT_DOMAIN` environment variable, the same variable `heft start` uses:

```bash
# PowerShell
$env:SPFX_SERVE_TENANT_DOMAIN="contoso.sharepoint.com"
# bash
export SPFX_SERVE_TENANT_DOMAIN=contoso.sharepoint.com
```

## Customizing the Rspack config

`fast-serve` doesn't run heft's webpack config, so heft customizations (`config/spfx-customize-webpack.js`, `config/webpack-patch.json`) don't apply to it. Mirror what development needs in **`fast-serve/rspack.extend.mjs`**:

```js
import path from "node:path";
import { defineConfig, rspack } from "spfx-fast-serve-helpers";

export default defineConfig(({ root, port }) => ({
  plugins: [
    new rspack.DefinePlugin({
      CONTOSO_API: JSON.stringify("https://api.contoso.com"),
    }),
  ],
  resolve: {
    alias: { "@src": path.join(root, "src") },
  },
  devServer: {
    headers: { "X-Contoso": "dev" },
  },
}));
```

> [!TIP]
>
> **Using a coding agent?** The package ships a skill that translates a heft webpack customization into `rspack.extend.mjs`: `node_modules/spfx-fast-serve-helpers/skills/fast-serve-rspack-config/SKILL.md`.

## Library components

A library component project that your project depends on **through a link** is compiled from its `src` into your bundles, with hot updates. You run one command in the consumer project; nothing to build or start in the library.

```bash
cd corp-lib && npm install
cd ../my-web-parts
npm install ../corp-lib    # or npm link, pnpm "link:" / "workspace:", npm / yarn workspaces
npm run serve
```

## Serving through a tunnel

The debug query works on `localhost` only. For Teams and Viva Connections on mobile, or bugs you can only reproduce on a device, `fast-serve` can serve a **deployed development package** through a tunnel you run yourself.

1. Start a tunnel with a fixed host name that forwards to `https://localhost:4321` without verifying the certificate, for example [Microsoft Dev Tunnels](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/) (`devtunnel host -p 4321 --protocol https --allow-anonymous`), a named Cloudflare Tunnel, or ngrok with a paid fixed domain.
2. In `config/serve.json` set `"hostname": "<tunnel host>"` and `"port": 443`.
3. Build and deploy a development package once: `heft build` and `heft package-solution` **without** `--production`, then upload `sharepoint/solution/*.sppkg` to the app catalog.
4. Add the plugin to `fast-serve/rspack.extend.mjs`:

   ```js
   import { defineConfig, TunnelServePlugin } from "spfx-fast-serve-helpers";

   export default defineConfig(() => ({
     plugins: [new TunnelServePlugin({ host: "my-tunnel.example.com" })],
   }));
   ```

5. Run `fast-serve` and open the page **without** the debug query, in a new tab.

HMR, the error overlay and terminal error forwarding work through the tunnel. Rebuild and redeploy the package when the tunnel host or the manifests change (new components, new externals); code edits don't need it.

> [!WARNING]
>
> - Free ngrok doesn't work: its warning page answers script requests with HTML.
> - Your dev server is public while the tunnel runs. Stop the tunnel when you're done and never deploy the development package to a production app catalog.
> - The development package replaces the deployed app with the same id.

## HMR

| You edit                                                                                        | Result                                                     |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| A `.tsx` / `.ts` module that exports only React components                                      | Hot update, state kept (Fast Refresh)                      |
| `.module.scss`, `.scss`, `.css`                                                                 | Styles swapped without a reload                            |
| Localized strings used only by components                                                       | Hot update                                                 |
| A web part, extension or ACE class                                                              | Page reload                                                |
| A new import of an SPFx library or a `config/config.json` external                              | Page reload                                                |
| `package.json`, `config/*.json`, `fast-serve/config.json`, tsconfig, manifests, the extend file | `fast-serve` restarts in under a second, open pages reload |

Several bundles on one page all hot-update. Keep one-time setup (icons, PnPjs, listeners) in `onInit`, not at module level: module code runs again on every hot update.

## Versioning

The `spfx-fast-serve-helpers` version follows the SPFx **minor** version: SPFx 1.24 projects use `spfx-fast-serve-helpers` 1.24.x. For SPFx 1.21 and earlier, see the [4.x branch](https://github.com/s-KaiNet/spfx-fast-serve/tree/4.x).

## Performance

Measured on Linux, Node 24, Rspack 2.3:

|                                 | Small project (5 bundles, 7 components) | Large project (1000 modules, 2 bundles) |
| ------------------------------- | --------------------------------------- | --------------------------------------- |
| Start, no cache                 | ≈1.2 s                                  | ≈2.5 s                                  |
| Start with the persistent cache | ≈0.6 s                                  | ≈0.95 s                                 |
| Rebuild after an edit           | 50-110 ms                               | 65-140 ms                               |
| Save → change on the page       | 120-170 ms                              | 180-270 ms                              |

The persistent cache lives in `temp/fast-serve/cache` and is invalidated automatically when dependencies, configuration files or the extend file change. Delete the folder to reset it, or set `cache: false` in the extend file to turn it off.

## How it works

`fast-serve` doesn't use heft or webpack at development time. It builds its own Rspack configuration from your project (`config/config.json` bundles, manifests, `config/serve.json`, tsconfig, Sass settings) and produces what SharePoint expects from `heft start`: one AMD bundle per bundle in `config/config.json`, served from memory, plus a debug `manifests.js`.

- TypeScript is compiled per file with SWC, Sass with your project's Sass and `@microsoft/sp-css-loader`, so CSS module class names and theme tokens match heft's.
- SPFx libraries (`@microsoft/sp-*`) and `config/config.json` externals stay external and are loaded by SharePoint, at the tenant's version.
- All bundles share one compilation, so HMR and Fast Refresh work across several web parts on the same page.

## Privacy

`fast-serve` doesn't collect any usage data.

## License

MIT
