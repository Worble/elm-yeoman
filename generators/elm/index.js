"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the splendid ${chalk.red("generator-elm")} generator!`)
    );

    const prompts = [
      {
        type: "confirm",
        name: "sass",
        message: "Would you like to enable SASS compilation?",
        default: false
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Would you like to enable TypeScript compilation?",
        default: false
      },
      {
        type: "confirm",
        name: "spa",
        message:
          "Would you like to create a Single Page Application boilerplate?",
        default: false
      },
      {
        type: "confirm",
        name: "serviceWorker",
        message:
          "Would you like to enable to enable a serviceworker for offline caching?",
        default: false
      },
      {
        type: "confirm",
        name: "pwa",
        message: "Would you like to enable Progressive Web App boilerplate?",
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // START PKG JSON
    let pkgJson = {
      devDependencies: {
        elm: "0.19.0-no-deps",
        "elm-test": "0.19.0-beta10",
        "elm-analyse": "^0.16.4",
        webpack: "^4.20.2",
        "webpack-cli": "^3.1.2",
        "webpack-dev-server": "^3.1.9",
        "webpack-merge": "^4.1.4",
        "clean-webpack-plugin": "^3.0.0"
      },
      scripts: {
        dev: "elm-typescript-interop && webpack --config webpack.dev.js",
        serve:
          "elm-typescript-interop && webpack-dev-server --open --config webpack.dev.js",
        test: "elm-test",
        prod: "elm-typescript-interop && webpack --config webpack.prod.js"
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

    if (this.props.typescript) {
      pkgJson = {
        devDependencies: {
          "elm-typescript-interop": "^0.0.15",
          "ts-loader": "^5.3.3",
          typescript: "^3.2.2"
        }
      };
      this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    }

    if (this.props.sass) {
      pkgJson = {
        devDependencies: {
          "html-webpack-plugin": "^3.2.0",
          "mini-css-extract-plugin": "^0.4.4",
          "node-sass": "^4.9.4",
          "optimize-css-assets-webpack-plugin": "^5.0.1",
          "sass-loader": "^7.1.0",
          "style-loader": "^0.23.1"
        }
      };
      this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    }

    if (this.props.serviceWorker) {
      pkgJson = {
        devDependencies: {
          "workbox-webpack-plugin": "^4.3.1"
        }
      };
      this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    }
    // END PKG JSON

    // START ELM JSON
    let elmJson = {
      type: "application",
      "source-directories": ["src"],
      "elm-version": "0.19.0",
      dependencies: {
        direct: {
          "elm/browser": "1.0.1",
          "elm/core": "1.0.2",
          "elm/html": "1.0.0"
        },
        indirect: {
          "elm/json": "1.1.3",
          "elm/time": "1.0.0",
          "elm/url": "1.0.0",
          "elm/virtual-dom": "1.0.2"
        }
      },
      "test-dependencies": {
        direct: {
          "elm-explorations/test": "1.1.0"
        },
        indirect: {
          "elm/random": "1.0.0"
        }
      }
    };
    this.fs.extendJSON(this.destinationPath("elm.json"), elmJson);

    let extraElmJson = {
      dependencies: {
        indirect: {
          "elm/url": "1.0.0"
        }
      }
    };
    if (this.props.spa) {
      extraElmJson = {
        dependencies: {
          direct: {
            "elm/url": "1.0.0"
          }
        }
      };
    }
    this.fs.extendJSON(this.destinationPath("elm.json"), extraElmJson);

    // END ELM JSON

    // This.fs.copy(
    //   this.templatePath("dummyfile.txt"),
    //   this.destinationPath("dummyfile.txt")
    // );
  }

  install() {
    this.installDependencies({ npm: false, bower: false, yarn: true });
  }
};
