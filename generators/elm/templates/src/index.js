"use strict";

import { Elm } from "./elm/Main.elm";
<% if(sass) { %>import "./assets/sass/styles.scss";<% } else { %>import "./assets/css/styles.css";<% } %>

(function() {
  const node = document.getElementById("elm");
  const app = Elm.Main.init({
    node: node,
    flags: null
  });
})();
