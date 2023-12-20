# How to configure `spfx-fast-serve` with library components  

There are many libraries and built-in tools, which add convenient multi-packaged support for repository (Lerna, Rush, npm\pnpm\yarn workspaces and others). It's out of scope for this guide to cover all of them. Instead, it covers the most straightforward way of implementing the library components using just npm.

## Procedure

Using this option you just need to scaffold library components, webpart project and add `spfx-fast-serve`.

### How to configure

1. Scaffold two projects - library component inside `spfx-library` folder (I will use `corporate-library` as a library component name) and regular web part project into another folder `spfx-webparts`.

2. Both in `spfx-webparts` and `spfx-library` folders run

   ```bash
   spfx-fast-serve
   ```

3. Inside `spfx-library` run

   ```bash
   npx fast-serve config add
   ```

    And update created config with below `serve` settings:

   - `port` is any free TCP port except `4321`, because it's the default for main SPFx web server. For example, you can use `4322`, `4323`, etc. The only rule is that you should use a unique port for every library component project per your SPFx solution
   - `isLibraryComponent` - true

4. In both folders run

   ```bash
   npm install
   ```

   to restore dependencies (if not did before).

5. Inside `spfx-webparts` add dependency on `corporate-library` by running below command:

   ```bash
   npm install ../spfx-library --save
   ```

   That's a special syntax, supported by npm, which installs dependency from parent **folder** name. It searches for `package.json` and adds corresponding dependency using symbolic links.

6. Run `npm run serve` inside `spfx-library` folder, wait till the full compilation, then `npm run serve` inside `spfx-webparts`. The order is important.
