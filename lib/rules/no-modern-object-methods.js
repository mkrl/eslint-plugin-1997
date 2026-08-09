"use strict";

/**
 * Rule: no-modern-object-methods
 *
 * Disallows use of Object static/prototype methods introduced after
 * ECMAScript 1 (1997).
 *
 * Object methods in ES1 (static): none (Object itself was there but no
 * static methods were defined on it).
 *
 * Object.prototype methods in ES1: toString, valueOf, hasOwnProperty,
 * isPrototypeOf, propertyIsEnumerable, toLocaleString, constructor.
 *
 * Static methods added later:
 *   ES5: create, defineProperty, defineProperties, getOwnPropertyDescriptor,
 *        getOwnPropertyNames, getPrototypeOf, keys, seal, freeze,
 *        preventExtensions, isSealed, isFrozen, isExtensible
 *   ES6: assign, getOwnPropertySymbols, is, setPrototypeOf, values,
 *        entries, getOwnPropertyDescriptors
 *   ES2022+: hasOwn, fromEntries (ES2019)
 */

const MODERN_OBJECT_STATIC_METHODS = new Set([
  // ES5
  "create",
  "defineProperty",
  "defineProperties",
  "getOwnPropertyDescriptor",
  "getOwnPropertyNames",
  "getPrototypeOf",
  "keys",
  "seal",
  "freeze",
  "preventExtensions",
  "isSealed",
  "isFrozen",
  "isExtensible",
  // ES6+
  "assign",
  "getOwnPropertySymbols",
  "is",
  "setPrototypeOf",
  "values",
  "entries",
  "getOwnPropertyDescriptors",
  // ES2019+
  "fromEntries",
  // ES2022+
  "hasOwn",
]);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow Object static methods introduced after ECMAScript 1 (1997)",
      category: "ES1997 Compatibility",
      recommended: true,
      url: "https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf",
    },
    schema: [],
    messages: {
      noModernObjectMethod:
        "Object static method '{{method}}' is not part of ECMAScript 1 (1997).",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type === "MemberExpression" &&
          !callee.computed &&
          callee.object.type === "Identifier" &&
          callee.object.name === "Object" &&
          callee.property.type === "Identifier" &&
          MODERN_OBJECT_STATIC_METHODS.has(callee.property.name)
        ) {
          context.report({
            node,
            messageId: "noModernObjectMethod",
            data: { method: callee.property.name },
          });
        }
      },
    };
  },
};
