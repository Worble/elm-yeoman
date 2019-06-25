/* eslint-disable camelcase */
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the splendid ${chalk.red(
          "generator-elm-webpack"
        )} generator!`
      )
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
        name: "smacss",
        message: "Would you like to to scaffold a SMACSS template?",
        default: false,
        when: answers => answers.sass
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Would you like to enable TypeScript compilation?",
        default: false
      },
      {
        type: "confirm",
        name: "elmTypescriptInterop",
        message:
          "Would you like to add Elm-TypeScript-Interop? This is a nice to have but it can be a little buggy and outdated.",
        default: false,
        when: answers => answers.typescript
      },
      {
        type: "confirm",
        name: "customLoader",
        message:
          "The current maintainer for elm-webpack-loader on github seems to be AWOL, would you like to use a modified elm webpack loader, which includes vulnerability patches, debug mode in development and better  compression in production? (If you get 'ReferenceError: primordials is not defined' when building, this custom loader may fix the issue)",
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
      },
      {
        type: "confirm",
        name: "compression",
        message: "Would you like to enable compressed assets for production?",
        default: false
      },
      {
        type: "confirm",
        name: "brotli",
        message: `Would you like to enable brotli for compression? (Requires Node >= 11.7.0, you are on ${process.versions.node})`,
        default: false,
        when: answers => answers.compression
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this._write_package_json();
    this._write_elm_json();
    this._copy_files();
  }

  _write_package_json() {
    // START PKG JSON
    // DEPENDENCIES
    let pkgJson = {
      devDependencies: {
        "@babel/core": "^7.4.5",
        "@babel/preset-env": "^7.4.5",
        "babel-loader": "^8.0.6",
        "clean-webpack-plugin": "^3.0.0",
        "copy-webpack-plugin": "^5.0.3",
        "css-loader": "^3.0.0",
        elm: "0.19.0-no-deps",
        "elm-test": "0.19.0",
        "elm-analyse": "^0.16.4",
        "html-loader": "^0.5.5",
        "html-webpack-plugin": "^3.2.0",
        "mini-css-extract-plugin": "^0.7.0",
        "optimize-css-assets-webpack-plugin": "^5.0.1",
        "style-loader": "^0.23.1",
        "uglifyjs-webpack-plugin": "^2.1.3",
        webpack: "^4.34.0",
        "webpack-cli": "^3.3.4",
        "webpack-dev-server": "^3.7.1",
        "webpack-merge": "^4.2.1"
      }
    };
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

    if (this.props.typescript) {
      let pkgJsonTS = {
        devDependencies: {
          "ts-loader": "^6.0.2",
          typescript: "^3.5.2"
        }
      };
      this.fs.extendJSON(this.destinationPath("package.json"), pkgJsonTS);
    }

    if (this.props.elmTypescriptInterop) {
      let pkgJsonElmTsInterop = {
        devDependencies: {
          "elm-typescript-interop": "^0.0.15"
        }
      };
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        pkgJsonElmTsInterop
      );
    }

    if (this.props.sass) {
      let pkgJsonSass = {
        devDependencies: {
          "node-sass": "^4.12.0",
          "sass-loader": "^7.1.0"
        }
      };
      this.fs.extendJSON(this.destinationPath("package.json"), pkgJsonSass);
    }

    let pkgJsonLoader = {
      devDependencies: {
        "elm-webpack-loader": "^5.0.0"
      }
    };
    if (this.props.customLoader) {
      pkgJsonLoader = {
        devDependencies: {
          "elm-webpack-loader": "https://github.com/Worble/elm-webpack-loader"
        }
      };
    }
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJsonLoader);

    if (this.props.serviceWorker || this.props.pwa) {
      let pkgJsonServiceWorker = {
        devDependencies: {
          "workbox-webpack-plugin": "^4.3.1"
        }
      };
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        pkgJsonServiceWorker
      );
    }

    if (this.props.compression) {
      let pkgJsonCompression = {
        devDependencies: {
          "compression-webpack-plugin": "^3.0.0"
        }
      };
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        pkgJsonCompression
      );
    }
    // END DEPENDENCIES

    // START SCRIPTS
    let tsInteropString = this.props.elmTypescriptInterop
      ? "elm-typescript-interop && "
      : "";
    let pkgJsonScripts = {
      scripts: {
        dev: `${tsInteropString}webpack --config webpack.dev.js`,
        serve: `${tsInteropString}webpack-dev-server -d --open --config webpack.dev.js`,
        test: "elm-test",
        prod: `${tsInteropString}webpack --config webpack.prod.js`
      }
    };
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJsonScripts);
    // END SCRIPTS

    // END PKG JSON
  }

  _write_elm_json() {
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
  }

  _copy_files() {
    // COPY FILES
    // GITIGNORE
    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );

    // TESTS
    this.fs.copy(
      this.templatePath("tests/Example.elm"),
      this.destinationPath("tests/Example.elm")
    );

    // INDEX HTML
    this.fs.copyTpl(
      this.templatePath("static/index.html"),
      this.destinationPath("static/index.html"),
      { pwa: this.props.pwa, serviceWorker: this.props.serviceWorker }
    );

    // MAIN ELM
    if (this.props.spa) {
      this.fs.copy(
        this.templatePath("src/elm/Main-SPA.elm"),
        this.destinationPath("src/elm/Main.elm")
      );
    } else {
      this.fs.copy(
        this.templatePath("src/elm/Main.elm"),
        this.destinationPath("src/elm/Main.elm")
      );
    }

    // INDEX JS
    if (this.props.typescript) {
      // TYPESCRIPT
      this.fs.copyTpl(
        this.templatePath("src/index.ts"),
        this.destinationPath("src/index.ts"),
        {
          sass: this.props.sass,
          elmTypescriptInterop: this.props.elmTypescriptInterop
        }
      );

      this.fs.copy(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json")
      );
    } else {
      // NOT TYPESCRIPT
      this.fs.copyTpl(
        this.templatePath("src/index.js"),
        this.destinationPath("src/index.js"),
        { sass: this.props.sass }
      );
    }

    // STYLESHEETS
    if (this.props.sass) {
      // SASS
      if (this.props.smacss) {
        // SMACSS
        this.fs.copy(
          this.templatePath("src/assets/sass/styles-smacss.scss"),
          this.destinationPath("src/assets/sass/styles.scss")
        );
        this.fs.copy(
          this.templatePath("src/assets/sass/smacss/base.scss"),
          this.destinationPath("src/assets/sass/smacss/base.scss")
        );
        this.fs.copy(
          this.templatePath("src/assets/sass/smacss/layout.scss"),
          this.destinationPath("src/assets/sass/smacss/layout.scss")
        );
        this.fs.copy(
          this.templatePath("src/assets/sass/smacss/modules.scss"),
          this.destinationPath("src/assets/sass/smacss/modules.scss")
        );
        this.fs.copy(
          this.templatePath("src/assets/sass/smacss/state.scss"),
          this.destinationPath("src/assets/sass/smacss/state.scss")
        );
        this.fs.copy(
          this.templatePath("src/assets/sass/smacss/theme.scss"),
          this.destinationPath("src/assets/sass/smacss/theme.scss")
        );
      } else {
        // NOT SMACSS
        this.fs.copy(
          this.templatePath("src/assets/sass/styles.scss"),
          this.destinationPath("src/assets/sass/styles.scss")
        );
      }
    } else {
      // NOT SASS
      this.fs.copy(
        this.templatePath("src/assets/css/styles.css"),
        this.destinationPath("src/assets/css/styles.css")
      );
    }

    // WEBPACK FILES
    this.fs.copyTpl(
      this.templatePath("webpack.common.js"),
      this.destinationPath("webpack.common.js"),
      { typescript: this.props.typescript, sass: this.props.sass }
    );
    this.fs.copyTpl(
      this.templatePath("webpack.dev.js"),
      this.destinationPath("webpack.dev.js"),
      {
        sass: this.props.sass,
        pwa: this.props.pwa,
        serviceWorker: this.props.serviceWorker
      }
    );
    this.fs.copyTpl(
      this.templatePath("webpack.prod.js"),
      this.destinationPath("webpack.prod.js"),
      {
        sass: this.props.sass,
        pwa: this.props.pwa,
        serviceWorker: this.props.serviceWorker,
        compression: this.props.compression,
        brotli: this.props.brotli
      }
    );

    // PWA FILES
    if (this.props.pwa) {
      this.fs.copy(
        this.templatePath("static/manifest.json"),
        this.destinationPath("static/manifest.json")
      );
      this.fs.copy(
        this.templatePath("static/icons/icon-192x192.png"),
        this.destinationPath("static/icons/icon-192x192.png")
      );
      this.fs.copy(
        this.templatePath("static/icons/icon-512x512.png"),
        this.destinationPath("static/icons/icon-512x512.png")
      );
    }

    // README
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        customLoader: this.props.customLoader,
        typescript: this.props.typescript
      }
    );

    // END COPY FILES
  }

  install() {
    this.installDependencies({ npm: false, bower: false, yarn: true });
  }
};
