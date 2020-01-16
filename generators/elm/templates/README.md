# Project Structure  

All source files can be found under `/src`. All Elm files can be found under `/src/elm`

All static files can be found under `/static`

All tests can be found under `/tests`

All distribution files can be found under `/dist`  
  
# Building from Source

* Run `npm i` or `yarn` in the root folder
* Run any of the following in the root folder (feel free to substitute `yarn` for `npm run`)
	* Running `yarn dev` will compile a new unoptimized app.js in dist with elm set to debug mode
	* Running `yarn serve` will start a devserver that watches for changes on localhost:8080 (if available) running an unoptimized debug build
	* Running `yarn prod` will create an optimized production build in dist


# Running Tests  

* Run `npm i` or `yarn` in the root folder if you have not already done so
* Run `npm run test` or `yarn test` in the root folder to run tests in the command line
