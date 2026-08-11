# 1997/no-modern-array-methods

📝 Disallow Array methods introduced after ECMAScript 1 (1997).

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Disallows `Array` prototype and static methods introduced after ECMAScript 1 (1997).

ES1 allowed: `join`, `reverse`, `sort`, `push`, `pop`, `shift`, `unshift`,
`splice`, `slice`, `toString`, `toLocaleString`, `concat`.

Everything else — `forEach`, `map`, `filter`, `reduce`, `find`,
`includes`, `flat`, `flatMap`, `Array.from`, `Array.isArray`, etc. — is disallowed.
