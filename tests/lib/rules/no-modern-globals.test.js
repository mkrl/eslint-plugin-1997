"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-modern-globals");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },
});

ruleTester.run("no-modern-globals", rule, {
  valid: [
    // ES1 globals are allowed
    "var x = new Object();",
    "var x = new Array();",
    "var x = new String('hello');",
    "var x = new Number(1);",
    "var x = new Boolean(true);",
    "var x = new Date();",
    "var x = new RegExp('foo');",
    "var x = new Error('err');",
    "var x = new EvalError('err');",
    "var x = new RangeError('err');",
    "var x = new ReferenceError('err');",
    "var x = new SyntaxError('err');",
    "var x = new TypeError('err');",
    "var x = new URIError('err');",
    "var x = parseInt('42');",
    "var x = parseFloat('3.14');",
    "var x = isNaN(NaN);",
    "var x = isFinite(1);",
    "var x = Math.abs(-1);",
    "var x = eval('1');",
    "var x = Infinity;",
    "var x = NaN;",
    "var x = undefined;",
    // Locally defined variable with the same name should be allowed
    "var Promise = {}; Promise.all([]);",
    // Property access on an object (not the global)
    "var obj = {}; obj.Promise;",
  ],

  invalid: [
    {
      code: "new Promise(function(resolve) { resolve(); });",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new Map();",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new Set();",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new WeakMap();",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new WeakSet();",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "Symbol('foo');",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new Proxy({}, {});",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "Reflect.ownKeys({});",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new Int8Array(8);",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "new ArrayBuffer(8);",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "JSON.stringify({});",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "BigInt(1);",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "globalThis.foo;",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "queueMicrotask(function() {});",
      errors: [{ messageId: "noModernGlobal" }],
    },
    {
      code: "structuredClone({});",
      errors: [{ messageId: "noModernGlobal" }],
    },
  ],
});
