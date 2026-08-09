"use strict";

/**
 * Rule: no-modern-globals
 *
 * Disallows use of global objects and constructors introduced after
 * ECMAScript 1 (1997). ES1 built-in globals:
 *   Object, Function, Array, String, Boolean, Number, Math, Date, RegExp,
 *   Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError,
 *   URIError, eval, parseInt, parseFloat, isNaN, isFinite, decodeURI,
 *   decodeURIComponent, encodeURI, encodeURIComponent, Infinity, NaN,
 *   undefined
 *
 * Everything else (Promise, Map, Set, Symbol, WeakMap, WeakSet, Proxy,
 * Reflect, TypedArrays, ArrayBuffer, DataView, BigInt, globalThis, etc.)
 * was added later.
 */

const MODERN_GLOBALS = new Set([
  // ES6 (ES2015)
  "Promise",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "Symbol",
  "Proxy",
  "Reflect",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "ArrayBuffer",
  "DataView",
  "Iterator",
  // ES2017+
  "SharedArrayBuffer",
  "Atomics",
  // ES2020+
  "BigInt",
  "BigInt64Array",
  "BigUint64Array",
  "globalThis",
  "FinalizationRegistry",
  "WeakRef",
  // Others introduced after ES1
  "JSON",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  "AsyncGenerator",
  "AsyncGeneratorFunction",
  "queueMicrotask",
  "structuredClone",
  "reportError",
  "AggregateError",
]);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow global objects and constructors introduced after ECMAScript 1 (1997)",
      category: "ES1997 Compatibility",
      recommended: true,
      url: "https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf",
    },
    schema: [],
    messages: {
      noModernGlobal: "'{{name}}' is not part of ECMAScript 1 (1997).",
    },
  },

  create(context) {
    return {
      Identifier(node) {
        if (!MODERN_GLOBALS.has(node.name)) {
          return;
        }

        const parent = node.parent;
        if (!parent) return;

        // Skip non-computed property access: foo.Promise is fine
        if (
          parent.type === "MemberExpression" &&
          parent.property === node &&
          !parent.computed
        ) {
          return;
        }

        // Skip non-computed object property keys: { Promise: 1 } is fine
        if (
          (parent.type === "Property" || parent.type === "MethodDefinition") &&
          parent.key === node &&
          !parent.computed
        ) {
          return;
        }

        // Skip local variable declarations: var Promise = ... defines a new local binding
        if (parent.type === "VariableDeclarator" && parent.id === node) {
          return;
        }

        // Skip function/class declarations that use the name
        if (
          (parent.type === "FunctionDeclaration" ||
            parent.type === "FunctionExpression" ||
            parent.type === "ClassDeclaration" ||
            parent.type === "ClassExpression") &&
          parent.id === node
        ) {
          return;
        }

        // Skip labeled statements
        if (parent.type === "LabeledStatement" && parent.label === node) {
          return;
        }

        // Find the reference for this identifier and check if it was user-declared
        const sourceCode = context.sourceCode || context.getSourceCode();
        const scope = sourceCode.getScope
          ? sourceCode.getScope(node)
          : context.getScope();

        // Walk up the scope chain to find the reference and its resolved variable
        let s = scope;
        while (s) {
          const ref = s.references.find(function (r) {
            return r.identifier === node;
          });
          if (ref) {
            // If resolved and the variable has user-code definitions, it's locally declared
            if (ref.resolved && ref.resolved.defs && ref.resolved.defs.length > 0) {
              return;
            }
            break;
          }
          s = s.upper;
        }

        context.report({
          node,
          messageId: "noModernGlobal",
          data: { name: node.name },
        });
      },
    };
  },
};
