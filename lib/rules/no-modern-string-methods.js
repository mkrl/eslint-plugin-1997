"use strict";

/**
 * Rule: no-modern-string-methods
 *
 * Disallows use of String prototype/static methods introduced after
 * ECMAScript 1 (1997).
 *
 * String methods in ES1: charAt, charCodeAt, fromCharCode, indexOf,
 * lastIndexOf, split, substring, toLowerCase, toUpperCase, toString,
 * valueOf, concat (but String.prototype.concat wasn't in ES1),
 * toLocaleString.
 *
 * Actually ES1 String.prototype methods:
 *   toString, valueOf, charAt, charCodeAt, indexOf, lastIndexOf,
 *   split, substring, toLowerCase, toUpperCase
 *
 * String.fromCharCode is the only ES1 static method.
 */

const MODERN_STRING_METHODS = new Set([
  // ES3
  "match",
  "replace",
  "search",
  "slice",
  "substr",
  "localeCompare",
  "toLocaleLowerCase",
  "toLocaleUpperCase",
  // ES5+
  "trim",
  "concat", // String.prototype.concat was added in ES3
  // ES6+
  "startsWith",
  "endsWith",
  "includes",
  "repeat",
  "normalize",
  "codePointAt",
  "fromCodePoint",
  "raw",
  // ES2017+
  "padStart",
  "padEnd",
  // ES2019+
  "trimStart",
  "trimEnd",
  "trimLeft",
  "trimRight",
  "matchAll",
  // ES2021+
  "replaceAll",
  // ES2022+
  "at",
]);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow String methods introduced after ECMAScript 1 (1997)",
      category: "ES1997 Compatibility",
      recommended: true,
      url: "https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf",
    },
    schema: [],
    messages: {
      noModernStringMethod:
        "String method '{{method}}' is not part of ECMAScript 1 (1997).",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type === "MemberExpression" &&
          !callee.computed &&
          callee.property.type === "Identifier" &&
          MODERN_STRING_METHODS.has(callee.property.name)
        ) {
          context.report({
            node,
            messageId: "noModernStringMethod",
            data: { method: callee.property.name },
          });
        }
      },
    };
  },
};
