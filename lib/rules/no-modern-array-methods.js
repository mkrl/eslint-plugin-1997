"use strict";

/**
 * Rule: no-modern-array-methods
 *
 * Disallows use of Array prototype methods that were introduced after
 * ECMAScript 1 (1997).
 *
 * Array methods in ES1: join, reverse, sort, push, pop, shift, unshift,
 * splice, slice, toString, toLocaleString, concat.
 *
 * Everything else (forEach, map, filter, reduce, find, findIndex,
 * includes, flat, flatMap, every, some, indexOf, lastIndexOf, keys,
 * values, entries, fill, copyWithin, from, of, at, findLast,
 * findLastIndex, toReversed, toSorted, toSpliced, with) was added later.
 */

const MODERN_ARRAY_METHODS = new Set([
  // ES5
  "forEach",
  "map",
  "filter",
  "reduce",
  "reduceRight",
  "every",
  "some",
  "indexOf",
  "lastIndexOf",
  // ES6+
  "find",
  "findIndex",
  "keys",
  "values",
  "entries",
  "fill",
  "copyWithin",
  "includes",
  // ES2019+
  "flat",
  "flatMap",
  // ES2022+
  "at",
  // ES2023+
  "findLast",
  "findLastIndex",
  "toReversed",
  "toSorted",
  "toSpliced",
  "with",
  // Array static methods (ES6+)
  "from",
  "of",
  "isArray",
]);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow Array methods introduced after ECMAScript 1 (1997)",
      category: "ES1997 Compatibility",
      recommended: true,
      url: "https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf",
    },
    schema: [],
    messages: {
      noModernArrayMethod:
        "Array method '{{method}}' is not part of ECMAScript 1 (1997).",
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
          MODERN_ARRAY_METHODS.has(callee.property.name)
        ) {
          context.report({
            node,
            messageId: "noModernArrayMethod",
            data: { method: callee.property.name },
          });
        }
      },
    };
  },
};
