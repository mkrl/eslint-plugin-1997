# 1997/no-post-dom1-methods

📝 Disallow DOM methods not part of W3C DOM Level 1 (1998).

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Disallows DOM method calls not part of the [W3C DOM Level 1 (1998)](https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/) specification.

DOM Level 1 methods allowed on `Node`: `insertBefore`, `replaceChild`,
`removeChild`, `appendChild`, `hasChildNodes`, `cloneNode`.

DOM Level 1 methods allowed on `Document`: `createElement`,
`createDocumentFragment`, `createTextNode`, `createComment`,
`createProcessingInstruction`, `createAttribute`, `createEntityReference`,
`getElementsByTagName`.

DOM Level 1 HTML methods allowed on `HTMLDocument`: `open`, `close`,
`write`, `writeln`, `getElementsByName`, `getElementById`.

DOM Level 1 methods allowed on `Element`: `getAttribute`, `setAttribute`,
`removeAttribute`, `getAttributeNode`, `setAttributeNode`,
`removeAttributeNode`, `getElementsByTagName`, `normalize`.

Everything else — `querySelector`, `querySelectorAll`, `addEventListener`,
`removeEventListener`, `dispatchEvent`, `append`, `prepend`, `remove`,
`closest`, `matches`, `getBoundingClientRect`, `attachShadow`,
`getElementsByClassName`, `importNode`, `createElementNS`, `hasAttribute`,
`compareDocumentPosition`, `createRange`, etc. — is disallowed.
