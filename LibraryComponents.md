# How to configure `spfx-fast-serve` with library components  

There are two supported ways of managing library components with `spfx-fast-serve`:

- [the easiest and the most common approach](#the-easiest-approach)
- [using Lerna.js](#using-lernajshttpslernajsorg)

## The easiest approach

Using this option you just need to scaffold library components, webpart project and add `spfx-fast-serve`.

### How to configure

1. Scaffold two projects - library component inside `spfx-library` folder (I will use `corporate-library` as a library component name) and regular web part project into another folder `spfx-webparts`.

2. Inside `spfx-webparts` run

   ```bash
   spfx-fast-serve
   ```

3. Inside `spfx-library` run

   ```bash
   spfx-fast-serve --library-component
   ```

4. In both folders run

   ```bash
   npm install
   ```

   to restore dependencies.

5. Inside `spfx-webparts` add dependency on `corporate-library` by running below command:

   ```bash
   npm install ../spfx-library --save
   ```

   That's a special syntax, supported by npm, which installs dependency from parent **folder** name. It searches for `package.json` and adds corresponding dependency using symbolic links.

6. Run `npm run serve` inside `spfx-library` folder, then `npm run serve` inside `spfx-webparts`. The order is important.

## Using [Lerna.js](https://lerna.js.org/)

Lerna simplifies a lot of things, when it comes to management of multi-packaged repositories with git and npm. You can use it for library components, because in most cases that's a multi-packaged repository (library component is one package, your SharePoint Framework webparts project is another). Read [this blog post](https://spblog.net/post/2019/06/24/using-lerna-to-manage-spfx-projects-with-library-components) to learn more.  

### How to configure

1. Scaffold two projects - library component inside `spfx-library` folder (I will use `corporate-library` as a library component name) and regular web part project into another folder `spfx-webparts`. Use `yo @microsoft/sharepoint --skip-install`, because Lerna manages dependencies on it's own.

2. Inside `spfx-webparts` run

   ```bash
   spfx-fast-serve
   ```

3. Inside `spfx-library` run

   ```bash
   spfx-fast-serve --library-component
   ```

4. Update `spfx-webparts/package.json` and add dependency on `"spfx-library": "0.0.1"`

5. In the parent folder for both `spfx-library` and `spfx-webparts` run 

   ```bash
   lerna init
   ```

6. Update just created `lerna.json` with below configuration: 

   ```javscript
   {
       "packages": [
            "spfx-library/**",
            "spfx-webparts/**"
        ],
       "version": "0.0.0"
   }
   ```

7. Run 

   ```bash
   lerna bootstrap
   ```

   It will restore dependency in all packages.

8. Run

   ```bash
   lerna run --parallel serve
   ```

   It will start `serve` process in both folders.
