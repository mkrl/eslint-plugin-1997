"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-modern-object-methods");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },
});

ruleTester.run("no-modern-object-methods", rule, {
  valid: [
    // ES1 Object prototype methods (called on instances) are allowed
    "obj.toString();",
    "obj.valueOf();",
    "obj.hasOwnProperty('x');",
    "obj.isPrototypeOf(other);",
    "obj.propertyIsEnumerable('x');",
    "obj.toLocaleString();",
    // Object constructor itself is ES1
    "var o = new Object();",
    // Non-Object static call
    "Math.abs(-1);",
    // Property access without call
    "Object.create;",
  ],

  invalid: [
    // ES5 static methods
    {
      code: "Object.create(null);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.defineProperty(obj, 'x', {});",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.defineProperties(obj, {});",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.getOwnPropertyDescriptor(obj, 'x');",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.getOwnPropertyNames(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.getPrototypeOf(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.keys(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.seal(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.freeze(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.preventExtensions(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.isSealed(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.isFrozen(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.isExtensible(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    // ES6+ static methods
    {
      code: "Object.assign({}, obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.getOwnPropertySymbols(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.is(1, 1);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.setPrototypeOf(obj, null);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.values(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    {
      code: "Object.entries(obj);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    // ES2019+
    {
      code: "Object.fromEntries([['a', 1]]);",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
    // ES2022+
    {
      code: "Object.hasOwn(obj, 'x');",
      errors: [{ messageId: "noModernObjectMethod" }],
    },
  ],
});
