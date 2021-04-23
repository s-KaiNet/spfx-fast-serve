# SPFx 1.12 notes

SPFx 1.12 changed file name handling for webpack entry points and for resource files. It uses format `[name]_[locale].js`.
In order to make it work with `spfx-fast-serve` correctly, you have to proxy requests from `[resource package name]_[locale].js` for resources to the corresponding files from webpack output inside `spfx-fast-serve`.

`spfx-fast-serve` uses `[name]` format for filename. So the idea is to extract all `localizedResources` keys from `./config/config.json`, then match them to the entry in `./temp/manifest.json` to handle resources. To handle entry points mapping we can just use a function for webpack's `filename` property. In that function return the same file name, as SPFx returns back, based on `manifests.json`.

Webpack dev server has `proxy` configuration. You can use `context` function to specify which requests need to be proxied and `pathRewrite` function to replace source path with another one.

How to handle resources:

1. Open `./config/config.json` and save all `localizedResources` key values.
2. Open `./temp/manifests.json` and find `loaderConfig.scriptResources` for corresponding entry point. Save path as a key, locale code, map path as values.
3. In `context` function check if saved map contains key which should be equal to a file name, ie. `HelloWorldWebPartStrings_en-us.js`
4. In `pathRewrite` extract map path by key, replace locale code and return a new path.

Sample `localizedResources`:

```json
"localizedResources": {
    "SearchResultsWebPartStrings": "lib/webparts/searchResults/loc/{locale}.js",
    "CommonStrings": "lib/loc/{locale}.js",
    "ControlStrings": "node_modules/@pnp/spfx-controls-react/lib/loc/{locale}.js",
    "PropertyControlStrings": "node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js",
    "SearchFiltersWebPartStrings": "lib/webparts/searchFilters/loc/{locale}.js",
    "SearchBoxWebPartStrings": "lib/webparts/searchBox/loc/{locale}.js",
    "SearchVerticalsWebPartStrings": "lib/webparts/searchVerticals/loc/{locale}.js"
  }
```

Sample `scriptResources`:

```json
"scriptResources": {
 "BasicWebpartWebPartStrings": {
  "type": "localizedPath",
  "paths": {
   "en-US": "BasicWebpartWebPartStrings_en-us.js",
   "nl-NL": "BasicWebpartWebPartStrings_nl-nl.js"
  },
  "defaultPath": "BasicWebpartWebPartStrings_en-us.js"
 }
}
```

Sample saved map:

```json
{
  "BasicWebpartWebPartStrings_en-us.js": {
    "locale": "en-us",
    "mapPath": "src/webparts/helloWorld/loc/en-us.js"
  },
    "BasicWebpartWebPartStrings_nl-nl.js": {
    "locale": "nl-nl",
    "mapPath": "src/webparts/helloWorld/loc/nl-nl.js"
  }
}
```
