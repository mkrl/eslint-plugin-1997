"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-modern-array-methods");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },
});

ruleTester.run("no-modern-array-methods", rule, {
  valid: [
    // ES1 Array methods are allowed
    "arr.join(',');",
    "arr.reverse();",
    "arr.sort();",
    "arr.push(1);",
    "arr.pop();",
    "arr.shift();",
    "arr.unshift(1);",
    "arr.splice(0, 1);",
    "arr.slice(0, 1);",
    "arr.toString();",
    "arr.toLocaleString();",
    "arr.concat([1, 2]);",
    // Not a method call
    "var forEach = 1;",
    // Property access without a call
    "arr.map;",
  ],

  invalid: [
    // ES5 array methods
    {
      code: "arr.forEach(function(x) {});",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.map(function(x) { return x; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.filter(function(x) { return x; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.reduce(function(acc, x) { return acc + x; }, 0);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.reduceRight(function(acc, x) { return acc + x; }, 0);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.every(function(x) { return x > 0; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.some(function(x) { return x > 0; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.indexOf(1);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.lastIndexOf(1);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    // ES6+ array methods
    {
      code: "arr.find(function(x) { return x > 0; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.findIndex(function(x) { return x > 0; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.includes(1);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.fill(0);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.flat();",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.flatMap(function(x) { return x; });",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "arr.at(0);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    // Array static methods
    {
      code: "Array.isArray([]);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "Array.from([1, 2, 3]);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
    {
      code: "Array.of(1, 2, 3);",
      errors: [{ messageId: "noModernArrayMethod" }],
    },
  ],
});
