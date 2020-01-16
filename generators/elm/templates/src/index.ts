"use strict";
// @ts-ignore
import { Elm } from "./elm/Main";
<% if(sass) { %>import "./assets/sass/styles.scss";<% } else { %>import "./assets/css/styles.css";<% } %>

(function() {
  const node: HTMLElement | null = document.getElementById("elm");
  const app = Elm.Main.init({
    node: node,
    flags: null
  });
})();
