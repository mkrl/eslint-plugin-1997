"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-modern-string-methods");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },
});

ruleTester.run("no-modern-string-methods", rule, {
  valid: [
    // ES1 String methods are allowed
    "str.charAt(0);",
    "str.charCodeAt(0);",
    "String.fromCharCode(65);",
    "str.indexOf('a');",
    "str.lastIndexOf('a');",
    "str.split(',');",
    "str.substring(0, 3);",
    "str.toLowerCase();",
    "str.toUpperCase();",
    "str.toString();",
    "str.valueOf();",
    // Not a method call
    "var trim = 1;",
    // Property access without call
    "str.startsWith;",
  ],

  invalid: [
    // ES3 additions
    {
      code: "str.match(/foo/);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.replace('a', 'b');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.search(/foo/);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.slice(0, 3);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.substr(0, 3);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    // ES5 additions
    {
      code: "str.trim();",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    // ES6+ additions
    {
      code: "str.startsWith('foo');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.endsWith('foo');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.includes('foo');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.repeat(3);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.padStart(5, '0');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.padEnd(5, '0');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.trimStart();",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.trimEnd();",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.matchAll(/foo/g);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.replaceAll('a', 'b');",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    {
      code: "str.at(0);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
    // Static methods
    {
      code: "String.fromCodePoint(65);",
      errors: [{ messageId: "noModernStringMethod" }],
    },
  ],
});
