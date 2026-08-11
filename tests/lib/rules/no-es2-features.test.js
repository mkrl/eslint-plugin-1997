"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-es2-features");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },
});

ruleTester.run("no-es2-features", rule, {
  valid: [
    // var declarations
    "var x = 1;",
    // regular function declaration
    "function foo() {}",
    // regular function expression
    "var f = function() {};",
    // if/else
    "if (true) {} else {}",
    // for loop
    "for (var i = 0; i < 10; i++) {}",
    // while
    "while (false) {}",
    // do-while
    "do {} while (false);",
    // switch
    "switch (x) { case 1: break; }",
    // try/catch/finally
    "try {} catch (e) {} finally {}",
    // object literal (non-shorthand)
    "var o = { a: 1, b: function() {} };",
    // array literal
    "var a = [1, 2, 3];",
    // regular expressions
    "var re = /foo/;",
    // typeof
    "typeof undefined;",
    // instanceof
    "var b = [] instanceof Array;",
    // in operator
    "var c = 'x' in {};",
    // new
    "var d = new Date();",
    // binary operators
    "var e = 1 + 2;",
    "var f = 10 / 2;",
    // logical operators
    "var g = true || false;",
    "var h = true && false;",
    // ternary
    "var i = true ? 1 : 0;",
    // comma operator
    "var j = (1, 2);",
    // delete
    "var obj = {}; delete obj.x;",
    // void
    "void 0;",
    // with statement
    "with ({}) {}",
    // for-in (ES1)
    "for (var k in {}) {}",
    // return
    "function r() { return 1; }",
    // throw/catch
    "try { throw new Error('e'); } catch (err) {}",
    // normal assignment (=, +=, -=, *=, /=, %=)
    "var x = 0; x += 1;",
    "var x = 0; x -= 1;",
    "var x = 1; x *= 2;",
    "var x = 4; x /= 2;",
    "var x = 5; x %= 3;",
    // bitwise operators
    "var x = 1 & 2;",
    "var x = 1 | 2;",
    "var x = 1 ^ 2;",
    "var x = ~1;",
    "var x = 1 << 2;",
    "var x = 4 >> 1;",
    "var x = 4 >>> 1;",
  ],

  invalid: [
    // Arrow functions
    {
      code: "var f = () => 1;",
      errors: [{ messageId: "noArrowFunction" }],
    },
    {
      code: "var f = (x) => x * 2;",
      errors: [{ messageId: "noArrowFunction" }],
    },
    // Classes
    {
      code: "class Foo {}",
      errors: [{ messageId: "noClass" }],
    },
    {
      code: "var C = class {};",
      errors: [{ messageId: "noClass" }],
    },
    // let/const
    {
      code: "let x = 1;",
      errors: [{ messageId: "noLetConst" }],
    },
    {
      code: "const x = 1;",
      errors: [{ messageId: "noLetConst" }],
    },
    // Template literals
    {
      code: "var s = `hello`;",
      errors: [{ messageId: "noTemplateLiteral" }],
    },
    {
      code: "var s = `hello ${name}`;",
      errors: [{ messageId: "noTemplateLiteral" }],
    },
    // Tagged templates
    {
      code: "var s = tag`hello`;",
      errors: [{ messageId: "noTaggedTemplate" }, { messageId: "noTemplateLiteral" }],
    },
    // Destructuring - array
    {
      code: "var [a, b] = [1, 2];",
      errors: [{ messageId: "noDestructuring" }],
    },
    // Destructuring - object
    {
      code: "var { x } = obj;",
      errors: [{ messageId: "noDestructuring" }],
    },
    // Spread element
    {
      code: "var a = [...arr];",
      errors: [{ messageId: "noSpreadElement" }],
    },
    {
      code: "foo(...args);",
      errors: [{ messageId: "noSpreadElement" }],
    },
    // Rest parameters
    {
      code: "function f(...args) {}",
      errors: [{ messageId: "noRestElement" }],
    },
    // Default parameters
    {
      code: "function f(x = 1) {}",
      errors: [{ messageId: "noDefaultParam" }],
    },
    // Generator functions
    {
      code: "function* gen() {}",
      errors: [{ messageId: "noGenerator" }],
    },
    {
      code: "var g = function*() {};",
      errors: [{ messageId: "noGenerator" }],
    },
    // Async functions
    {
      code: "async function f() {}",
      errors: [{ messageId: "noAsync" }],
    },
    {
      code: "var f = async function() {};",
      errors: [{ messageId: "noAsync" }],
    },
    // for-of
    {
      code: "for (var x of []) {}",
      errors: [{ messageId: "noForOf" }],
    },
    // Computed property names
    {
      code: "var o = { [key]: 1 };",
      errors: [{ messageId: "noComputedProperty" }],
    },
    // Shorthand method
    {
      code: "var o = { foo() {} };",
      errors: [{ messageId: "noShorthandMethod" }],
    },
    // Shorthand property
    {
      code: "var x = 1; var o = { x };",
      errors: [{ messageId: "noShorthandProperty" }],
    },
    // Exponentiation operator
    {
      code: "var x = 2 ** 3;",
      errors: [{ messageId: "noExponentiation" }],
    },
    {
      code: "var x = 2; x **= 3;",
      errors: [{ messageId: "noExponentiation" }],
    },
    // Optional chaining
    {
      code: "var x = foo?.bar;",
      errors: [{ messageId: "noOptionalChaining" }],
    },
    // Nullish coalescing
    {
      code: "var x = foo ?? 'default';",
      errors: [{ messageId: "noNullishCoalescing" }],
    },
    // Logical assignment
    {
      code: "var x = 1; x &&= 2;",
      errors: [{ messageId: "noLogicalAssignment" }],
    },
    {
      code: "var x = null; x ||= 2;",
      errors: [{ messageId: "noLogicalAssignment" }],
    },
    {
      code: "var x = null; x ??= 2;",
      errors: [{ messageId: "noLogicalAssignment" }],
    },
    // Yield
    {
      code: "function* gen() { yield 1; }",
      errors: [{ messageId: "noGenerator" }, { messageId: "noYield" }],
    },
    // Await
    {
      code: "async function f() { await Promise.resolve(); }",
      errors: [
        { messageId: "noAsync" },
        { messageId: "noAwait" },
      ],
    },
  ],
});

// Test import/export statements with sourceType: "module"
const moduleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

moduleTester.run("no-es2-features (modules)", rule, {
  valid: [],
  invalid: [
    {
      code: "import foo from 'foo';",
      errors: [{ messageId: "noImportExport" }],
    },
    {
      code: "import { bar } from 'bar';",
      errors: [{ messageId: "noImportExport" }],
    },
    {
      code: "export default function foo() {}",
      errors: [{ messageId: "noImportExport" }],
    },
    {
      code: "export var x = 1;",
      errors: [{ messageId: "noImportExport" }],
    },
    {
      code: "export * from 'mod';",
      errors: [{ messageId: "noImportExport" }],
    },
  ],
});
