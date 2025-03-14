import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["dist/**", "node_modules/**", "build/**"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      // Require triple equals for equality checks
      eqeqeq: "error",
      // Prevent trailing spaces at the end of lines
      "no-trailing-spaces": "error",
      // Require spacing inside curly braces
      "object-curly-spacing": ["error", "always"],
      // Ensure consistent spacing around arrow functions
      "arrow-spacing": ["error", { before: true, after: true }],
      // Allow console statements (useful for backend development)
      "no-console": 0,

      // Two spaces for indentation
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "windows"],
      // Allow both single and double quotes
      "@stylistic/js/quotes": ["off"],
      // Allow semicolons
      "@stylistic/js/semi": ["off"],
    },
  },
  pluginJs.configs.recommended,
];
