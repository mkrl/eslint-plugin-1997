"use strict";

const plugin = require("../index");

describe("eslint-plugin-1997", function () {
  test("each rule has valid meta", function () {
    Object.keys(plugin.rules).forEach(function (name) {
      var rule = plugin.rules[name];
      expect(rule.meta).toBeDefined();
      expect(rule.meta.type).toBe("problem");
      expect(rule.meta.docs).toBeDefined();
      expect(rule.meta.docs.recommended).toBe(true);
      expect(rule.create).toBeInstanceOf(Function);
    });
  });
});
