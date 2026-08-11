# 1997/no-modern-object-methods

📝 Disallow Object static methods introduced after ECMAScript 1 (1997).

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Disallows `Object` static methods introduced after ECMAScript 1 (1997).

ES1 had no `Object` static methods beyond those inherited from the prototype.

Everything else — `Object.create`, `Object.assign`, `Object.keys`,
`Object.values`, `Object.entries`, `Object.freeze`, `Object.seal`,
`Object.defineProperty`, `Object.getPrototypeOf`,
`Object.getOwnPropertyNames`, `Object.fromEntries`, `Object.hasOwn`,
etc. — is disallowed.
