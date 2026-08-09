"use strict";

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-post-dom1-methods");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "script",
  },
});

ruleTester.run("no-post-dom1-methods", rule, {
  valid: [
    // DOM Level 1 Node methods
    "node.insertBefore(newNode, refNode);",
    "node.replaceChild(newChild, oldChild);",
    "node.removeChild(child);",
    "node.appendChild(child);",
    "node.hasChildNodes();",
    "node.cloneNode(true);",
    // DOM Level 1 Document methods
    "document.createElement('div');",
    "document.createDocumentFragment();",
    "document.createTextNode('hello');",
    "document.createComment('comment');",
    "document.createProcessingInstruction('xml', 'version=\"1.0\"');",
    "document.createAttribute('class');",
    "document.getElementsByTagName('p');",
    // DOM Level 1 HTML Document methods
    "document.open();",
    "document.close();",
    "document.write('<p>hi</p>');",
    "document.writeln('line');",
    "document.getElementsByName('field');",
    "document.getElementById('main');",
    // DOM Level 1 Element methods
    "el.getAttribute('id');",
    "el.setAttribute('id', 'x');",
    "el.removeAttribute('id');",
    "el.getAttributeNode('id');",
    "el.getElementsByTagName('span');",
    // Element.normalize() is DOM Level 1
    "el.normalize();",
    // NamedNodeMap / NodeList
    "map.getNamedItem('class');",
    "map.setNamedItem(attr);",
    "map.removeNamedItem('class');",
    "list.item(0);",
    // Not a method call
    "var querySelector = 1;",
    // Property access without call
    "el.querySelector;",
  ],

  invalid: [
    // Selectors API
    {
      code: "document.querySelector('.btn');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "document.querySelectorAll('li');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // DOM Events (Level 2)
    {
      code: "el.addEventListener('click', handler);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.removeEventListener('click', handler);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.dispatchEvent(new Event('click'));",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // getElementsByClassName (HTML5)
    {
      code: "document.getElementsByClassName('foo');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // DOM Living Standard helpers
    {
      code: "el.append(child);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.prepend(child);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.remove();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.before(sibling);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.after(sibling);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.replaceWith(newEl);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.replaceChildren(a, b);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Element traversal / matching
    {
      code: "el.closest('.container');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.matches('.active');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // insertAdjacentHTML
    {
      code: "el.insertAdjacentHTML('beforeend', '<span/>');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.insertAdjacentElement('afterbegin', newEl);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.insertAdjacentText('beforeend', 'hello');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Geometry (CSSOM View)
    {
      code: "el.getBoundingClientRect();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.getClientRects();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Shadow DOM
    {
      code: "el.attachShadow({ mode: 'open' });",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Scroll helpers
    {
      code: "el.scrollIntoView();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Animations
    {
      code: "el.animate([{ opacity: 0 }], 300);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.getAnimations();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // DOM Level 2 Namespace methods
    {
      code: "document.createElementNS('http://www.w3.org/2000/svg', 'svg');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "document.importNode(node, true);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "document.adoptNode(node);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // DOM Level 2 Element namespace attributes
    {
      code: "el.getAttributeNS('http://www.w3.org/2000/xmlns/', 'ns');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.setAttributeNS('http://www.w3.org/2000/xmlns/', 'ns', 'val');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "el.hasAttribute('id');",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // DOM Level 3
    {
      code: "nodeA.compareDocumentPosition(nodeB);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "nodeA.isEqualNode(nodeB);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // getComputedStyle (DOM Level 2 Views)
    {
      code: "window.getComputedStyle(el);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Range / TreeWalker (DOM Level 2 Traversal)
    {
      code: "document.createRange();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "document.createNodeIterator(root, 0x1, null);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    {
      code: "document.createTreeWalker(root, 0x1, null);",
      errors: [{ messageId: "noPostDom1Method" }],
    },
    // Fullscreen
    {
      code: "el.requestFullscreen();",
      errors: [{ messageId: "noPostDom1Method" }],
    },
  ],
});
