# 1997/no-modern-globals

📝 Disallow global objects and constructors introduced after ECMAScript 1 (1997).

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Disallows global objects and constructors not part of ECMAScript 1 (1997).

This includes `Promise`, `Map`, `Set`, `WeakMap`, `WeakSet`, `Symbol`,
`Proxy`, `Reflect`, `JSON`, `BigInt`, `globalThis`, `queueMicrotask`,
typed arrays (`Int8Array`, `Uint8Array`, etc.), `ArrayBuffer`, and more.
