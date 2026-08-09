# eslint-plugin-1997

An ESLint plugin that enforces the JavaScript standard from the **ECMAScript 1st Edition (June 1997)** specification ([ECMA-262](https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf)) and the **W3C DOM Level 1 (October 1998)** specification ([REC-DOM-Level-1-19981001](https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/)).

## What is ECMAScript 1?

The first edition of the ECMAScript standard (ES1), published in June 1997, defined the baseline JavaScript language. It included:

- `var` declarations
- Function declarations and expressions
- Control flow: `if/else`, `for`, `while`, `do-while`, `switch`, `try/catch/finally`
- Object and array literals (without shorthand syntax)
- Operators: arithmetic, comparison, logical, bitwise, `typeof`, `instanceof`, `in`, `delete`, `void`
- Built-in objects: `Object`, `Function`, `Array`, `String`, `Boolean`, `Number`, `Math`, `Date`, `RegExp`
- Built-in errors: `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError`
- Global functions: `eval`, `parseInt`, `parseFloat`, `isNaN`, `isFinite`

Everything introduced in ES2 (1998) or later — arrow functions, classes, `let`/`const`, template literals, `Promise`, `Map`, `Set`, destructuring, modules, etc. — is disallowed.

## What is W3C DOM Level 1?

The W3C DOM Level 1 specification, published in October 1998, defined the first standardised API for interacting with HTML and XML documents. It included:

- **Core node operations** — `appendChild`, `removeChild`, `insertBefore`, `replaceChild`, `cloneNode`, `hasChildNodes`
- **Document creation** — `createElement`, `createTextNode`, `createComment`, `createDocumentFragment`, `createAttribute`, `createProcessingInstruction`, `getElementsByTagName`
- **Element attribute access** — `getAttribute`, `setAttribute`, `removeAttribute`, `getAttributeNode`, `setAttributeNode`, `removeAttributeNode`
- **HTML Document helpers** — `getElementById`, `getElementsByName`, `open`, `close`, `write`, `writeln`
- **Collection access** — `item` on `NodeList` and `NamedNodeMap`; `getNamedItem`, `setNamedItem`, `removeNamedItem` on `NamedNodeMap`

Everything added in DOM Level 2 (2000) or later — `addEventListener`, `querySelector`, `querySelectorAll`, `classList`, `append`, `closest`, `getBoundingClientRect`, `attachShadow`, `createElementNS`, `hasAttribute`, `compareDocumentPosition`, etc. — is disallowed.

## Installation

```bash
npm install --save-dev eslint-plugin-1997
```

## Usage

In your `eslint.config.js` (flat config):

```js
const plugin1997 = require("eslint-plugin-1997");

module.exports = [
  plugin1997.configs.recommended,
];
```

## Rules

| Rule | Description |
|------|-------------|
| `1997/no-es2-features` | Disallows syntax features introduced after ES1 (arrow functions, classes, let/const, template literals, destructuring, spread, default params, generators, async/await, for-of, optional chaining, nullish coalescing, etc.) |
| `1997/no-modern-globals` | Disallows modern global objects not in ES1 (`Promise`, `Map`, `Set`, `Symbol`, `Proxy`, `Reflect`, `JSON`, `BigInt`, `globalThis`, TypedArrays, etc.) |
| `1997/no-modern-array-methods` | Disallows Array methods added after ES1 (`forEach`, `map`, `filter`, `reduce`, `find`, `includes`, `flat`, `Array.from`, `Array.isArray`, etc.) |
| `1997/no-modern-string-methods` | Disallows String methods added after ES1 (`trim`, `startsWith`, `endsWith`, `includes`, `repeat`, `padStart`, `padEnd`, `replaceAll`, `matchAll`, etc.) |
| `1997/no-modern-object-methods` | Disallows `Object` static methods added after ES1 (`Object.create`, `Object.assign`, `Object.keys`, `Object.freeze`, `Object.entries`, etc.) |
| `1997/no-post-dom1-methods` | Disallows DOM methods not part of W3C DOM Level 1 (1998) (`querySelector`, `querySelectorAll`, `addEventListener`, `removeEventListener`, `dispatchEvent`, `append`, `prepend`, `remove`, `closest`, `matches`, `getBoundingClientRect`, `attachShadow`, `getElementsByClassName`, `importNode`, `createElementNS`, `hasAttribute`, `compareDocumentPosition`, `createRange`, etc.) |

## Valid ES1 code examples

```js
// var declarations
var x = 42;
var name = "hello";

// Functions
function add(a, b) {
  return a + b;
}
var multiply = function(a, b) {
  return a * b;
};

// Control flow
if (x > 0) {
  x = x - 1;
} else {
  x = 0;
}

for (var i = 0; i < 10; i++) {
  // ...
}

// Objects and arrays
var obj = { key: "value", count: 42 };
var arr = [1, 2, 3];

// Error handling
try {
  throw new Error("something went wrong");
} catch (e) {
  // handle
}

// Built-in objects
var d = new Date();
var re = /^hello/i;
var n = parseInt("42", 10);
```

## Invalid code examples (ES2+)

```js
// Arrow functions (ES6)
var f = () => 1;

// Classes (ES6)
class Foo {}

// let/const (ES6)
let x = 1;
const y = 2;

// Template literals (ES6)
var s = `Hello, ${name}!`;

// Destructuring (ES6)
var { a, b } = obj;
var [first, second] = arr;

// Spread/rest (ES6)
var copy = [...arr];
function f(...args) {}

// Promise (ES6)
new Promise(function(resolve) { resolve(); });

// Modern Array methods (ES5+)
arr.forEach(function(x) { return x; });
arr.map(function(x) { return x * 2; });

// Object static methods (ES5+)
Object.keys(obj);
Object.assign({}, obj);

// for-of (ES6)
for (var x of arr) {}

// Optional chaining (ES2020)
var val = obj?.prop;

// Nullish coalescing (ES2020)
var result = val ?? "default";
```

## Testing

```bash
npm test
```

This runs all rule tests with coverage reporting using Jest.
