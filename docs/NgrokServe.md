# NGROK serve plugin

That's a new webpack plugin from "spfx-fast-serve-helpers" module, aimed to make mobile testing a bit easier.

## The problem

This is something completely new introduced for SPFx 1.13 and onwards. SPFx 1.13 added a new type of extension called [Adaptive Cards](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/viva/get-started/build-first-sharepoint-adaptive-card-extension). Mostly it's used inside Viva Connection Dashboards and mobile experiences. In the hosted workbench you can test adaptive cards. But what if you want to continue local development and see how it looks like inside your Viva MS Team's mobile app? Of course, you can use mobile view in dev tools, however on the actual device, it might be different. Or what if you have a bug, which is reproducible on a mobile device only?

With spfx-fast-serve you can create a kind of proxy between your locally running dev server and Viva app, loading development javascript. You can use the [ngrok](https://ngrok.com/) tool as such a proxy and the _NgrokServePlugin_ from spfx-fast-serve. This approach works also for Teams Tabs if you wish to test them on mobile.

## How to configure

### Scaffold a new project

You can use existing or just scaffold a brand new SPFx project with an adaptive card extension. Make sure to set _Do you want to allow the tenant admin the choice of being able to deploy the solution to all sites immediately without running any feature deployment or adding apps in sites?:_ **Yes.**

### Run ngrok

Ngrok service will act as a proxy to our locally hosted javascript sources. So run ngrok first:

```bash
ngrok http https://localhost:4321
```

You will see something like below:

[![](/img/ngrok.jpg)](image)

Take a note of ngrok host URL and save it, we'll need it later. In my case, it will be "_657f90095ec8.ngrok.io_".

### Update configuration

Open _config/serve.json_ and change configuration -"port": 443, "hostname": "657f90095ec8.ngrok.io". This is the whole configuration (for the default scaffolded project):

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json",
  "port": 443,
  "hostname": "657f90095ec8.ngrok.io",
  "https": true,
  "initialPage": "https://localhost:5432/workbench",
  "api": {
    "port": 5432,
    "entryPath": "node_modules/@microsoft/sp-webpart-workbench/lib/api/"
  }
}
```

Now open _fast-serve/webpack.extend.js_ and add _NgrokServePlugin_plugin (use the same host as before for the "host" plugin parameter):

```js
const { NgrokServePlugin } = require("spfx-fast-serve-helpers");

// you can add your project related webpack configuration here, it will be merged using webpack-merge module
// i.e. plugins: [new webpack.Plugin()]
const webpackConfig = {
  plugins: [new NgrokServePlugin({ host: "657f90095ec8.ngrok.io" })]
}
```

Why webpack plugin and not a configuration setting? What if you want to run ngrok from javascript using API? In that case, the URL will be different every time (unless you use the paid account of course). What if in the future I will have to introduce additional parameters? The last argument is that I don't expect this feature will be used frequently. That's why the webpack plugin.

### Build, package and deploy it

Now you should build and package. The trick is to use dev build and not production (without --ship parameters). So run:

```bash
    gulp bundle
    gulp package-solution
```

Go to the tenant app catalog and globally deploy the app.

Now, if you add the webpart or adaptive card to any page, it will request javascript sources from ngrok URL, which is mapped to your localhost server.

### Add to the Viva Dashboard and test it

Inside the solution folder run

```bash
npm run serve
```

Go to your Viva Dashboard and add the adaptive card. The card should be available and fully functional using a desktop browser. Usually the dashboard URL is <your sharepoint home site url>/SitePages/Dashboard.aspx.

If it works inside Dashboard, you can open the mobile app and see it in the mobile dashboard as well! Change the code and your changes will be reflected in both mobile and desktop dashboards.

The below video demonstrates how it works:

<https://user-images.githubusercontent.com/10658276/138932110-7c187d3a-ac61-495f-84ef-01829985cb92.mp4>

You can use this approach not only for adaptive cards but actually for any SPFx component. For example, you can see how your Teams tab looks like on the mobile Teams experience and update it live!
