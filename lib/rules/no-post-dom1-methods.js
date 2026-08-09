"use strict";

/**
 * Rule: no-post-dom1-methods
 *
 * Disallows use of DOM methods that were NOT part of the
 * W3C DOM Level 1 specification (1998).
 *
 * https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/
 *
 * DOM Level 1 Core methods on Node:
 *   insertBefore, replaceChild, removeChild, appendChild, hasChildNodes,
 *   cloneNode
 *
 * DOM Level 1 Core methods on Document:
 *   createElement, createDocumentFragment, createTextNode, createComment,
 *   createCDATASection, createProcessingInstruction, createAttribute,
 *   createEntityReference, getElementsByTagName
 *
 * DOM Level 1 Core methods on Element:
 *   getAttribute, setAttribute, removeAttribute, getAttributeNode,
 *   setAttributeNode, removeAttributeNode, getElementsByTagName,
 *   normalize
 *
 * DOM Level 1 Core methods on NamedNodeMap:
 *   getNamedItem, setNamedItem, removeNamedItem, item
 *
 * DOM Level 1 Core methods on NodeList:
 *   item
 *
 * DOM Level 1 HTML methods (HTMLDocument):
 *   open, close, write, writeln, getElementsByName, getElementById
 *
 * Everything else (querySelector, querySelectorAll, addEventListener,
 * removeEventListener, dispatchEvent, append, prepend, remove, replaceWith,
 *  before, after, closest, matches, insertAdjacentElement,
 * insertAdjacentHTML, insertAdjacentText, getAnimations, attachShadow,
 * requestPointerLock, scrollIntoView, scrollIntoViewIfNeeded,
 * getBoundingClientRect, getClientRects, computedStyleMap,
 * setPointerCapture, releasePointerCapture, hasPointerCapture,
 * requestFullscreen, createShadowRoot, getElementsByClassName, etc.)
 * was added in DOM Level 2 or later.
 */

const POST_DOM1_METHODS = new Set([
  // DOM Level 2+ Core / Events
  "addEventListener",
  "removeEventListener",
  "dispatchEvent",
  // DOM Level 2+ Traversal / Range
  "createNodeIterator",
  "createTreeWalker",
  "createRange",
  // DOM Level 2+ Views
  "getComputedStyle",
  // Selectors API (DOM Level 4 / Living Standard)
  "querySelector",
  "querySelectorAll",
  // DOM Living Standard — ParentNode / ChildNode helpers
  "append",
  "prepend",
  "replaceChildren",
  "remove",
  "replaceWith",
  "before",
  "after",
  // Element — Selectors / traversal (post-Level-1)
  "closest",
  "matches",
  "webkitMatchesSelector",
  "mozMatchesSelector",
  // getElementsByClassName (DOM Level 2 HTML / HTML5)
  "getElementsByClassName",
  // insertAdjacentElement / HTML / Text (IE extension, standardised post-L1)
  "insertAdjacentElement",
  "insertAdjacentHTML",
  "insertAdjacentText",
  // Geometry (CSSOM View)
  "getBoundingClientRect",
  "getClientRects",
  "getBBoxFromElement",
  "computedStyleMap",
  // Shadow DOM
  "attachShadow",
  "createShadowRoot",
  // Fullscreen API
  "requestFullscreen",
  "webkitRequestFullscreen",
  "mozRequestFullScreen",
  // Pointer Lock
  "requestPointerLock",
  // Pointer Capture
  "setPointerCapture",
  "releasePointerCapture",
  "hasPointerCapture",
  // Scroll helpers (CSSOM View)
  "scrollIntoView",
  "scrollIntoViewIfNeeded",
  "scroll",
  "scrollTo",
  "scrollBy",
  // Animations
  "getAnimations",
  "animate",
  // DOM Parsing / serialisation helpers (post-L1)
  "setHTMLUnsafe",
  "getHTML",
  // importNode / adoptNode (DOM Level 2)
  "importNode",
  "adoptNode",
  // createElementNS / createAttributeNS (DOM Level 2 Namespaces)
  "createElementNS",
  "createAttributeNS",
  "createTextNodeNS",
  "getAttributeNS",
  "setAttributeNS",
  "removeAttributeNS",
  "getAttributeNodeNS",
  "setAttributeNodeNS",
  "hasAttribute",
  "hasAttributeNS",
  "hasAttributes",
  // compareDocumentPosition (DOM Level 3)
  "compareDocumentPosition",
  // isSameNode / isEqualNode (DOM Level 3)
  "isSameNode",
  "isEqualNode",
  // lookupNamespaceURI / lookupPrefix (DOM Level 3)
  "lookupNamespaceURI",
  "lookupPrefix",
  "isDefaultNamespace",
  // MutationObserver (Living Standard)
  "observe",
  "takeRecords",
  // IntersectionObserver / ResizeObserver
  "unobserve",
  "disconnect",
]);

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow DOM methods not part of W3C DOM Level 1 (1998)",
      category: "DOM Level 1 Compatibility",
      recommended: true,
      url: "https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/",
    },
    schema: [],
    messages: {
      noPostDom1Method:
        "DOM method '{{method}}' is not part of W3C DOM Level 1 (1998).",
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
          POST_DOM1_METHODS.has(callee.property.name)
        ) {
          context.report({
            node,
            messageId: "noPostDom1Method",
            data: { method: callee.property.name },
          });
        }
      },
    };
  },
};
