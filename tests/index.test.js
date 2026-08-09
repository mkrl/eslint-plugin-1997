"use strict";

const plugin = require("../index");

describe("eslint-plugin-1997", function () {
  test("exports a plugin object with meta", function () {
    expect(plugin.meta).toBeDefined();
    expect(plugin.meta.name).toBe("eslint-plugin-1997");
    expect(plugin.meta.version).toBe("1.0.0");
  });

  test("exports all six rules", function () {
    expect(plugin.rules).toBeDefined();
    expect(plugin.rules["no-es2-features"]).toBeDefined();
    expect(plugin.rules["no-modern-globals"]).toBeDefined();
    expect(plugin.rules["no-modern-array-methods"]).toBeDefined();
    expect(plugin.rules["no-modern-string-methods"]).toBeDefined();
    expect(plugin.rules["no-modern-object-methods"]).toBeDefined();
    expect(plugin.rules["no-post-dom1-methods"]).toBeDefined();
  });

  test("exports a recommended config", function () {
    expect(plugin.configs).toBeDefined();
    expect(plugin.configs.recommended).toBeDefined();
    expect(plugin.configs.recommended.rules).toBeDefined();
    expect(plugin.configs.recommended.rules["1997/no-es2-features"]).toBe("error");
    expect(plugin.configs.recommended.rules["1997/no-modern-globals"]).toBe("error");
    expect(plugin.configs.recommended.rules["1997/no-modern-array-methods"]).toBe("error");
    expect(plugin.configs.recommended.rules["1997/no-modern-string-methods"]).toBe("error");
    expect(plugin.configs.recommended.rules["1997/no-modern-object-methods"]).toBe("error");
    expect(plugin.configs.recommended.rules["1997/no-post-dom1-methods"]).toBe("error");
  });

  test("recommended config references the plugin", function () {
    expect(plugin.configs.recommended.plugins["1997"]).toBe(plugin);
  });

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
