"use strict";

/**
 * Rule: no-es2-features
 *
 * Disallows JavaScript syntax features that were introduced after ECMAScript 1
 * (ECMA-262, 1st Edition, June 1997).
 *
 * ES1 supported: var, function declarations/expressions, if/else, for, while,
 * do-while, switch, try/catch/finally, typeof, instanceof, in, new, this,
 * return, throw, with, delete, void, comma operator, object/array literals,
 * regular expressions, string/number/boolean/null/undefined literals.
 *
 * Not supported: arrow functions, classes, let/const, template literals,
 * destructuring, spread/rest, default parameters, generators, async/await,
 * for-of, for-in on non-object (fine), computed property names, shorthand
 * properties, tagged templates, import/export (ES modules), exponentiation
 * operator, optional chaining, nullish coalescing, logical assignment, etc.
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow JavaScript features introduced after ECMAScript 1 (1997)",
      category: "ES1997 Compatibility",
      recommended: true,
      url: "https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf",
    },
    schema: [],
    messages: {
      noArrowFunction: "Arrow functions are not part of ECMAScript 1 (1997). Use a regular function expression instead.",
      noClass: "Classes are not part of ECMAScript 1 (1997). Use constructor functions instead.",
      noLetConst: "'{{kind}}' declarations are not part of ECMAScript 1 (1997). Use 'var' instead.",
      noTemplateLiteral: "Template literals are not part of ECMAScript 1 (1997). Use string concatenation instead.",
      noDestructuring: "Destructuring assignments are not part of ECMAScript 1 (1997).",
      noSpreadElement: "Spread elements are not part of ECMAScript 1 (1997).",
      noRestElement: "Rest parameters are not part of ECMAScript 1 (1997).",
      noDefaultParam: "Default parameters are not part of ECMAScript 1 (1997).",
      noGenerator: "Generator functions are not part of ECMAScript 1 (1997).",
      noAsync: "Async functions are not part of ECMAScript 1 (1997).",
      noForOf: "for-of loops are not part of ECMAScript 1 (1997).",
      noComputedProperty: "Computed property names are not part of ECMAScript 1 (1997).",
      noShorthandMethod: "Shorthand method definitions are not part of ECMAScript 1 (1997). Use 'key: function() {}' instead.",
      noShorthandProperty: "Shorthand property names are not part of ECMAScript 1 (1997). Use 'key: value' instead.",
      noTaggedTemplate: "Tagged template literals are not part of ECMAScript 1 (1997).",
      noImportExport: "ES modules (import/export) are not part of ECMAScript 1 (1997).",
      noExponentiation: "The exponentiation operator (**) is not part of ECMAScript 1 (1997).",
      noOptionalChaining: "Optional chaining (?.) is not part of ECMAScript 1 (1997).",
      noNullishCoalescing: "The nullish coalescing operator (??) is not part of ECMAScript 1 (1997).",
      noLogicalAssignment: "Logical assignment operators (&&=, ||=, ??=) are not part of ECMAScript 1 (1997).",
      noYield: "yield expressions are not part of ECMAScript 1 (1997).",
      noAwait: "await expressions are not part of ECMAScript 1 (1997).",
      noPrivateIdentifier: "Private class fields are not part of ECMAScript 1 (1997).",
    },
  },

  create(context) {
    return {
      ArrowFunctionExpression(node) {
        context.report({ node, messageId: "noArrowFunction" });
      },

      ClassDeclaration(node) {
        context.report({ node, messageId: "noClass" });
      },

      ClassExpression(node) {
        context.report({ node, messageId: "noClass" });
      },

      VariableDeclaration(node) {
        if (node.kind === "let" || node.kind === "const") {
          context.report({ node, messageId: "noLetConst", data: { kind: node.kind } });
        }
      },

      TemplateLiteral(node) {
        context.report({ node, messageId: "noTemplateLiteral" });
      },

      TaggedTemplateExpression(node) {
        context.report({ node, messageId: "noTaggedTemplate" });
      },

      ArrayPattern(node) {
        context.report({ node, messageId: "noDestructuring" });
      },

      ObjectPattern(node) {
        context.report({ node, messageId: "noDestructuring" });
      },

      SpreadElement(node) {
        context.report({ node, messageId: "noSpreadElement" });
      },

      RestElement(node) {
        context.report({ node, messageId: "noRestElement" });
      },

      AssignmentPattern(node) {
        // Only flag as default parameter when inside a function's params list
        const parent = node.parent;
        if (
          parent &&
          (parent.type === "FunctionDeclaration" ||
            parent.type === "FunctionExpression" ||
            parent.type === "ArrowFunctionExpression") &&
          parent.params &&
          parent.params.includes(node)
        ) {
          context.report({ node, messageId: "noDefaultParam" });
        }
      },

      FunctionDeclaration(node) {
        if (node.generator) {
          context.report({ node, messageId: "noGenerator" });
        }
        if (node.async) {
          context.report({ node, messageId: "noAsync" });
        }
      },

      FunctionExpression(node) {
        if (node.generator) {
          context.report({ node, messageId: "noGenerator" });
        }
        if (node.async) {
          context.report({ node, messageId: "noAsync" });
        }
      },

      ForOfStatement(node) {
        context.report({ node, messageId: "noForOf" });
      },

      Property(node) {
        // Skip properties inside destructuring patterns (ObjectPattern already flagged)
        if (node.parent && node.parent.type === "ObjectPattern") {
          return;
        }
        if (node.computed) {
          context.report({ node, messageId: "noComputedProperty" });
        } else if (node.method) {
          context.report({ node, messageId: "noShorthandMethod" });
        } else if (node.shorthand) {
          context.report({ node, messageId: "noShorthandProperty" });
        }
      },

      ImportDeclaration(node) {
        context.report({ node, messageId: "noImportExport" });
      },

      ExportNamedDeclaration(node) {
        context.report({ node, messageId: "noImportExport" });
      },

      ExportDefaultDeclaration(node) {
        context.report({ node, messageId: "noImportExport" });
      },

      ExportAllDeclaration(node) {
        context.report({ node, messageId: "noImportExport" });
      },

      AssignmentExpression(node) {
        const logicalAssignment = ["&&=", "||=", "??="];
        if (logicalAssignment.includes(node.operator)) {
          context.report({ node, messageId: "noLogicalAssignment" });
        }
        if (node.operator === "**=") {
          context.report({ node, messageId: "noExponentiation" });
        }
      },

      BinaryExpression(node) {
        if (node.operator === "**") {
          context.report({ node, messageId: "noExponentiation" });
        }
      },

      ChainExpression(node) {
        context.report({ node, messageId: "noOptionalChaining" });
      },

      LogicalExpression(node) {
        if (node.operator === "??") {
          context.report({ node, messageId: "noNullishCoalescing" });
        }
      },

      YieldExpression(node) {
        context.report({ node, messageId: "noYield" });
      },

      AwaitExpression(node) {
        context.report({ node, messageId: "noAwait" });
      },

      PrivateIdentifier(node) {
        context.report({ node, messageId: "noPrivateIdentifier" });
      },
    };
  },
};
