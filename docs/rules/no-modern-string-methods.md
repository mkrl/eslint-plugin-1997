# 1997/no-modern-string-methods

📝 Disallow String methods introduced after ECMAScript 1 (1997).

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Disallows `String` prototype methods introduced after ECMAScript 1 (1997).

ES1 allowed: `charAt`, `charCodeAt`, `indexOf`, `lastIndexOf`, `split`,
`substring`, `toLowerCase`, `toUpperCase`, `toString`, `valueOf`,
`fromCharCode`, `concat`, `slice`.

Everything else — `trim`, `startsWith`, `endsWith`, `includes`, `repeat`,
`padStart`, `padEnd`, `replaceAll`, `matchAll`, `at`, `trimStart`,
`trimEnd`, etc. — is disallowed.
