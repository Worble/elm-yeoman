"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-elm:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app"));
    // .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file([".gitignore"]);
    assert.file(["tests/example.elm"]);
    assert.file(["static/index.html"]);
    assert.file(["src/elm/Main.elm"]);
    assert.file(["src/index.js"]);
    assert.file(["src/assets/css/styles.css"]);
    assert.file(["webpack.common.js"]);
    assert.file(["webpack.dev.js"]);
    assert.file(["webpack.prod.js"]);
  });
});
