# Project Structure  

All source files can be found under `/src`. All Elm files can be found under `/src/elm`

All static files can be found under `/static`

All tests can be found under `/tests`

All distribution files can be found under `/dist`  

<% if (customLoader) { %>
# Some notes about the loader

* The loader being used is the same as [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader), with a few small exceptions
  1. It uses uglifyjs with the settings described [here](https://guide.elm-lang.org/optimization/asset_size.html) when run for production. This can give some performance benefits, especially for larger code bases. 
  2. It allows the user to pass debug options to the elm compiler when building to enable the Elm-Debugger
  3. It fixes the major vulnerabilities as described in [this issue](https://github.com/elm-community/elm-webpack-loader/issues/171)
  4. It actually builds on Node versions higher than the current LTS (currently 10.16.0)
   Hopefully these issues are temporary, and whenever they are resolved you can swap back to the original elm-webpack-loader by simply calling `npm elm-webpack-loader --save-dev` or `yarn add elm-webpack-loader --dev`.
<% } %>
  
# Building from Source

* Run `npm i` or `yarn` in the root folder
* Run any of the following in the root folder (feel free to substitute `yarn` for `npm run`)
	* Running `yarn dev` will compile a new unoptimized app.js in dist with elm set to debug mode
	* Running `yarn serve` will start a devserver that watches for changes on localhost:8080 (if available) running an unoptimized debug build
	* Running `yarn prod` will create an optimized production build in dist


# Running Tests  

* Run `npm i` or `yarn` in the root folder if you have not already done so
* Run `npm run test` or `yarn test` in the root folder to run tests in the command line

<% if (typescript) { %>
# Known Issues

* [`elm-typescript-interop` dependency is using `Elm AST`, which is not going to update to 0.19](https://github.com/dillonkearns/elm-typescript-interop/issues/15#issuecomment-438448890). [Work is potentially being done to change to `elm-syntax`](https://github.com/dillonkearns/elm-typescript-interop/issues/17). However until this is done `elm-typescript-interop` may potentially fail. In these cases you may be able to work around it by simply commenting the offending line, if it can be found, and running `elm-typescript-interop` just to generate the typescript, and then uncommenting. Otherwise, you can forgo using this library entirely by removing the calls to `elm-typescript-interop` in the package.json and updating `src/index.ts` to use `Main.elm` directly, and probably updating tsconfig.json to no longer be strict.
<% } %>