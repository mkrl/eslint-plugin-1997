"use strict";

const noEs2Features = require("./lib/rules/no-es2-features");
const noModernGlobals = require("./lib/rules/no-modern-globals");
const noModernArrayMethods = require("./lib/rules/no-modern-array-methods");
const noModernStringMethods = require("./lib/rules/no-modern-string-methods");
const noModernObjectMethods = require("./lib/rules/no-modern-object-methods");
const noPostDom1Methods = require("./lib/rules/no-post-dom1-methods");

const plugin = {
  meta: {
    name: "eslint-plugin-1997",
    version: "1.0.0",
  },

  rules: {
    "no-es2-features": noEs2Features,
    "no-modern-globals": noModernGlobals,
    "no-modern-array-methods": noModernArrayMethods,
    "no-modern-string-methods": noModernStringMethods,
    "no-modern-object-methods": noModernObjectMethods,
    "no-post-dom1-methods": noPostDom1Methods,
  },

  configs: {},
};

plugin.configs.recommended = {
  plugins: {
    "1997": plugin,
  },
  rules: {
    "1997/no-es2-features": "error",
    "1997/no-modern-globals": "error",
    "1997/no-modern-array-methods": "error",
    "1997/no-modern-string-methods": "error",
    "1997/no-modern-object-methods": "error",
    "1997/no-post-dom1-methods": "error",
  },
};

module.exports = plugin;
